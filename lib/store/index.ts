import {Store} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"
import reducer, {rootReducer} from "./reducer"

export interface State {
  loading: string
  user: string
}

// export const makeStore = () => {
//   const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//       serializableCheck: false
//     }),
//     // devTools: process.env.NODE_ENV !== "production"
//   })
//   return store
// }

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== "production",
});

// const store = makeStore()

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(store.getState, {
  debug: process.env.NODE_ENV !== "production"
})
export type AppStore = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch