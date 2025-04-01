import user from './modules/user'
import search from './modules/search'
import loading from './modules/loading'
import bottomSheet from './modules/bottom-sheet'
import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user,
  search,
  loading,
  bottomSheet,
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
