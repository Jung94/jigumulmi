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
}

export type PlaceSummary = {
  id: number
  name: string
  subwayStation: { id: number, stationName: string, lineNumber: string }
  position: { latitude: number, longitude: number }
  images: string[]
}