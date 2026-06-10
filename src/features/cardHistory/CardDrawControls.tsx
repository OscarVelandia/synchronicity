import type { DeckKind } from '@domain/cards'
import { cardHistoryActions } from '@features/cardHistory/cardHistorySlice'
import { languageSelectors } from '@features/language/languageSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const deckButtonVariants: Record<DeckKind, string> = {
  oblique:
    'bg-[linear-gradient(180deg,rgba(246,240,224,0.16),rgba(246,240,224,0.06))]',
  tarot:
    'bg-[linear-gradient(180deg,rgba(120,86,196,0.28),rgba(120,86,196,0.12))]',
}

export function CardDrawControls() {
  const dispatch = useAppDispatch()
  const text = useAppSelector(languageSelectors.uiText)

  return (
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
  )
}

function DeckButton({
  label,
  variant,
  onClick,
}: {
  readonly label: string
  readonly variant: DeckKind
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
