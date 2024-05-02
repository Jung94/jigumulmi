export type Place = {
  id: number
  name: string
  category: string
  address: string
  contact: string
  menuList: {id: number, name: string}[]
  subwayStation: { id: number, stationName: string, lineNumber: string }
  position: { latitude: number, longitude: number }
  openingHour: { openingHourMon: string, openingHourTue: string, openingHourWed: string, openingHourThu: string, openingHourFri: string, openingHourSat: string, openingHourSun: string }
  additionalInfo: string
  mainImageUrl: string
  // images: string[]
  overallReview: OverallReview
}

export type OverallReview = { totalCount: number, averageRating: number, statistics: {1: number, 2: number, 3: number, 4: number, 5: number} }

export type PlaceSummary = {
  id: number
  name: string
  subwayStation: { id: number, stationName: string, lineNumber: string }
  position: { latitude: number, longitude: number }
  images: string[]
}