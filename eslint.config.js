import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Enforce the AGENTS.md control-flow spacing rule: a blank line before
      // every `return`, and both before and after every `if` / `switch`.
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: ['if', 'switch'] },
        { blankLine: 'always', prev: ['if', 'switch'], next: '*' },
      ],
      // Enforce the AGENTS.md function-style rule: arrow functions for anonymous
      // callbacks (named callbacks stay allowed — see the named `useEffect` rule)...
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      // ...`function` declarations for standalone module-level functions, and
      // arrow functions for functions defined inside other functions.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            ':matches(Program, ExportNamedDeclaration) > VariableDeclaration > VariableDeclarator > :matches(ArrowFunctionExpression, FunctionExpression)',
          message:
            'Use a `function` declaration for module-level functions; reserve arrow functions for callbacks and functions nested inside other functions.',
        },
        {
          selector:
            ':matches(FunctionDeclaration, FunctionExpression, ArrowFunctionExpression) FunctionDeclaration',
          message:
            'Use an arrow function for functions defined inside other functions.',
        },
        {
          // Effects must be named so they're identifiable in stack traces / DevTools.
          selector:
            "CallExpression:matches([callee.name='useEffect'], [callee.property.name='useEffect']) > :matches(ArrowFunctionExpression, FunctionExpression[id=null])",
          message:
            'Name the `useEffect` callback: pass a named function expression, e.g. `useEffect(function syncTitle() { … }, [deps])`.',
        },
      ],
    },
  },
])
