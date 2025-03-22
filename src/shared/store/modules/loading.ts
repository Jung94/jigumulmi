import {createSlice} from "@reduxjs/toolkit"

interface LoadingState {
  is_loading: boolean
}

const initialState: LoadingState = {
  is_loading: false
}

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    update_is_loading: (state, action) => {
      state.is_loading = action.payload
    }
  }
})

export default loadingSlice.reducer
export const {update_is_loading} = loadingSlice.actions
