import { languageLabels, languages } from '@i18n/language'
import { languageActions, languageSelectors } from '@features/language/languageSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'

export function LanguageToggle() {
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
