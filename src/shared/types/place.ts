export type Restaurant = '한식' | '일식' | '중식' | '양식' | '샐러드' | '샌드위치' | '아시안'
export type Cafe = '음료' | '간식'
export type ZeroWasteShop = '제로웨이스트샵'
export type RecyclingCenter = '재활용센터'
export type MainCategory = '음식점' | '카페' | '제로웨이스트샵' | '재활용센터'
export type SubCategory = Restaurant | Cafe | ZeroWasteShop | RecyclingCenter
export type Category = {
  categoryGroup: MainCategory;
  category: SubCategory;
}