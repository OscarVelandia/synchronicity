import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { isLanguage, type Language } from '@i18n/language'
import { uiText } from '@i18n/uiText'
import { isNil } from '@utils/isNil'

const storageKey = 'synchronicity:language'

abstract class LanguagePersistence {
  static load(): Language | null {
    const stored = window.localStorage.getItem(storageKey)

    return !isNil(stored) && isLanguage(stored) ? stored : null
  }

  static persist(language: Language): void {
    window.localStorage.setItem(storageKey, language)
    LanguagePersistence.syncDocumentLanguage(language)
  }

  static syncDocumentLanguage(language: Language): void {
    document.documentElement.lang = language
  }
}

const languageSlice = createSlice({
  name: 'language',
  initialState: detectLanguage(),
  reducers: {
    setLanguage: (_state, action: PayloadAction<Language>) => action.payload,
  },
  selectors: {
    current: (state): Language => state,
    uiText: (state) => uiText[state],
  },
})

// #region Helpers

// Prefer a previously chosen language, then the browser's, then English.
function detectLanguage(): Language {
  const stored = LanguagePersistence.load()

  if (!isNil(stored)) {
    return stored
  }

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

// #endregion

const languageReducer = languageSlice.reducer
const languageActions = languageSlice.actions
const languageSelectors = languageSlice.selectors
const languagePersistence = LanguagePersistence

export {
  languageActions,
  languagePersistence,
  languageReducer,
  languageSelectors,
}
