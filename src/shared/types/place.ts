export type Cafe = '음료' | '간식';
export type RecyclingCenter = '재활용센터';
export type ZeroWasteShop = '제로웨이스트샵';
export type MainCategory = '음식점' | '카페' | '제로웨이스트샵' | '재활용센터';
export type Restaurant = '한식' | '일식' | '중식' | '양식' | '샐러드' | '샌드위치' | '아시안';
export type SubCategory = Restaurant | Cafe | ZeroWasteShop | RecyclingCenter;
export type Category = {
  categoryGroup: MainCategory;
  category: SubCategory;
}

// image-list
export type PlaceImage = { url: string; isMain: boolean; }

export type SubwayStation = {
  id: number;
  isMain: boolean | null;
  stationName: string;
  subwayStationLineList: { id: number, lineNumber: string }[] | null;
}

// 영업 시간
export type Time = {
  hour?: number;
  minute?: number;
}
export type BusinessHour = {
  isDayOff: boolean;
  dayOfWeek: DayOfTheWeek;
  openTime?: Time | null;
  closeTime?: Time | null;
  breakStart?: Time | null;
  breakEnd?: Time | null;
  temporaryDate: string | null;
}

export type FixedBusinessHour = BusinessHour[]
export type TimeCategory = 'openTime' | 'closeTime' | 'breakStart' | 'breakEnd';
export type DayOfTheWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';