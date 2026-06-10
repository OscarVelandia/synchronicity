// Pure, React-free model of the draw history: an ordered list of every card
// that was drawn plus a cursor marking the one on screen. Living outside the
// component keeps the navigation logic small, explicit, and testable on its own.

import type { DeckKind } from '@domain/cards'

// A drawn card is stored by reference (deck + id) rather than by value, so
// switching language re-renders the same card in the new language.
export type DrawnReference = { readonly kind: DeckKind; readonly id: string }

export type CardHistory = {
  readonly entries: readonly DrawnReference[]
  // Index into `entries` of the card on screen; -1 before anything is drawn.
  readonly cursor: number
}

export type CardHistoryAction =
  | { readonly type: 'draw'; readonly payload: DrawnReference }
  | { readonly type: 'previous' }
  | { readonly type: 'next' }

export const emptyCardHistory: CardHistory = { entries: [], cursor: -1 }

export function cardHistoryReducer(
  state: CardHistory,
  action: CardHistoryAction,
): CardHistory {
  switch (action.type) {
    case 'draw':
      // Append the new card and jump the cursor to it.
      return {
        entries: [...state.entries, action.payload],
        cursor: state.entries.length,
      }
    case 'previous':
      return { ...state, cursor: Math.max(0, state.cursor - 1) }
    case 'next':
      // Steps forward through already-drawn cards only; drawing a brand new one
      // when already at the newest card is a side effect owned by the hook.
      return {
        ...state,
        cursor: Math.min(state.entries.length - 1, state.cursor + 1),
      }
  }
}

// The card currently on screen, or null before the first draw.
export function currentReference(state: CardHistory): DrawnReference | null {
  return state.entries[state.cursor] ?? null
}

// True when the cursor sits on the most recently drawn card (or nothing yet),
// i.e. there is no further card to step forward to.
export function isAtNewest(state: CardHistory): boolean {
  return state.cursor >= state.entries.length - 1
}
