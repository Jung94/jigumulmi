import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import { BAKERIES } from '@/lib/json/bakery.json'

interface SearchState {
  kakaoKeywordSearch: any,
  location: {x: string, y: string},
  bakeries: any[],
  station_cd: string, // 지하철역 검색 코드
  bakery_cd: number, // 베이커리 검색 코드
}

const initialState: SearchState = {
  kakaoKeywordSearch: null,
  location: {x: '', y: ''},
  bakeries: BAKERIES,
  station_cd: "",
  bakery_cd: 0,
}

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    set_kakao_places_func: (state, action: PayloadAction<any>)=>{
      state.kakaoKeywordSearch = action.payload
    },
    update_location: (state, action: PayloadAction<{x: string, y: string}>)=>{
      state.location = action.payload
    },
    update_bakeries: (state, action: PayloadAction<any[]>)=>{
      state.bakeries = action.payload
    },
    update_station_cd: (state, action: PayloadAction<string>)=>{
      state.station_cd = action.payload
    },
    update_bakery_cd: (state, action: PayloadAction<number>)=>{
      state.bakery_cd = action.payload
    },
  }
})

export const {set_kakao_places_func, update_location, update_bakeries, update_station_cd, update_bakery_cd} = searchSlice.actions
export default searchSlice.reducer