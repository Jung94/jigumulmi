export type Params = {
  placeId?: string
}

export type OpeningHourDay = 
  'openingHourSun' 
  | 'openingHourMon'
  | 'openingHourTue'
  | 'openingHourWed'
  | 'openingHourThu'
  | 'openingHourFri'
  | 'openingHourSat'

export type Position = 
  'latitude' 
  | 'longitude'

export type SubwayStation = {
  id: number, 
  isMain: boolean | null, 
  stationName: string, 
  subwayStationLineList: { id: number, lineNumber: string }[] | null
}

export type Menu = { id: number, name: string }

export type PlaceDetail = {
  id: number | null,
  name: string,
  placeUrl: string,
  position: Record<Position, string>,
  subwayStationList: SubwayStation[],
  categoryList: any[],
  address: string,
  contact: string,
  menuList: Menu[],
  imageList: { id: number, url: string, isMain: boolean }[],
  openingHour: Record<OpeningHourDay, string>,
  additionalInfo: string,
  overallReview: any,
  createdAt: string,
  modifiedAt: string,
  registrantComment: string,
  isApproved: boolean,
  kakaoPlaceId: string | null,
}