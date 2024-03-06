export type Bakery = {
  id: number
  name: string
  category: string
  material: string[]
  address: string
  phone: string
  menus: string[]
  stations: { name: string, line: string }[]  // [홍대입구, 신촌]
  position: { lat: number, lng: number }
  opening_hours: { 월: string, 화: string, 수: string, 목: string, 금: string, 토: string, 일: string }
  description: string
  naver_link: string
  images: string[]
} | null