# Repository Instructions

## Code Style

- Use strict TS
- Avoid mutations. Prefer immutable updates and derived values unless mutation is the clearest fit for an established local API.
- Avoid `for` loops as much as you can. Prefer array methods, reducers, or focused helpers when they keep the code clear.
- Avoid type assertions. Prefer typed APIs, narrowing, guards, or parsing helpers that prove the type.
- Don't use `unknown` if possible — define the correct type instead. Reserve `unknown` for genuinely opaque values coming from external runtimes (untyped APIs, message dispatch), and narrow them at the boundary with a guard or parsing helper.
- Avoid single-letter variable or parameter names. Use descriptive names except for conventional, tiny local scopes where the meaning is obvious.
- Write code identifiers, internal names, and comments in English. User-facing copy may stay in the product language.
- Never commit or stage changes. Leave all edits unstaged so the user can review them.
- Avoid functions that only call one function. Do not create a function whose entire body is a single call to another function, unless that wrapper is called in more than one place. Inline the call directly, with a comment if clarification helps.
- Do not use the `void` operator to ignore promises or values. Let callers handle or intentionally ignore returned promises without adding `void`.
- Avoid nested conditions. Prefer guard clauses, early returns, or clear sequential condition checks.
- Do not add `isWorking`-style state solely to track an awaited operation. Use `async`/`await` at the action or event-handler boundary.
- Keep the main exported component near the top of the file. Place utility components and helper functions below it, ordered by first usage.
- Extract user-facing component text into a shared `texts` constant object declared directly below imports, and use it across all components in the file.
- Use TypeScript and Vite import resolvers without external libraries, avoid relative imports, and use `@folderName/...` aliases instead of `@/...`.
- For returns with only two options, use a ternary operator instead of an `if` with `return`; when there are more than two return paths, use a `switch`.
- Separate control flow with blank lines: add one before a `return`, and both before and after an `if` or `switch` (skip the leading blank line when the statement is already the first line of its block).
- Use a `function` declaration for standalone, module-level functions, including React components. Reserve arrow functions for callbacks and for functions defined inside other functions (event handlers, local helpers).
- Name `useEffect` callbacks: pass a named function expression inline — `useEffect(function syncTitle() { … }, [deps])` — so the effect is identifiable in stack traces and React DevTools. This is the one deliberate exception to preferring arrows for callbacks (keep it inline so `exhaustive-deps` can still analyze it).
- Style with Tailwind CSS on its latest major version (v4+), following current best practices: install via the `@tailwindcss/vite` plugin, pull it in with `@import "tailwindcss";`, customize the theme in CSS with `@theme` (not a legacy `tailwind.config.js`), and compose utility classes in markup — extract a component when utilities repeat instead of reaching for `@apply`.
