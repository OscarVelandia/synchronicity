import type { TarotCard, TarotSuit } from '@domain/cards'

// Rider-Waite-Smith deck (public domain). Images live in /public/cards/tarot
// and were sourced from Wikimedia Commons.

type MajorDefinition = {
  readonly fileSlug: string
  readonly name: string
  readonly uprightMeaning: string
}

const majorDefinitions: readonly MajorDefinition[] = [
  { fileSlug: 'major-00-the-fool', name: 'The Fool', uprightMeaning: 'New beginnings, spontaneity, and a leap of faith.' },
  { fileSlug: 'major-01-the-magician', name: 'The Magician', uprightMeaning: 'Manifestation, willpower, and resourcefulness.' },
  { fileSlug: 'major-02-the-high-priestess', name: 'The High Priestess', uprightMeaning: 'Intuition, mystery, and the subconscious.' },
  { fileSlug: 'major-03-the-empress', name: 'The Empress', uprightMeaning: 'Abundance, nurturing, and creativity.' },
  { fileSlug: 'major-04-the-emperor', name: 'The Emperor', uprightMeaning: 'Authority, structure, and stability.' },
  { fileSlug: 'major-05-the-hierophant', name: 'The Hierophant', uprightMeaning: 'Tradition, guidance, and shared belief.' },
  { fileSlug: 'major-06-the-lovers', name: 'The Lovers', uprightMeaning: 'Connection, choices, and alignment of values.' },
  { fileSlug: 'major-07-the-chariot', name: 'The Chariot', uprightMeaning: 'Determination, willpower, and victory.' },
  { fileSlug: 'major-08-strength', name: 'Strength', uprightMeaning: 'Courage, patience, and gentle control.' },
  { fileSlug: 'major-09-the-hermit', name: 'The Hermit', uprightMeaning: 'Introspection, solitude, and inner guidance.' },
  { fileSlug: 'major-10-wheel-of-fortune', name: 'Wheel of Fortune', uprightMeaning: 'Cycles, change, and turning points.' },
  { fileSlug: 'major-11-justice', name: 'Justice', uprightMeaning: 'Fairness, truth, and accountability.' },
  { fileSlug: 'major-12-the-hanged-man', name: 'The Hanged Man', uprightMeaning: 'Surrender, a new perspective, and pause.' },
  { fileSlug: 'major-13-death', name: 'Death', uprightMeaning: 'Endings, transformation, and renewal.' },
  { fileSlug: 'major-14-temperance', name: 'Temperance', uprightMeaning: 'Balance, moderation, and patience.' },
  { fileSlug: 'major-15-the-devil', name: 'The Devil', uprightMeaning: 'Attachment, temptation, and material focus.' },
  { fileSlug: 'major-16-the-tower', name: 'The Tower', uprightMeaning: 'Sudden upheaval, revelation, and release.' },
  { fileSlug: 'major-17-the-star', name: 'The Star', uprightMeaning: 'Hope, healing, and renewed faith.' },
  { fileSlug: 'major-18-the-moon', name: 'The Moon', uprightMeaning: 'Illusion, intuition, and the unknown.' },
  { fileSlug: 'major-19-the-sun', name: 'The Sun', uprightMeaning: 'Joy, vitality, and success.' },
  { fileSlug: 'major-20-judgement', name: 'Judgement', uprightMeaning: 'Reckoning, awakening, and renewal.' },
  { fileSlug: 'major-21-the-world', name: 'The World', uprightMeaning: 'Completion, wholeness, and accomplishment.' },
]

type SuitDefinition = {
  readonly id: TarotSuit
  readonly label: string
  readonly theme: string
}

const suitDefinitions: readonly SuitDefinition[] = [
  { id: 'wands', label: 'Wands', theme: 'energy, ambition, and creativity' },
  { id: 'cups', label: 'Cups', theme: 'emotion, relationships, and intuition' },
  { id: 'swords', label: 'Swords', theme: 'intellect, conflict, and communication' },
  { id: 'pentacles', label: 'Pentacles', theme: 'work, resources, and the material world' },
]

type RankDefinition = {
  readonly fileIndex: string
  readonly label: string
  readonly meaningPrefix: string
}

const rankDefinitions: readonly RankDefinition[] = [
  { fileIndex: '01', label: 'Ace', meaningPrefix: 'A new beginning and pure potential in' },
  { fileIndex: '02', label: 'Two', meaningPrefix: 'Balance, partnership, and early choices in' },
  { fileIndex: '03', label: 'Three', meaningPrefix: 'Growth, collaboration, and first results in' },
  { fileIndex: '04', label: 'Four', meaningPrefix: 'Stability, structure, and a steadying pause in' },
  { fileIndex: '05', label: 'Five', meaningPrefix: 'Conflict, loss, and disruption in' },
  { fileIndex: '06', label: 'Six', meaningPrefix: 'Harmony, recovery, and forward progress in' },
  { fileIndex: '07', label: 'Seven', meaningPrefix: 'Reflection, perseverance, and assessment in' },
  { fileIndex: '08', label: 'Eight', meaningPrefix: 'Momentum, movement, and growing mastery in' },
  { fileIndex: '09', label: 'Nine', meaningPrefix: 'Resilience, depth, and near-completion in' },
  { fileIndex: '10', label: 'Ten', meaningPrefix: 'Completion, culmination, and fullness in' },
  { fileIndex: '11', label: 'Page', meaningPrefix: 'Curiosity, learning, and fresh messages about' },
  { fileIndex: '12', label: 'Knight', meaningPrefix: 'Action, pursuit, and bold movement in' },
  { fileIndex: '13', label: 'Queen', meaningPrefix: 'Nurturing mastery and intuitive command of' },
  { fileIndex: '14', label: 'King', meaningPrefix: 'Authority, control, and full command of' },
]

const majorCards: readonly TarotCard[] = majorDefinitions.map(
  (definition): TarotCard => ({
    kind: 'tarot',
    id: `tarot-${definition.fileSlug}`,
    name: definition.name,
    arcana: 'major',
    imageUrl: `${import.meta.env.BASE_URL}cards/tarot/${definition.fileSlug}.jpg`,
    uprightMeaning: definition.uprightMeaning,
  }),
)

const minorCards: readonly TarotCard[] = suitDefinitions.flatMap((suit) =>
  rankDefinitions.map(
    (rank): TarotCard => ({
      kind: 'tarot',
      id: `tarot-${suit.id}-${rank.fileIndex}`,
      name: `${rank.label} of ${suit.label}`,
      arcana: 'minor',
      suit: suit.id,
      imageUrl: `${import.meta.env.BASE_URL}cards/tarot/${suit.id}-${rank.fileIndex}.jpg`,
      uprightMeaning: `${rank.meaningPrefix} ${suit.theme}.`,
    }),
  ),
)

export const tarotDeck: readonly TarotCard[] = [...majorCards, ...minorCards]
