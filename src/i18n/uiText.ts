import type { Language } from '@i18n/language'

// All non-card UI copy, keyed by language. Card names/meanings and Oblique
// phrases live with their decks in @data; tarot suit labels live in @data/tarot
// so the deck and the card eyebrow can share a single source.
type UiText = {
  readonly title: string
  readonly subtitle: string
  readonly drawOblique: string
  readonly drawTarot: string
  readonly placeholder: string
  readonly footer: string
  readonly languageSwitchLabel: string
  readonly hideDescription: string
  readonly showDescription: string
  readonly majorArcana: string
  readonly minorArcana: string
  readonly minorArcanaWithSuitPrefix: string
  readonly obliqueEyebrow: string
  readonly obliqueCredit: string
  readonly enlargePrefix: string
  readonly closeImage: string
}

export const uiText: Record<Language, UiText> = {
  en: {
    title: 'Synchronicity',
    subtitle:
      'Draw a prompt from the Oblique Strategies, or a card from the Tarot.',
    drawOblique: 'Oblique Strategy',
    drawTarot: 'Tarot Card',
    placeholder: 'Choose a deck to draw your card.',
    footer:
      'Tarot imagery: Rider–Waite–Smith deck (public domain). Oblique Strategies by Brian Eno & Peter Schmidt.',
    languageSwitchLabel: 'Language',
    hideDescription: 'Hide description',
    showDescription: 'Show description',
    majorArcana: 'Major Arcana',
    minorArcana: 'Minor Arcana',
    minorArcanaWithSuitPrefix: 'Minor Arcana · ',
    obliqueEyebrow: 'Oblique Strategies',
    obliqueCredit: 'Brian Eno · Peter Schmidt',
    enlargePrefix: 'Enlarge ',
    closeImage: 'Close image',
  },
  es: {
    title: 'Synchronicity',
    subtitle:
      'Saca una indicación de las Estrategias Oblicuas, o una carta del Tarot.',
    drawOblique: 'Estrategia Oblicua',
    drawTarot: 'Carta de Tarot',
    placeholder: 'Elige una baraja para sacar tu carta.',
    footer:
      'Imágenes del Tarot: baraja Rider–Waite–Smith (dominio público). Estrategias Oblicuas de Brian Eno y Peter Schmidt.',
    languageSwitchLabel: 'Idioma',
    hideDescription: 'Ocultar descripción',
    showDescription: 'Mostrar descripción',
    majorArcana: 'Arcanos Mayores',
    minorArcana: 'Arcanos Menores',
    minorArcanaWithSuitPrefix: 'Arcanos Menores · ',
    obliqueEyebrow: 'Estrategias Oblicuas',
    obliqueCredit: 'Brian Eno · Peter Schmidt',
    enlargePrefix: 'Ampliar ',
    closeImage: 'Cerrar imagen',
  },
}
