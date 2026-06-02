import type { TarotCard, TarotSuit } from '@domain/cards'
import type { Language, Localized } from '@i18n/language'

// Rider-Waite-Smith deck (public domain). Images live in /public/cards/tarot
// and were sourced from Wikimedia Commons. Card identity (id, image, arcana,
// suit) is language-independent; only the display name and meaning vary by
// language, so the same draw can be re-rendered in either language.

// Localized suit names, exported so the card eyebrow in the UI and the minor
// card names below share one source of truth.
export const tarotSuitLabels: Record<TarotSuit, Localized> = {
  wands: { en: 'Wands', es: 'Bastos' },
  cups: { en: 'Cups', es: 'Copas' },
  swords: { en: 'Swords', es: 'Espadas' },
  pentacles: { en: 'Pentacles', es: 'Oros' },
}

type MajorDefinition = {
  readonly fileSlug: string
  readonly name: Localized
  readonly uprightMeaning: Localized
}

const majorDefinitions: readonly MajorDefinition[] = [
  { fileSlug: 'major-00-the-fool', name: { en: 'The Fool', es: 'El Loco' }, uprightMeaning: { en: 'New beginnings, spontaneity, and a leap of faith.', es: 'Nuevos comienzos, espontaneidad y un acto de fe.' } },
  { fileSlug: 'major-01-the-magician', name: { en: 'The Magician', es: 'El Mago' }, uprightMeaning: { en: 'Manifestation, willpower, and resourcefulness.', es: 'Manifestación, voluntad e ingenio.' } },
  { fileSlug: 'major-02-the-high-priestess', name: { en: 'The High Priestess', es: 'La Sacerdotisa' }, uprightMeaning: { en: 'Intuition, mystery, and the subconscious.', es: 'Intuición, misterio y el subconsciente.' } },
  { fileSlug: 'major-03-the-empress', name: { en: 'The Empress', es: 'La Emperatriz' }, uprightMeaning: { en: 'Abundance, nurturing, and creativity.', es: 'Abundancia, cuidado y creatividad.' } },
  { fileSlug: 'major-04-the-emperor', name: { en: 'The Emperor', es: 'El Emperador' }, uprightMeaning: { en: 'Authority, structure, and stability.', es: 'Autoridad, estructura y estabilidad.' } },
  { fileSlug: 'major-05-the-hierophant', name: { en: 'The Hierophant', es: 'El Hierofante' }, uprightMeaning: { en: 'Tradition, guidance, and shared belief.', es: 'Tradición, guía y creencias compartidas.' } },
  { fileSlug: 'major-06-the-lovers', name: { en: 'The Lovers', es: 'Los Enamorados' }, uprightMeaning: { en: 'Connection, choices, and alignment of values.', es: 'Conexión, decisiones y alineación de valores.' } },
  { fileSlug: 'major-07-the-chariot', name: { en: 'The Chariot', es: 'El Carro' }, uprightMeaning: { en: 'Determination, willpower, and victory.', es: 'Determinación, voluntad y victoria.' } },
  { fileSlug: 'major-08-strength', name: { en: 'Strength', es: 'La Fuerza' }, uprightMeaning: { en: 'Courage, patience, and gentle control.', es: 'Coraje, paciencia y control sereno.' } },
  { fileSlug: 'major-09-the-hermit', name: { en: 'The Hermit', es: 'El Ermitaño' }, uprightMeaning: { en: 'Introspection, solitude, and inner guidance.', es: 'Introspección, soledad y guía interior.' } },
  { fileSlug: 'major-10-wheel-of-fortune', name: { en: 'Wheel of Fortune', es: 'La Rueda de la Fortuna' }, uprightMeaning: { en: 'Cycles, change, and turning points.', es: 'Ciclos, cambio y puntos de inflexión.' } },
  { fileSlug: 'major-11-justice', name: { en: 'Justice', es: 'La Justicia' }, uprightMeaning: { en: 'Fairness, truth, and accountability.', es: 'Equidad, verdad y responsabilidad.' } },
  { fileSlug: 'major-12-the-hanged-man', name: { en: 'The Hanged Man', es: 'El Colgado' }, uprightMeaning: { en: 'Surrender, a new perspective, and pause.', es: 'Entrega, una nueva perspectiva y pausa.' } },
  { fileSlug: 'major-13-death', name: { en: 'Death', es: 'La Muerte' }, uprightMeaning: { en: 'Endings, transformation, and renewal.', es: 'Cierres, transformación y renovación.' } },
  { fileSlug: 'major-14-temperance', name: { en: 'Temperance', es: 'La Templanza' }, uprightMeaning: { en: 'Balance, moderation, and patience.', es: 'Equilibrio, moderación y paciencia.' } },
  { fileSlug: 'major-15-the-devil', name: { en: 'The Devil', es: 'El Diablo' }, uprightMeaning: { en: 'Attachment, temptation, and material focus.', es: 'Apego, tentación y foco en lo material.' } },
  { fileSlug: 'major-16-the-tower', name: { en: 'The Tower', es: 'La Torre' }, uprightMeaning: { en: 'Sudden upheaval, revelation, and release.', es: 'Crisis repentina, revelación y liberación.' } },
  { fileSlug: 'major-17-the-star', name: { en: 'The Star', es: 'La Estrella' }, uprightMeaning: { en: 'Hope, healing, and renewed faith.', es: 'Esperanza, sanación y fe renovada.' } },
  { fileSlug: 'major-18-the-moon', name: { en: 'The Moon', es: 'La Luna' }, uprightMeaning: { en: 'Illusion, intuition, and the unknown.', es: 'Ilusión, intuición y lo desconocido.' } },
  { fileSlug: 'major-19-the-sun', name: { en: 'The Sun', es: 'El Sol' }, uprightMeaning: { en: 'Joy, vitality, and success.', es: 'Alegría, vitalidad y éxito.' } },
  { fileSlug: 'major-20-judgement', name: { en: 'Judgement', es: 'El Juicio' }, uprightMeaning: { en: 'Reckoning, awakening, and renewal.', es: 'Evaluación, despertar y renovación.' } },
  { fileSlug: 'major-21-the-world', name: { en: 'The World', es: 'El Mundo' }, uprightMeaning: { en: 'Completion, wholeness, and accomplishment.', es: 'Culminación, plenitud y logro.' } },
]

type SuitDefinition = {
  readonly id: TarotSuit
  readonly theme: Localized
}

const suitDefinitions: readonly SuitDefinition[] = [
  { id: 'wands', theme: { en: 'energy, ambition, and creativity', es: 'la energía, la ambición y la creatividad' } },
  { id: 'cups', theme: { en: 'emotion, relationships, and intuition', es: 'las emociones, las relaciones y la intuición' } },
  { id: 'swords', theme: { en: 'intellect, conflict, and communication', es: 'el intelecto, el conflicto y la comunicación' } },
  { id: 'pentacles', theme: { en: 'work, resources, and the material world', es: 'el trabajo, los recursos y el mundo material' } },
]

type RankDefinition = {
  readonly fileIndex: string
  readonly label: Localized
  readonly meaningPrefix: Localized
}

const rankDefinitions: readonly RankDefinition[] = [
  { fileIndex: '01', label: { en: 'Ace', es: 'As' }, meaningPrefix: { en: 'A new beginning and pure potential in', es: 'Un nuevo comienzo y puro potencial en' } },
  { fileIndex: '02', label: { en: 'Two', es: 'Dos' }, meaningPrefix: { en: 'Balance, partnership, and early choices in', es: 'Equilibrio, alianza y primeras decisiones en' } },
  { fileIndex: '03', label: { en: 'Three', es: 'Tres' }, meaningPrefix: { en: 'Growth, collaboration, and first results in', es: 'Crecimiento, colaboración y primeros resultados en' } },
  { fileIndex: '04', label: { en: 'Four', es: 'Cuatro' }, meaningPrefix: { en: 'Stability, structure, and a steadying pause in', es: 'Estabilidad, estructura y una pausa estabilizadora en' } },
  { fileIndex: '05', label: { en: 'Five', es: 'Cinco' }, meaningPrefix: { en: 'Conflict, loss, and disruption in', es: 'Conflicto, pérdida y alteración en' } },
  { fileIndex: '06', label: { en: 'Six', es: 'Seis' }, meaningPrefix: { en: 'Harmony, recovery, and forward progress in', es: 'Armonía, recuperación y avance en' } },
  { fileIndex: '07', label: { en: 'Seven', es: 'Siete' }, meaningPrefix: { en: 'Reflection, perseverance, and assessment in', es: 'Reflexión, perseverancia y evaluación en' } },
  { fileIndex: '08', label: { en: 'Eight', es: 'Ocho' }, meaningPrefix: { en: 'Momentum, movement, and growing mastery in', es: 'Impulso, movimiento y dominio creciente en' } },
  { fileIndex: '09', label: { en: 'Nine', es: 'Nueve' }, meaningPrefix: { en: 'Resilience, depth, and near-completion in', es: 'Resiliencia, profundidad y culminación cercana en' } },
  { fileIndex: '10', label: { en: 'Ten', es: 'Diez' }, meaningPrefix: { en: 'Completion, culmination, and fullness in', es: 'Culminación, plenitud y totalidad en' } },
  { fileIndex: '11', label: { en: 'Page', es: 'Sota' }, meaningPrefix: { en: 'Curiosity, learning, and fresh messages about', es: 'Curiosidad, aprendizaje y mensajes nuevos sobre' } },
  { fileIndex: '12', label: { en: 'Knight', es: 'Caballero' }, meaningPrefix: { en: 'Action, pursuit, and bold movement in', es: 'Acción, búsqueda y movimiento audaz en' } },
  { fileIndex: '13', label: { en: 'Queen', es: 'Reina' }, meaningPrefix: { en: 'Nurturing mastery and intuitive command of', es: 'Maestría cuidadora y dominio intuitivo de' } },
  { fileIndex: '14', label: { en: 'King', es: 'Rey' }, meaningPrefix: { en: 'Authority, control, and full command of', es: 'Autoridad, control y pleno dominio de' } },
]

// Connector word in a minor card name, e.g. "Ace of Wands" / "As de Bastos".
const minorNameConnector: Localized = { en: 'of', es: 'de' }

export function buildTarotDeck(language: Language): readonly TarotCard[] {
  const majorCards = majorDefinitions.map(
    (definition): TarotCard => ({
      kind: 'tarot',
      id: `tarot-${definition.fileSlug}`,
      name: definition.name[language],
      arcana: 'major',
      imageUrl: `${import.meta.env.BASE_URL}cards/tarot/${definition.fileSlug}.jpg`,
      uprightMeaning: definition.uprightMeaning[language],
    }),
  )

  const minorCards = suitDefinitions.flatMap((suit) =>
    rankDefinitions.map(
      (rank): TarotCard => ({
        kind: 'tarot',
        id: `tarot-${suit.id}-${rank.fileIndex}`,
        name: `${rank.label[language]} ${minorNameConnector[language]} ${tarotSuitLabels[suit.id][language]}`,
        arcana: 'minor',
        suit: suit.id,
        imageUrl: `${import.meta.env.BASE_URL}cards/tarot/${suit.id}-${rank.fileIndex}.jpg`,
        uprightMeaning: `${rank.meaningPrefix[language]} ${suit.theme[language]}.`,
      }),
    ),
  )

  return [...majorCards, ...minorCards]
}
