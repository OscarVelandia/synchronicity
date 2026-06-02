# Synchronicity

A tiny web app that draws a random card from one of two decks:

- **Oblique Strategies** — Brian Eno & Peter Schmidt's creative-block prompts.
- **Tarot** — the public-domain Rider–Waite–Smith deck (all 78 cards, with imagery).

Two buttons, one card at a time. Each draw avoids immediately repeating the
previous card.

## Tech

- React 19 + TypeScript (strict) + Vite

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
npm run lint     # run ESLint
```

## Project layout

```
public/cards/tarot/   # 78 Rider–Waite–Smith images (sourced from Wikimedia Commons)
src/domain/           # card types + draw logic
src/data/             # the two decks (oblique strategies, tarot)
src/components/        # card rendering
src/App.tsx           # buttons + stage
```

## Credits & licensing

- Tarot imagery: Rider–Waite–Smith deck (1909), public domain, via
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck).
- Oblique Strategies: concept and text by Brian Eno & Peter Schmidt.
