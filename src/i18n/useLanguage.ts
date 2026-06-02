import { createContext, useContext } from 'react'
import type { Language } from '@i18n/language'

export type LanguageContextValue = {
  readonly language: Language
  readonly setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)

  if (value === null) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return value
}
