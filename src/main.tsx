import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@styles/index.css'
import App from '@app'
import {
  languagePersistence,
  languageSelectors,
} from '@features/language/languageSlice'
import { store } from '@store/store'
import { isNil } from '@utils/isNil'

const rootElement = document.getElementById('root')

if (isNil(rootElement)) {
  throw new Error('Root element #root was not found')
}

languagePersistence.syncDocumentLanguage(languageSelectors.current(store.getState()))

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
