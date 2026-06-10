import { CardDrawControls } from '@features/cardHistory/CardDrawControls'
import { CardNavigation } from '@features/cardHistory/CardNavigation'
import { CardStage } from '@features/cards/CardStage'
import { LanguageToggle } from '@features/language/LanguageToggle'
import { languageSelectors } from '@features/language/languageSlice'
import { useAppSelector } from '@store/hooks'

export default function App() {
  const text = useAppSelector(languageSelectors.uiText)

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

      <CardDrawControls />
      <CardNavigation />
      <CardStage />

      <footer className="max-w-[50ch] text-[0.76rem] leading-normal text-muted/65">
        {text.footer}
      </footer>
    </main>
  )
}
