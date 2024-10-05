export type Place = {
  id: number
  name: string
  category: string
  address: string
  contact: string
  menuList: {id: number, name: string}[]
  imageList: { id: number, url: string, isMain: boolean }[],
  subwayStation: SubwayStation
  position: { latitude: number, longitude: number }
  openingHour: { openingHourMon: string, openingHourTue: string, openingHourWed: string, openingHourThu: string, openingHourFri: string, openingHourSat: string, openingHourSun: string }
  additionalInfo: string
  overallReview: OverallReview
  currentOpeningInfo: string,
}

export type PlaceForMarker = { id: number, name: string, latlng: any }

export type OverallReview = { totalCount: number, averageRating: number, statistics: {1: number, 2: number, 3: number, 4: number, 5: number} }

export type SubwayStation = { id: number, isMain: boolean, stationName: string, subwayStationLineList: {id: number, lineNumber: string}[] }

export type PlaceSummary = {
  id: number
  name: string
  categoryList: any[]
  currentOpeningInfo: string
  subwayStation: SubwayStation
  position: { latitude: number, longitude: number }
  imageUrl: string
}