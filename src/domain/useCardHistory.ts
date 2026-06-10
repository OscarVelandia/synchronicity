// React binding for the pure card-history reducer. It wires the reducer to
// component state, injects the decks plus the randomness of `drawCard`, and
// exposes a flat view-model so the UI never touches state or transitions.

import { useMemo, useReducer } from 'react'
import type { DrawnCard } from '@domain/cards'
import {
  cardHistoryReducer,
  currentReference,
  emptyCardHistory,
  isAtNewest,
} from '@domain/cardHistory'
import { drawCard } from '@domain/draw'

export type CardHistoryView = {
  readonly card: DrawnCard | null
  // 1-based position of the current card and the history length, for display.
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

  const currentRef = currentReference(state)

  const draw = (deck: readonly DrawnCard[]) => {
    const card = drawCard(deck, currentRef?.id ?? null)

    dispatch({ type: 'draw', payload: { kind: card.kind, id: card.id } })
  }

  // Resolve the stored reference against the (language-specific) decks, so a
  // language switch re-renders the same card in the new language.
  const card = useMemo(() => {
    if (currentRef === null) {
      return null
    }

    const deck = currentRef.kind === 'tarot' ? tarotDeck : obliqueDeck

    return deck.find((item) => item.id === currentRef.id) ?? null
  }, [currentRef, obliqueDeck, tarotDeck])

  return {
    card,
    position: state.cursor + 1,
    total: state.entries.length,
    canShowPrevious: state.cursor > 0,
    drawOblique: () => draw(obliqueDeck),
    drawTarot: () => draw(tarotDeck),
    showPrevious: () => dispatch({ type: 'previous' }),
    showNext: () => {
      // Walk forward through drawn cards first; at the newest card, draw another
      // from the same deck so "next" doubles as the draw button.
      if (isAtNewest(state)) {
        draw(currentRef?.kind === 'tarot' ? tarotDeck : obliqueDeck)
      } else {
        dispatch({ type: 'next' })
      }
    },
  }
}
