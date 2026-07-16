---
name: gen-test
description: Generate a Vitest unit test for a TypeScript file, co-located as *.test.ts, following Mune's Result-style error handling and encryption round-trip patterns.
---

Generate a Vitest test file for the provided TypeScript file. Rules:

- Co-locate as `<filename>.test.ts` next to the source file
- Import from vitest: `import { describe, it, expect } from 'vitest'`
- Use Result-style assertions: test both `data` and `error` paths
- For encryption functions: always include a round-trip test (encrypt → decrypt → equals original)
- No mocking of @mune/crypto — test against the real implementation
- No mocking of Supabase unless testing a query function in isolation
- Keep tests focused: one describe block per exported function

---
