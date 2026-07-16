---
name: create-migration
description: Create a Supabase SQL migration with automatic RLS policy scaffolding
disable-model-invocation: true
---

# Create Migration

Scaffold a Supabase migration file with RLS enabled by default.

## Usage

```
/create-migration <table-name>
```

## Steps

1. **Generate timestamp** — format: `YYYYMMDDHHMMSS` (UTC)

2. **Create migration file** at:
   ```
   supabase/migrations/<timestamp>_create_<table_name>.sql
   ```

3. **Ask the user** for the table columns. Provide a sensible starting point based on the table name.

4. **Include RLS boilerplate** — every migration MUST include:

```sql
-- requesting_user_id(): reads the Clerk JWT `sub` claim as text.
-- Mune uses Clerk, not Supabase Auth — there is NO auth.users table for app
-- users, and user_id is text. This helper is not guaranteed to exist in fresh
-- environments, so EVERY user-scoped migration must prepend it or it fails with
-- "function requesting_user_id() does not exist".
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$;

-- Create table
CREATE TABLE IF NOT EXISTS <table_name> (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  -- columns here
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS (mandatory — deny-all default once enabled)
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;

-- Users can only access their own rows
CREATE POLICY "Users can select own <table_name>"
  ON <table_name> FOR SELECT
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can insert own <table_name>"
  ON <table_name> FOR INSERT
  WITH CHECK (user_id = requesting_user_id());

CREATE POLICY "Users can update own <table_name>"
  ON <table_name> FOR UPDATE
  USING (user_id = requesting_user_id())
  WITH CHECK (user_id = requesting_user_id());

CREATE POLICY "Users can delete own <table_name>"
  ON <table_name> FOR DELETE
  USING (user_id = requesting_user_id());
```

### Child tables (FK to another user-scoped table)

If the table has a foreign key to another user-scoped table (e.g. `session_id` → `chat_sessions.id`), the `INSERT` and `UPDATE` `WITH CHECK` policies MUST also verify the FK target belongs to the same user. Without this, an attacker can `INSERT` a self-owned row pointing at another user's parent row (integrity/abuse risk). Mirror the `EXISTS` clause in both INSERT and UPDATE:

```sql
CREATE POLICY "Users can insert own <table_name>"
  ON <table_name> FOR INSERT
  WITH CHECK (
    user_id = requesting_user_id()
    AND EXISTS (
      SELECT 1 FROM <parent_table>
      WHERE <parent_table>.id = <table_name>.<fk_column>
        AND <parent_table>.user_id = requesting_user_id()
    )
  );

CREATE POLICY "Users can update own <table_name>"
  ON <table_name> FOR UPDATE
  USING (user_id = requesting_user_id())
  WITH CHECK (
    user_id = requesting_user_id()
    AND EXISTS (
      SELECT 1 FROM <parent_table>
      WHERE <parent_table>.id = <table_name>.<fk_column>
        AND <parent_table>.user_id = requesting_user_id()
    )
  );
```

If the FK column is nullable (e.g. a manual journal entry with no session), allow NULL explicitly in the `EXISTS` branch: `AND (<fk_column> IS NULL OR EXISTS (the same SELECT shown above))`.

## Rules

- Every user-scoped table MUST have `user_id text NOT NULL` — never `uuid`, and never `REFERENCES auth.users`. Mune uses Clerk; auth IDs are text and there is no `auth.users` table for app users.
- Prepend the `requesting_user_id()` definition (shown above) to every user-scoped migration. It is not guaranteed to exist in fresh environments; `CREATE OR REPLACE` is idempotent.
- Every table MUST have RLS enabled (`ENABLE ROW LEVEL SECURITY`) — deny-all once enabled.
- Every table MUST have explicit policies for SELECT, INSERT, UPDATE, DELETE.
- Every policy MUST scope `user_id = requesting_user_id()` in `USING` and/or `WITH CHECK`. Never use `auth.uid()` — it returns a uuid and silently fails against Clerk text IDs.
- Child tables with an FK to another user-scoped table MUST add the `EXISTS (...)` FK-ownership check to the INSERT and UPDATE `WITH CHECK` policies (see "Child tables" above).
- Include `created_at` and `updated_at` timestamps.
- Use `uuid` primary keys with `gen_random_uuid()`.
- Never bypass RLS — if admin access is needed, use the service role with explicit scope.
