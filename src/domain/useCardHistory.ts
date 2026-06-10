// React binding for the pure card-history reducer. It wires the reducer to
// component state, injects the decks plus the randomness of `drawCard`, and
// exposes a flat view-model so the UI never touches state or transitions.

import { useMemo, useReducer } from 'react'
import type { DeckKind, DrawnCard } from '@domain/cards'
import {
  activeDeck,
  cardHistoryReducer,
  currentReference,
  deckCursorId,
  emptyCardHistory,
  isAtNewest,
} from '@domain/cardHistory'
import { drawCard } from '@domain/draw'

export type CardHistoryView = {
  readonly card: DrawnCard | null
  // 1-based position of the current card within the active deck's history, and
  // that deck's length, for display.
  readonly position: number
  readonly total: number
  readonly canShowPrevious: boolean
  readonly drawOblique: () => void
  readonly drawTarot: () => void
  readonly showPrevious: () => void
  readonly showNext: () => void
}

export function useCardHistory(
  obliqueDeck: readonly DrawnCard[],
  tarotDeck: readonly DrawnCard[],
): CardHistoryView {
  const [state, dispatch] = useReducer(cardHistoryReducer, emptyCardHistory)

  const draw = (kind: DeckKind) => {
    const deck = kind === 'tarot' ? tarotDeck : obliqueDeck
    const card = drawCard(deck, deckCursorId(state, kind))

    dispatch({ type: 'draw', payload: { kind, id: card.id } })
  }

  // Resolve the stored reference against the (language-specific) decks, so a
  // language switch re-renders the same card in the new language.
  const current = currentReference(state)
  const currentKind = current?.kind ?? null
  const currentId = current?.id ?? null

  const card = useMemo(() => {
    if (currentKind === null || currentId === null) {
      return null
    }

    const deck = currentKind === 'tarot' ? tarotDeck : obliqueDeck

    return deck.find((item) => item.id === currentId) ?? null
  }, [currentKind, currentId, obliqueDeck, tarotDeck])

  const deck = activeDeck(state)

  return {
    card,
    position: deck === null ? 0 : deck.cursor + 1,
    total: deck === null ? 0 : deck.ids.length,
    canShowPrevious: deck !== null && deck.cursor > 0,
    drawOblique: () => draw('oblique'),
    drawTarot: () => draw('tarot'),
    showPrevious: () => dispatch({ type: 'previous' }),
    showNext: () => {
      // Walk forward through the active deck's drawn cards first; at its newest
      // card, draw another from that same deck so "next" doubles as the draw
      // button.
      if (isAtNewest(state)) {
        if (state.active !== null) {
          draw(state.active)
        }
      } else {
        dispatch({ type: 'next' })
      }
    },
  }
}
