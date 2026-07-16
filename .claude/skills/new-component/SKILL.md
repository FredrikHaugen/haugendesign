---
name: new-component
description: Scaffold a new component following Atomic Design conventions (atoms/molecules/organisms) with Mune brand tokens
disable-model-invocation: true
---

# New Component

Scaffold a new Mune component with the correct file location, naming, and boilerplate.

## Usage

```
/new-component <layer> <name>
```

- `layer`: `atom`, `molecule`, or `organism`
- `name`: component name in PascalCase (e.g., `MoodBadge`)

## Steps

1. **Determine file path** from layer:
   - `atom` → `apps/web/components/atoms/<kebab-name>.tsx`
   - `molecule` → `apps/web/components/molecules/<kebab-name>.tsx`
   - `organism` → `apps/web/components/organisms/<kebab-name>.tsx`

2. **Check for existing component** — search all four component directories (`atoms/`, `molecules/`, `organisms/`, `ui/`) for a file with the same name. If found, inform the user and stop.

3. **Determine if client component** — ask the user: "Does this component need interactivity, browser APIs, or React hooks?" If yes, add `'use client'` directive.

4. **Create the file** with this template:

```tsx
// If client component:
"use client";

// Blank line between import groups
import { cn } from "@/lib/utils";

type <Name>Props = {
  className?: string;
};

export function <Name>({ className }: <Name>Props) {
  return (
    <div className={cn("", className)}>
      {/* TODO */}
    </div>
  );
}
```

## Rules

- File names: `kebab-case.tsx` (e.g., `mood-badge.tsx`)
- Component names: `PascalCase` named exports (never default exports)
- Always include `className` prop with `cn()` for composability
- Use brand tokens only — never hardcode hex values
- Import `cn` from `@/lib/utils`
- Use `type` for props (not `interface`)
- No `any` — TypeScript strict mode
