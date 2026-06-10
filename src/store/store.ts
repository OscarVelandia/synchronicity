import {
  configureStore,
  createListenerMiddleware,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit'
import { cardHistoryReducer } from '@features/cardHistory/cardHistorySlice'
import {
  languageActions,
  languagePersistence,
  languageReducer,
} from '@features/language/languageSlice'

const listenerMiddleware = createListenerMiddleware()

// Keep browser side effects out of the language reducer.
listenerMiddleware.startListening({
  actionCreator: languageActions.setLanguage,
  effect: (action) => {
    languagePersistence.persist(action.payload)
  },
})

const store = configureStore({
  reducer: {
    cardHistory: cardHistoryReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppThunk = ThunkAction<void, RootState, unknown, Action>

export { store }

export type { AppDispatch, AppThunk, RootState }
