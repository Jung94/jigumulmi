export type Bakery = {
  id: number
  name: string
  category: string
  material: string[]
  address: string
  phone: string
  menus: string[]
  subwayStation: { id: number, stationName: string, lineNumber: string }
  position: { lat: number, lng: number }
  openingHour: { 월: string, 화: string, 수: string, 목: string, 금: string, 토: string, 일: string }
  additionalInfo: string
  placeUrl: string
  images: string[]
} | null