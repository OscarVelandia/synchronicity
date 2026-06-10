# Repository Instructions

## Preferred Technology Stack

This is the preferred stack for this project and similar app work unless the user explicitly asks otherwise.

- **React 19** + **TypeScript** in strict mode.
- **Vite** for dev/build; static deployment to **GitHub Pages** with the build `base` set to the repo subpath.
- **Redux Toolkit** + **react-redux** for shared and non-trivial UI state.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin; import Tailwind in CSS and customize with `@theme`.
- **ESLint** flat config + **typescript-eslint** for linting.
- Pin the project Node runtime with a root `.nvmrc`; use it before installing dependencies or running npm scripts.
- For new projects, install the latest stable version of every package at setup time. Verify current versions before installing, keep related packages on compatible latest versions, and avoid prerelease/canary versions unless the user explicitly asks for them.
- Path aliases `@app` / `@components` / `@data` / `@domain` / `@features` / `@i18n` / `@store` / `@styles` / `@utils`; no relative imports.
- Lightweight in-house **i18n** with type-complete translations.
- Keep Vite and TypeScript alias config in sync. `@app` points to `src/App.tsx`; `@styles` points to `src` so global CSS imports as `@styles/index.css`.
- Prefer built-in platform APIs and the existing stack; don't add dependencies without a clear need.

## Project Shape

Use this source layout for new apps unless the user asks for something different.

- `.nvmrc`: the Node version for the project. Run `nvm use` before `npm install`, `npm run dev`, `npm run build`, or `npm run lint`; in new projects, create this file before installing dependencies so the lockfile is generated with the intended runtime.
- `src/main.tsx`: React root creation, Redux `<Provider>`, global CSS import, and app-wide startup sync such as `<html lang>`.
- `src/App.tsx`: app shell and workflow composition only. Keep page layout, app-level copy placement, and feature slots here; move feature-owned controls and rendering into `@features`.
- `src/components`: generic shared UI primitives only. Feature-specific UI belongs in its feature folder, even when that feels slightly heavier for a small app.
- `src/features/<featureName>`: Redux Toolkit feature slices, thunks, persistence helpers, feature-specific selectors, and feature-owned UI components.
- `src/features/<domainName>/<domainName>Selectors.ts`: composed selectors that join multiple slices or convert stored ids into display models.
- `src/store`: Redux store infrastructure only (`store.ts`, `hooks.ts`, listener middleware wiring).
- `src/domain`: product/domain types and pure domain helpers.
- `src/data`: app content and localized domain data builders.
- `src/i18n`: language model, language guard, labels, and the general UI text pack.
- `src/utils`: generic helpers that are not domain concepts.
- `src/index.css`: Tailwind import, `@theme` tokens, base layer, and app-specific keyframes.
- `public`: static assets. Reference public asset URLs through `import.meta.env.BASE_URL` when the app is built for a GitHub Pages subpath.

## Package Scripts

Every new project should include the standard npm scripts used here.

- `dev`: start the Vite dev server.
- `build`: run TypeScript build/type-checking first, then create the Vite production build.
- `lint`: run ESLint across the project.
- `preview`: serve the production build locally.
- `clean`: include exactly `"clean": "rm -rf node_modules package-lock.json && npm install"` in `package.json`. Keep this script available because it is the fastest consistent recovery path when package installs, generated types, or lockfiles drift.

## Code Style

- Use strict TS
- In `tsconfig.app.json`, enable strict app checks including `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.
- Avoid mutations. Prefer immutable updates and derived values unless mutation is the clearest fit for an established local API.
- Avoid classic C-style `for` loops if possible. Prefer array methods, reducers, or focused helpers; `for...of` and `for...in` are acceptable when they keep the code clearer.
- Avoid type assertions. Prefer typed APIs, narrowing, guards, or parsing helpers that prove the type.
- Don't use `unknown` if possible — define the correct type instead. Reserve `unknown` for genuinely opaque values coming from external runtimes (untyped APIs, message dispatch), and narrow them at the boundary with a guard or parsing helper.
- Never use single-letter variable or parameter names. Always use descriptive names.
- Write code identifiers, internal names, and comments in English. User-facing copy may stay in the product language.
- Keep comments concise: explain *why*, not *what* the code already says; favor a short phrase over a full sentence, and drop comments that merely restate the code.
- Never commit or stage changes. Leave all edits unstaged so the user can review them.
- Avoid functions that only call one function. Do not create a function whose entire body is a single call to another function, unless that wrapper is called in more than one place. Inline the call directly, with a comment if clarification helps.
- Do not use the `void` operator to ignore promises or values. Let callers handle or intentionally ignore returned promises without adding `void`.
- Avoid nested conditions. Prefer guard clauses, early returns, or clear sequential condition checks.
- Do not add `isWorking`-style state solely to track an awaited operation. Use `async`/`await` at the action or event-handler boundary.
- Keep the main exported component near the top of the file. Place utility components and helper functions below it, ordered by first usage.
- For i18n apps, never keep user-facing copy in component-local constants. Read general UI copy from `languageSelectors.uiText` and keep domain/content copy in `@data`. Only use a local `texts` constant in explicitly non-localized experiments.
- Use TypeScript and Vite import resolvers without external libraries, avoid relative imports, and use `@folderName/...` aliases instead of `@/...`.
- Keep domain modules for product/domain concepts. Generic project helpers such as nil checks, parsing helpers, and small type guards belong in `@utils`.
- For returns with only two options, use a ternary operator instead of an `if` with `return`; when there are more than two return paths, use a `switch`.
- Separate control flow with blank lines: add one before a `return`, and both before and after an `if` or `switch` (skip the leading blank line when the statement is already the first line of its block).
- Add a blank line between variable declarations and the statements that follow them. Consecutive `const`/`let` declarations may stay grouped without a blank line between them, but the run of declarations is separated from the non-declaration code beneath it by one blank line.
- Use a `function` declaration for standalone, module-level functions, including React components. Reserve arrow functions for callbacks and for functions defined inside other functions (event handlers, local helpers).
- Name `useEffect` callbacks: pass a named function expression inline — `useEffect(function syncTitle() { … }, [deps])` — so the effect is identifiable in stack traces and React DevTools. This is the one deliberate exception to preferring arrows for callbacks (keep it inline so `exhaustive-deps` can still analyze it).
- Enforce these style rules in ESLint where practical, especially control-flow spacing, callback function style, module-level function declarations, and named `useEffect` callbacks.
- Style with Tailwind CSS on its latest major version (v4+), following current best practices: install via the `@tailwindcss/vite` plugin, pull it in with `@import "tailwindcss";`, customize the theme in CSS with `@theme` (not a legacy `tailwind.config.js`), and compose utility classes in markup — extract a component when utilities repeat instead of reaching for `@apply`.

## State Architecture

Model non-trivial UI state with Redux Toolkit: one slice per feature in `@features`, store infrastructure in `@store`, and component reads through the pre-typed hooks.

- Keep purely local, transient presentation state in components when it does not need to survive navigation or coordinate with other features, such as a modal being open or a description being expanded.
- Define each feature as a `createSlice` in `@features/<featureName>` (state types, `initialState`, case reducers), and register its reducer in the single `configureStore` (`@store/store.ts`). Keep `@store` for Redux infrastructure such as `store.ts` and `hooks.ts`; do not put feature slices there. Case reducers mutate the Immer draft — the one place mutation is idiomatic.
- Let `createSlice` generate the action creators; data rides under `action.payload` (Flux Standard Actions). Never spread an action's data as siblings of `type`.
- Keep reducers pure and deterministic — never put randomness or other entropy inside one. Compute it in the action's `prepare` callback (e.g. a shuffle), so the same `(state, action)` always yields the same result and Strict Mode's double-invoke is safe.
- Group a slice's own selectors with its `selectors` option. Expose them through the slice's public API export (`fooSelectors`) and read them as point-free selectors in components (`useAppSelector(fooSelectors.x)`).
- Keep orchestration (multi-step or conditional dispatch) out of components: put it in a thunk (`(): AppThunk => (dispatch, getState) => …`) in the feature slice file. Do not put thunks inside `createSlice`.
- Group a slice's thunks in an `abstract class` with `static` methods, then expose the class through a category export such as `const cardHistoryThunks = CardHistoryThunks`. Components dispatch categorized thunks (`dispatch(cardHistoryThunks.showNext())`), not standalone thunk functions.
- Group browser persistence helpers that belong to a slice in an `abstract class` with `static` methods, such as `const languagePersistence = LanguagePersistence`; keep the listener middleware wiring in `@store/store.ts`.
- Derive expensive or context-specific data (e.g. the language-specific decks) with memoized `createSelector`s over the slice it depends on, so selectors stay pure and point-free (`useAppSelector(selectThing)`) and components never rebuild it. Prefer putting the context into the store over passing it from the component.
- Read and dispatch through the pre-typed hooks in `@store/hooks` (`useAppSelector`, `useAppDispatch`) — not the bare react-redux hooks, and no bespoke per-feature hook.
- Keep only serializable, context-independent data in the store (ids, indices, flags). Resolve it to rendered, context-specific objects in the component — e.g. look up a selected card id in the current-language deck — so a language switch re-renders without touching the store.
- Keep domain/content ids stable across languages. Store those ids in Redux, then resolve them through selectors against the current-language data.
- Organize slice files like `@features/cardHistory/cardHistorySlice.ts`: imports; internal state/action types; constants; persistence category classes when needed for initial state; the `createSlice` call; thunk category classes; helpers; public API constants; final export blocks.
- Wrap helper sections in slice/store modules with a single `// #region Helpers` / `// #endregion` block when helpers sit above the final export blocks. Do not add regions for every small section.
- Export slice modules at the end of the file. Declare public API constants immediately above the final export block (`const fooReducer = fooSlice.reducer`, `const fooActions = fooSlice.actions`, `const fooSelectors = fooSlice.selectors`, `const fooThunks = FooThunks`), then use a final value export block and a separate `export type` block.

## Cross-Slice Selectors

Selectors that read more than one slice are a composition boundary. They belong to neither slice, and they keep components from manually joining store state during render.

- Keep slices independent: a slice never imports another slice.
- Create cross-slice selectors with `createSelector` in a focused feature module named for the view/domain it derives, such as `@features/cards/cardSelectors.ts`; do not put them in `@store` or a generic `selectors.ts`.
- Build them from each slice's public selectors (`fooSelectors.bar`), plus any pure data builders they need. Avoid reaching into another slice's internal state type or implementation details.
- Return render-ready display models when the value combines multiple concerns, such as selected ids plus current language, labels, eyebrows, or localized content.
- Use them directly in components as point-free selectors: `const cardView = useAppSelector(selectCardView)`. Do not wrap them in component lambdas or rebuild the same derived objects in JSX.
- Export cross-slice selectors as named values from their selector module, and import them only where the composed value is needed.

## Internationalization (i18n)

All user-facing copy is translation-complete by construction: the type system, not a runtime fallback, guarantees every language is covered.

- Declare the supported languages once in `@i18n/language`: a `Language` union and a `languages` array. Adding a language there must surface — through type errors — every text pack and data file that still needs a translation.
- Type every translatable string as `Localized` (`Record<Language, string>`), so all languages are required and a missing translation is a compile error, never a silent fallback to another language.
- Keep general UI copy in a single text pack keyed by language (`uiText: Record<Language, UiText>`) with a `UiText` type listing every key, and read the active pack through `useAppSelector(languageSelectors.uiText)`. Never inline a user-facing string in a component.
- Co-locate content/domain copy (names, descriptions, and labels that belong to data such as cards) with its data in `@data` rather than the UI pack, so one source feeds every place that renders it.
- Hold the active language in a Redux slice (`@features/language/languageSlice`): read it with `useAppSelector(languageSelectors.current)`, read general UI copy with `useAppSelector(languageSelectors.uiText)`, change it with `dispatch(languageActions.setLanguage(…))`, sync the initial `<html lang>` in `main.tsx` via `languagePersistence.syncDocumentLanguage`, and persist changes (localStorage + `<html lang>`) via the store's listener middleware using `languagePersistence`. Derive language-specific data (decks) with memoized `createSelector`s over `languageSelectors.current`.
- Reference localized content by stable id and resolve it to the current language at render time, so switching language re-renders already-shown content in the new language instead of leaving a stale string.
- Validate any language value coming from outside the app (storage, URL, query string) with the `isLanguage` guard before using it.
