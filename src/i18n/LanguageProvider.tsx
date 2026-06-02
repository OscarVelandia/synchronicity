import { useEffect, useState, type ReactNode } from 'react'
import { isLanguage, type Language } from '@i18n/language'
import { LanguageContext } from '@i18n/useLanguage'

const storageKey = 'synchronicity:language'

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readInitialLanguage)

  useEffect(
    function persistLanguage() {
      window.localStorage.setItem(storageKey, language)
      document.documentElement.lang = language
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Prefer a previously chosen language, then fall back to the browser's
// preference, then English.
function readInitialLanguage(): Language {
  const stored = window.localStorage.getItem(storageKey)

  if (stored !== null && isLanguage(stored)) {
    return stored
  }

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}
