// Supported UI/content languages for the app. Add a language here and the
// type system will flag every text pack and data file that still needs it.

export type Language = 'en' | 'es'

export const languages: readonly Language[] = ['en', 'es']

// Short labels for the in-app language switch.
export const languageLabels: Record<Language, string> = {
  en: 'EN',
  es: 'ES',
}

// A string that exists in every supported language. Used for both UI copy and
// card content so the two can never drift out of sync per language.
export type Localized = Record<Language, string>

export function isLanguage(value: string): value is Language {
  return languages.some((language) => language === value)
}
