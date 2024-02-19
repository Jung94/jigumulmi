import {combineReducers} from "@reduxjs/toolkit"
import {HYDRATE} from "next-redux-wrapper"
import bottomSheet from "./modules/bottom-sheet"
import loading from "./modules/loading"
import search from "./modules/search"
import user from "./modules/user"

export const rootReducer = combineReducers({
  bottomSheet,
  loading,
  search,
  user,
})

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    }
    return nextState
  }
  return rootReducer(state, action)
}

export default reducer
