import { useState } from 'react'
import { CardView } from '@components/CardView'
import { obliqueStrategies } from '@data/obliqueStrategies'
import { tarotDeck } from '@data/tarot'
import type { DrawnCard } from '@domain/cards'
import { drawCard } from '@domain/draw'

const texts = {
  title: 'Synchronicity',
  subtitle: 'Draw a prompt from the Oblique Strategies, or a card from the Tarot.',
  drawOblique: 'Oblique Strategy',
  drawTarot: 'Tarot Card',
  placeholder: 'Choose a deck to draw your card.',
  footer:
    'Tarot imagery: Rider–Waite–Smith deck (public domain). Oblique Strategies by Brian Eno & Peter Schmidt.',
} as const

export default function App() {
  const [drawn, setDrawn] = useState<DrawnCard | null>(null)

  const handleDrawOblique = () => {
    setDrawn((previous) => drawCard(obliqueStrategies, previous?.id ?? null))
  }

  const handleDrawTarot = () => {
    setDrawn((previous) => drawCard(tarotDeck, previous?.id ?? null))
  }

  return (
    <main className="mx-auto flex h-svh max-w-220 flex-col items-center gap-7 overflow-hidden px-6 pt-12 pb-8 text-center">
      <header className="flex flex-col gap-2.5">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,3.4rem)] font-semibold tracking-[0.5px] text-gold [text-shadow:0_2px_24px_var(--color-gold-soft)]">
          {texts.title}
        </h1>
        <p className="max-w-[38ch] text-[1.02rem] text-muted">{texts.subtitle}</p>
      </header>

      <div className="flex flex-wrap justify-center gap-4">
        <DeckButton
          label={texts.drawOblique}
          variant="oblique"
          onClick={handleDrawOblique}
        />
        <DeckButton
          label={texts.drawTarot}
          variant="tarot"
          onClick={handleDrawTarot}
        />
      </div>

      <section className="flex min-h-0 w-full grow items-center justify-center">
        {drawn === null ? (
          <p className="text-[1.05rem] text-muted italic">{texts.placeholder}</p>
        ) : (
          <CardView key={`${drawn.kind}-${drawn.id}`} card={drawn} />
        )}
      </section>

      <footer className="max-w-[50ch] text-[0.76rem] leading-normal text-muted/65">
        {texts.footer}
      </footer>
    </main>
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
      className={`cursor-pointer rounded-full border border-gold-soft px-6.5 py-3.5 text-base font-semibold tracking-[0.3px] text-ink transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-[3px] ${deckButtonVariants[variant]}`}
    >
      {label}
    </button>
  )
}
