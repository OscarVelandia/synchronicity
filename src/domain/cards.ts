export type ObliqueStrategyCard = {
  readonly kind: 'oblique'
  readonly id: string
  readonly text: string
}

export type TarotArcana = 'major' | 'minor'

export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles'

export type TarotCard = {
  readonly kind: 'tarot'
  readonly id: string
  readonly name: string
  readonly arcana: TarotArcana
  // Minor Arcana only.
  readonly suit?: TarotSuit
  readonly imageUrl: string
  readonly uprightMeaning: string
}

export type DrawnCard = ObliqueStrategyCard | TarotCard

export type DeckKind = DrawnCard['kind']
