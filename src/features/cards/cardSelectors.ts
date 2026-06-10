import { createSelector } from '@reduxjs/toolkit'
import { buildObliqueStrategies } from '@data/obliqueStrategies'
import { buildTarotDeck, tarotSuitLabels } from '@data/tarot'
import type { DrawnCard, TarotCard } from '@domain/cards'
import { cardHistorySelectors } from '@features/cardHistory/cardHistorySlice'
import { languageSelectors } from '@features/language/languageSlice'
import type { Language } from '@i18n/language'
import type { UiText } from '@i18n/uiText'
import { isNil } from '@utils/isNil'

type CardViewModel = {
  readonly card: DrawnCard
  readonly eyebrow: string
}

const selectObliqueDeck = createSelector(
  [languageSelectors.current],
  buildObliqueStrategies,
)

const selectTarotDeck = createSelector([languageSelectors.current], buildTarotDeck)

// Keep the slices independent: history stores ids, this selector resolves them
// against the current-language deck for direct component use.
const selectCard = createSelector(
  [
    cardHistorySelectors.currentReference,
    selectObliqueDeck,
    selectTarotDeck,
  ],
  (reference, obliqueDeck, tarotDeck): DrawnCard | null => {
    if (isNil(reference)) {
      return null
    }

    const deck: readonly DrawnCard[] =
      reference.kind === 'tarot' ? tarotDeck : obliqueDeck

    return deck.find((item) => item.id === reference.id) ?? null
  },
)

const selectCardView = createSelector(
  [selectCard, languageSelectors.current, languageSelectors.uiText],
  (card, language, text): CardViewModel | null => {
    if (isNil(card)) {
      return null
    }

    return {
      card,
      eyebrow:
        card.kind === 'tarot'
          ? formatTarotEyebrow(card, text, language)
          : text.obliqueEyebrow,
    }
  },
)

function formatTarotEyebrow(
  card: TarotCard,
  text: UiText,
  language: Language,
): string {
  switch (card.arcana) {
    case 'major':
      return text.majorArcana
    case 'minor': {
      const suitLabel = isNil(card.suit) ? null : tarotSuitLabels[card.suit][language]

      return isNil(suitLabel)
        ? text.minorArcana
        : `${text.minorArcanaWithSuitPrefix}${suitLabel}`
    }
  }
}

export { selectCard, selectCardView }

export type { CardViewModel }
