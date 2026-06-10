import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { buildObliqueStrategies } from '@data/obliqueStrategies'
import { buildTarotDeck } from '@data/tarot'
import type { DeckKind } from '@domain/cards'
import type { AppThunk, RootState } from '@store/store'
import { isNil } from '@utils/isNil'
import { shuffle } from '@utils/shuffle'

// Stored by reference (deck + id) so a language switch re-renders it translated.
type DrawnReference = { readonly kind: DeckKind; readonly id: string }

type ShuffleBag = readonly string[]

type DeckHistory = {
  readonly ids: readonly string[]
  readonly cursor: number
  readonly bag: ShuffleBag
}

type CardHistory = {
  readonly decks: Record<DeckKind, DeckHistory>
  readonly active: DeckKind | null
}

const emptyDeckHistory: DeckHistory = { ids: [], cursor: -1, bag: [] }

const initialState: CardHistory = {
  decks: { oblique: emptyDeckHistory, tarot: emptyDeckHistory },
  active: null,
}

// Card ids never change with language, so any language yields the canonical
// list the shuffle bag deals from.
const deckIds: Record<DeckKind, readonly string[]> = {
  oblique: buildObliqueStrategies('en').map((card) => card.id),
  tarot: buildTarotDeck('en').map((card) => card.id),
}

const cardHistorySlice = createSlice({
  name: 'cardHistory',
  initialState,
  reducers: {
    draw: {
      // The shuffle (entropy) is computed here, at dispatch time, so the reducer
      // stays pure and deterministic.
      prepare(kind: DeckKind) {
        return { payload: { kind, refill: shuffle(deckIds[kind]) } }
      },
      reducer(state, action: PayloadAction<{ kind: DeckKind; refill: ShuffleBag }>) {
        const { kind, refill } = action.payload
        const deck = state.decks[kind]
        const current = deck.ids[deck.cursor] ?? null
        const bag =
          deck.bag.length > 0 ? deck.bag : avoidLeadingRepeat(refill, current)
        const [drawnId, ...rest] = bag

        if (isNil(drawnId)) {
          return
        }

        deck.ids.push(drawnId)
        deck.cursor = deck.ids.length - 1
        deck.bag = rest
        state.active = kind
      },
    },
    previous(state) {
      if (isNil(state.active)) {
        return
      }

      const deck = state.decks[state.active]
      deck.cursor = Math.max(0, deck.cursor - 1)
    },
    next(state) {
      if (isNil(state.active)) {
        return
      }

      const deck = state.decks[state.active]
      deck.cursor = Math.min(deck.ids.length - 1, deck.cursor + 1)
    },
    reset() {
      return initialState
    },
  },
  selectors: {
    active: (state) => state.active,
    currentReference: (state): DrawnReference | null => {
      const { active, decks } = state

      if (isNil(active)) {
        return null
      }

      const deck = decks[active]
      const id = deck.ids[deck.cursor]

      return isNil(id) ? null : { kind: active, id }
    },
    position: (state) => {
      const deck = activeDeckHistoryOf(state)

      return isNil(deck) ? 0 : deck.cursor + 1
    },
    total: (state) => {
      const deck = activeDeckHistoryOf(state)

      return isNil(deck) ? 0 : deck.ids.length
    },
    canShowPrevious: (state) => {
      const deck = activeDeckHistoryOf(state)

      return !isNil(deck) && deck.cursor > 0
    },
    isAtNewest: (state) => {
      const deck = activeDeckHistoryOf(state)

      return isNil(deck) || deck.cursor >= deck.ids.length - 1
    },
  },
})

abstract class CardHistoryThunks {
  // At the newest card, "next" doubles as draw from the active deck.
  static showNext(): AppThunk {
    return (dispatch, getState) => {
      const state: RootState = getState()
      const active = cardHistorySelectors.active(state)

      if (!cardHistorySelectors.isAtNewest(state)) {
        dispatch(cardHistoryActions.next())
      } else if (!isNil(active)) {
        dispatch(cardHistoryActions.draw(active))
      }
    }
  }
}

// #region Helpers

// Stops a fresh bag from dealing the just-seen card first (no repeat across
// cycles).
function avoidLeadingRepeat(order: ShuffleBag, current: string | null): ShuffleBag {
  const first = order[0]

  if (isNil(current) || first !== current || order.length < 2) {
    return order
  }

  return [...order.slice(1), first]
}

function activeDeckHistoryOf(state: CardHistory): DeckHistory | null {
  return isNil(state.active) ? null : state.decks[state.active]
}

// #endregion

const cardHistoryReducer = cardHistorySlice.reducer
const cardHistoryActions = cardHistorySlice.actions
const cardHistorySelectors = cardHistorySlice.selectors
const cardHistoryThunks = CardHistoryThunks

export {
  cardHistoryActions,
  cardHistoryReducer,
  cardHistorySelectors,
  cardHistoryThunks,
}

export type { CardHistory, DeckHistory, DrawnReference, ShuffleBag }
