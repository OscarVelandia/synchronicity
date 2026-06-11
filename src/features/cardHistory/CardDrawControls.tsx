import type { DeckKind } from '@domain/cards'
import {
  cardHistoryActions,
  cardHistorySelectors,
} from '@features/cardHistory/cardHistorySlice'
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
  const canResetOblique = useAppSelector(cardHistorySelectors.canResetOblique)
  const canResetTarot = useAppSelector(cardHistorySelectors.canResetTarot)
  const canResetBothDecks = useAppSelector(cardHistorySelectors.canResetBothDecks)

  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3">
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

      <div className="flex flex-wrap justify-center gap-2">
        <ResetButton
          label={text.resetOblique}
          onClick={() => dispatch(cardHistoryActions.resetDeck('oblique'))}
          disabled={!canResetOblique}
        />
        <ResetButton
          label={text.resetTarot}
          onClick={() => dispatch(cardHistoryActions.resetDeck('tarot'))}
          disabled={!canResetTarot}
        />
        <ResetButton
          label={text.resetBothDecks}
          onClick={() => dispatch(cardHistoryActions.reset())}
          disabled={!canResetBothDecks}
        />
      </div>
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

function ResetButton({
  label,
  onClick,
  disabled,
}: {
  readonly label: string
  readonly onClick: () => void
  readonly disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-gold-soft bg-white/5 px-3 text-xs font-semibold whitespace-nowrap text-muted transition hover:-translate-y-0.5 hover:border-gold hover:bg-white/10 hover:text-ink active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-gold-soft disabled:hover:bg-white/5 disabled:hover:text-muted sm:px-3.5"
    >
      <span aria-hidden="true">↻</span>
      {label}
    </button>
  )
}
