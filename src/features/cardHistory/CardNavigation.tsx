import {
  cardHistoryActions,
  cardHistorySelectors,
  cardHistoryThunks,
} from '@features/cardHistory/cardHistorySlice'
import { languageSelectors } from '@features/language/languageSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'

export function CardNavigation() {
  const dispatch = useAppDispatch()
  const text = useAppSelector(languageSelectors.uiText)
  const position = useAppSelector(cardHistorySelectors.position)
  const total = useAppSelector(cardHistorySelectors.total)
  const canShowPrevious = useAppSelector(cardHistorySelectors.canShowPrevious)

  if (total <= 0) {
    return null
  }

  return (
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
