import { Store } from 'redux'
import reducer, { rootReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export interface State {
  loading: string
  user: string
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== "production",
});

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(store.getState, {
  debug: process.env.NODE_ENV !== "production"
})
export type AppStore = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch