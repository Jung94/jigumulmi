import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'

interface SearchState {
  kakaoKeywordSearch: any,
  kakaoCategorySearch: any,
  location: {x: string, y: string},
  bakeries: any[] | null,
  station_cd: string, // 지하철역 검색 코드
  bakery_cd: number | null, // 베이커리 검색 코드
  isShownDetail: boolean, // 상세 페이지 여부
}

const initialState: SearchState = {
  kakaoKeywordSearch: null,
  kakaoCategorySearch: null,
  location: {x: '', y: ''},
  bakeries: null,
  station_cd: "",
  bakery_cd: null,
  isShownDetail: false
}

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    set_kakao_places_func: (state, action: PayloadAction<any>)=>{
      state.kakaoKeywordSearch = action.payload.keywordSearch
      state.kakaoCategorySearch = action.payload.categorySearch
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
    update_bakery_cd: (state, action: PayloadAction<number | null>)=>{
      state.bakery_cd = action.payload
    },
    update_is_shown_detail: (state, action: PayloadAction<boolean>)=>{
      state.isShownDetail = action.payload
    },
  }
})

export const {set_kakao_places_func, update_location, update_bakeries, update_station_cd, update_bakery_cd, update_is_shown_detail} = searchSlice.actions
export default searchSlice.reducer