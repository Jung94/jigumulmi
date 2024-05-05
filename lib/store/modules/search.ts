import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'

type Marker = {
  placeId: number
  position: { x: number, y: number }
} | null

interface SearchState {
  kakaoMap: any,
  kakaoKeywordSearch: any,
  kakaoCategorySearch: any,
  location: {x: string, y: string},
  bakeries: any[] | null,
  station_cd: string, // 지하철역 검색 코드
  isShownDetail: boolean, // 상세 페이지 여부
  marker: Marker
}

const initialState: SearchState = {
  kakaoMap: null,
  kakaoKeywordSearch: null,
  kakaoCategorySearch: null,
  location: {x: '', y: ''},
  bakeries: null,
  station_cd: "",
  isShownDetail: false,
  marker: null
}

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    set_kakao_map_func: (state, action: PayloadAction<any>)=>{
      state.kakaoMap = action.payload
    },
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
    update_is_shown_detail: (state, action: PayloadAction<boolean>)=>{
      state.isShownDetail = action.payload
    },
    update_marker: (state, action: PayloadAction<Marker>)=>{
      state.marker = action.payload
    },
  }
})

export const {set_kakao_map_func, set_kakao_places_func, update_location, update_bakeries, update_station_cd, update_is_shown_detail, update_marker} = searchSlice.actions
export default searchSlice.reducer