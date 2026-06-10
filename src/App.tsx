import { CardView } from '@components/CardView'
import { languageLabels, languages } from '@i18n/language'
import {
  cardHistoryActions,
  cardHistorySelectors,
  cardHistoryThunks,
} from '@features/cardHistory/cardHistorySlice'
import { selectCardView } from '@features/cards/cardSelectors'
import { languageActions, languageSelectors } from '@features/language/languageSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { isNil } from '@utils/isNil'

export default function App() {
  const dispatch = useAppDispatch()
  const text = useAppSelector(languageSelectors.uiText)
  const position = useAppSelector(cardHistorySelectors.position)
  const total = useAppSelector(cardHistorySelectors.total)
  const canShowPrevious = useAppSelector(cardHistorySelectors.canShowPrevious)
  const cardView = useAppSelector(selectCardView)

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
          onClick={() => dispatch(cardHistoryActions.draw('oblique'))}
        />
        <DeckButton
          label={text.drawTarot}
          variant="tarot"
          onClick={() => dispatch(cardHistoryActions.draw('tarot'))}
        />
      </div>

      {total > 0 ? (
        <div className="flex items-center gap-3">
          <NavButton
            label={text.previousCard}
            glyph="‹"
            onClick={() => dispatch(cardHistoryActions.previous())}
            disabled={!canShowPrevious}
          />
          <span className="min-w-[3.5ch] text-xs font-semibold tracking-[1px] text-muted tabular-nums">
            {position} / {total}
          </span>
          <NavButton
            label={text.nextCard}
            glyph="›"
            onClick={() => dispatch(cardHistoryThunks.showNext())}
            disabled={false}
          />
          <span className="mx-0.5 h-5 w-px bg-gold-soft" aria-hidden="true" />
          <NavButton
            label={text.reset}
            glyph="↻"
            onClick={() => dispatch(cardHistoryActions.reset())}
            disabled={false}
          />
        </div>
      ) : null}

      <section className="flex min-h-0 w-full grow items-start justify-center pt-2">
        {isNil(cardView) ? (
          <p className="text-[1.05rem] text-muted italic">{text.placeholder}</p>
        ) : (
          <CardView
            key={`${cardView.card.kind}-${cardView.card.id}`}
            card={cardView.card}
            eyebrow={cardView.eyebrow}
          />
        )}
      </section>

      <footer className="max-w-[50ch] text-[0.76rem] leading-normal text-muted/65">
        {text.footer}
      </footer>
    </main>
  )
}

function LanguageToggle() {
  const dispatch = useAppDispatch()
  const language = useAppSelector(languageSelectors.current)
  const text = useAppSelector(languageSelectors.uiText)

  return (
    <div
      role="group"
      aria-label={text.languageSwitchLabel}
      className="absolute top-3 right-5 z-10 flex gap-0.5 rounded-full border border-gold-soft bg-white/5 p-0.5 backdrop-blur-sm sm:top-6 sm:right-7 sm:gap-1 sm:p-1"
    >
      {languages.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => dispatch(languageActions.setLanguage(option))}
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

function NavButton({
  label,
  glyph,
  onClick,
  disabled,
}: {
  readonly label: string
  readonly glyph: string
  readonly onClick: () => void
  readonly disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gold-soft bg-white/5 text-lg leading-none text-ink transition hover:-translate-y-0.5 hover:border-gold hover:bg-white/10 active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-gold-soft disabled:hover:bg-white/5"
    >
      {glyph}
    </button>
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
