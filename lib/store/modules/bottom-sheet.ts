import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface SearchState {
  isShown: boolean | null
}

const initialState: SearchState = {
  isShown: null,
}

const bottomSheetSlice = createSlice({
  name: 'bottomSheetSlice',
  initialState,
  reducers: {
    update_is_shown: (state, action: PayloadAction<boolean>)=>{
      state.isShown = action.payload
    },
  }
})

export const { update_is_shown } = bottomSheetSlice.actions
export default bottomSheetSlice.reducer