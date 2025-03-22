import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

interface UserState {
  email: string,
  password: string,
  nickname: string,
  authenticationCode: string,
}

const initialState: UserState = {
  email: '',
  password: '',
  nickname: '',
  authenticationCode: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    update_email: (state, action)=>{
      state.email = action.payload
    },
    update_password: (state, action)=>{
      state.password = action.payload
    },
    update_nickname: (state, action)=>{
      state.nickname = action.payload
    },
    update_code: (state, action)=>{
      state.authenticationCode = action.payload
    },
  }
})

export const {update_email, update_password, update_nickname, update_code} = userSlice.actions
export default userSlice.reducer