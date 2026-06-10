import { useMemo, useState } from 'react'
import { CardView } from '@components/CardView'
import { buildObliqueStrategies } from '@data/obliqueStrategies'
import { buildTarotDeck } from '@data/tarot'
import type { DeckKind } from '@domain/cards'
import { drawCard } from '@domain/draw'
import { useLanguage } from '@i18n/useLanguage'
import { languageLabels, languages } from '@i18n/language'
import { uiText } from '@i18n/uiText'

// A drawn card is stored by reference (deck + id) rather than by value, so
// switching language re-renders the same card in the new language.
type DrawnReference = { readonly kind: DeckKind; readonly id: string }

export default function App() {
  const { language } = useLanguage()
  const text = uiText[language]

  const obliqueDeck = useMemo(() => buildObliqueStrategies(language), [language])
  const tarotDeck = useMemo(() => buildTarotDeck(language), [language])

  const [drawn, setDrawn] = useState<DrawnReference | null>(null)

  const handleDrawOblique = () => {
    setDrawn((previous) => {
      const card = drawCard(obliqueDeck, previous?.id ?? null)

      return { kind: card.kind, id: card.id }
    })
  }

  const handleDrawTarot = () => {
    setDrawn((previous) => {
      const card = drawCard(tarotDeck, previous?.id ?? null)

      return { kind: card.kind, id: card.id }
    })
  }

  const drawnCard = useMemo(() => {
    if (drawn === null) {
      return null
    }

    const deck = drawn.kind === 'tarot' ? tarotDeck : obliqueDeck

    return deck.find((card) => card.id === drawn.id) ?? null
  }, [drawn, tarotDeck, obliqueDeck])

  return (
    <main className="relative mx-auto flex h-svh max-w-220 flex-col items-center gap-4 overflow-hidden px-6 pt-10 pb-6 text-center sm:gap-7 sm:pt-12 sm:pb-8">
      <LanguageToggle />

      <header className="flex flex-col gap-2 sm:gap-2.5">
        <h1 className="font-serif text-[clamp(1.85rem,7vw,3.4rem)] font-semibold tracking-[0.5px] text-gold [text-shadow:0_2px_24px_var(--color-gold-soft)]">
          {text.title}
        </h1>
        <p className="max-w-[38ch] text-[clamp(0.88rem,3.6vw,1.02rem)] text-muted">
          {text.subtitle}
        </p>
      </header>

      <div className="flex flex-nowrap justify-center gap-3 sm:gap-4">
        <DeckButton
          label={text.drawOblique}
          variant="oblique"
          onClick={handleDrawOblique}
        />
        <DeckButton
          label={text.drawTarot}
          variant="tarot"
          onClick={handleDrawTarot}
        />
      </div>

      <section className="flex min-h-0 w-full grow items-start justify-center pt-2">
        {drawnCard === null ? (
          <p className="text-[1.05rem] text-muted italic">{text.placeholder}</p>
        ) : (
          <CardView key={`${drawnCard.kind}-${drawnCard.id}`} card={drawnCard} />
        )}
      </section>

      <footer className="max-w-[50ch] text-[0.76rem] leading-normal text-muted/65">
        {text.footer}
      </footer>
    </main>
  )
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label={uiText[language].languageSwitchLabel}
      className="absolute top-3 right-5 z-10 flex gap-0.5 rounded-full border border-gold-soft bg-white/5 p-0.5 backdrop-blur-sm sm:top-6 sm:right-7 sm:gap-1 sm:p-1"
    >
      {languages.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={option === language}
          className={`cursor-pointer rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.5px] transition focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2 sm:px-3 sm:py-1 sm:text-xs ${
            option === language
              ? 'bg-gold/90 text-bg-bottom'
              : 'text-muted hover:text-ink'
          }`}
        >
          {languageLabels[option]}
        </button>
      ))}
    </div>
  )
}

const deckButtonVariants = {
  oblique:
    'bg-[linear-gradient(180deg,rgba(246,240,224,0.16),rgba(246,240,224,0.06))]',
  tarot:
    'bg-[linear-gradient(180deg,rgba(120,86,196,0.28),rgba(120,86,196,0.12))]',
} as const

function DeckButton({
  label,
  variant,
  onClick,
}: {
  readonly label: string
  readonly variant: keyof typeof deckButtonVariants
  readonly onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border border-gold-soft px-4 py-3 text-sm font-semibold tracking-[0.3px] whitespace-nowrap text-ink transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-[3px] sm:px-6.5 sm:py-3.5 sm:text-base ${deckButtonVariants[variant]}`}
    >
      {label}
    </button>
  )
}
