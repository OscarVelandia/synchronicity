// Pure, React-free model of the draw history. Each deck keeps its own ordered
// list of drawn card ids plus a cursor, so stepping back and forth through one
// deck never pulls in cards from the other. `active` is the deck on screen.

import type { DeckKind } from '@domain/cards'

// A drawn card is stored by reference (deck + id) rather than by value, so
// switching language re-renders the same card in the new language.
export type DrawnReference = { readonly kind: DeckKind; readonly id: string }

export type DeckHistory = {
  // Ids of cards drawn from this deck, in the order they appeared.
  readonly ids: readonly string[]
  // Index into `ids` of the card on screen; -1 before this deck is drawn.
  readonly cursor: number
}

export type CardHistory = {
  readonly decks: Record<DeckKind, DeckHistory>
  // The deck currently on screen, or null before the first draw.
  readonly active: DeckKind | null
}

export type CardHistoryAction =
  | { readonly type: 'draw'; readonly payload: DrawnReference }
  | { readonly type: 'previous' }
  | { readonly type: 'next' }

const emptyDeckHistory: DeckHistory = { ids: [], cursor: -1 }

export const emptyCardHistory: CardHistory = {
  decks: { oblique: emptyDeckHistory, tarot: emptyDeckHistory },
  active: null,
}

export function cardHistoryReducer(
  state: CardHistory,
  action: CardHistoryAction,
): CardHistory {
  switch (action.type) {
    case 'draw': {
      const { kind, id } = action.payload
      const deck = state.decks[kind]

      // Append to this deck's history, jump its cursor to the new card, and
      // make it the deck on screen.
      return {
        decks: {
          ...state.decks,
          [kind]: { ids: [...deck.ids, id], cursor: deck.ids.length },
        },
        active: kind,
      }
    }
    case 'previous':
    case 'next': {
      if (state.active === null) {
        return state
      }

      // Step within the active deck only; drawing a brand new card when already
      // at the newest is a side effect owned by the hook.
      const deck = state.decks[state.active]
      const cursor =
        action.type === 'previous'
          ? Math.max(0, deck.cursor - 1)
          : Math.min(deck.ids.length - 1, deck.cursor + 1)

      return {
        ...state,
        decks: { ...state.decks, [state.active]: { ...deck, cursor } },
      }
    }
  }
}

// The active deck's history, or null before the first draw.
export function activeDeck(state: CardHistory): DeckHistory | null {
  return state.active === null ? null : state.decks[state.active]
}

// The card currently on screen, or null before the first draw.
export function currentReference(state: CardHistory): DrawnReference | null {
  if (state.active === null) {
    return null
  }

  const deck = state.decks[state.active]
  const id = deck.ids[deck.cursor]

  return id === undefined ? null : { kind: state.active, id }
}

// The card on screen for a given deck, used to avoid drawing it twice in a row.
export function deckCursorId(state: CardHistory, kind: DeckKind): string | null {
  const deck = state.decks[kind]

  return deck.ids[deck.cursor] ?? null
}

// True when the active deck's cursor is on its newest card (or nothing is drawn
// yet), i.e. there is no further card to step forward to.
export function isAtNewest(state: CardHistory): boolean {
  const deck = activeDeck(state)

  return deck === null || deck.cursor >= deck.ids.length - 1
}
