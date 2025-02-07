type Restaurant = '한식' | '일식' | '중식' | '양식' | '샐러드' | '샌드위치' | '아시안'
type Cafe = '음료' | '간식'
type ZeroWasteShop = '제로웨이스트샵'
type RecyclingCenter = '재활용센터'
export type MainCategory = '음식점' | '카페' | '제로웨이스트샵' | '재활용센터'
export type SubCategory = Restaurant | Cafe | ZeroWasteShop | RecyclingCenter
export type Category = {
  categoryGroup: MainCategory;
  category: SubCategory;
}

export type SubwayStation = {
  id: number;
  isMain: boolean | null;
  stationName: string;
  subwayStationLineList: { id: number, lineNumber: string }[] | null;
}

type Position = {
  latitude: number;
  longitude: number;
}

export type PlaceBasic = {
  id: number;
  name: string;
  address: string;
  contact: string;
  region: string;
  placeUrl: string;
  createdAt: string;
  districtId: number;
  modifiedAt: string;
  position: Position;
  isApproved: boolean;
  kakaoPlaceId: string;
  additionalInfo: string;
  categoryList: Category[];
  registrantComment: string;
  subwayStationList: SubwayStation[];
}

export type PlaceMenu = {
  name: string;
  price: string;
  isMain: boolean;
  description: string;
  imageS3Key: string | null;
}

export type MenuImage = {
  file: File;
  urlFromBlob: string; // blob 임시 url
}

export type PlaceMenuInput = {
  id: string;
  name: string;
  price: string;
  isNew?: boolean;
  isMain: boolean;
  imageS3Key?: string;
  tempImage?: MenuImage; // 임시 이미지
  description: string;
}

export type PlaceImage = { url: string; isMain: boolean }
export type PlaceImageList = PlaceImage[]

export type Time = {
  hour?: number;
  minute?: number;
}

export type BusinessHour = {
  openTime?: Time | null;
  closeTime?: Time | null;
  breakStart?: Time | null;
  breakEnd?: Time | null;
  isDayOff?: boolean;
}

export type HasBreakTime = {
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
}

export type DayOfTheWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type TimeCategory = 'openTime' | 'closeTime' | 'breakStart' | 'breakEnd'

export type FixedBusinessHour = {
  monday: BusinessHour | null;
  tuesday: BusinessHour | null;
  wednesday: BusinessHour | null;
  thursday: BusinessHour | null;
  friday: BusinessHour | null;
  saturday: BusinessHour | null;
  sunday: BusinessHour | null;
};

export type TemporaryBusinessHour = {
  id?: number;
  date: Date;
  businessHour?: BusinessHour;
};

export type PlaceBusinessHour = {
  fixedBusinessHour: FixedBusinessHour;
  temporaryBusinessHour: TemporaryBusinessHour[];
}

// 리스트 row
export type PlaceRow = {
  id: number;
  name: string;
  imageList: any[] | null; // 이미지 리스트 구조를 알면 구체화 가능
  position: Position;
  subwayStation: SubwayStation;
  categoryList: Category[];
  surroundingDateOpeningHour: any | null; // 구체적인 구조를 알면 수정 가능
  currentOpeningInfo: any | null; // 구체적인 구조를 알면 수정 가능
  isApproved: boolean;
}

// 페이지 정보 타입
interface PageInfo {
  totalCount: number;
  currentPage: number;
  totalPage: number;
}

//Request
export type CreatePlaceVariables = {
  isApproved: boolean;
  name: string;
  region: string;
  address: string;
  contact: string;
  placeUrl: string;
  districtId: number;
  position: Position;
  kakaoPlaceId: string;
  additionalInfo: string;
  categoryList: Category[];
  registrantComment: string;
  subwayStationIdList: number[];
}

export type CreatePlaceBasicInput = {
  isApproved: boolean;
  name: string;
  region: string;
  address: string;
  contact: string;
  placeUrl: string;
  districtId: number;
  position: Position;
  kakaoPlaceId: string;
  additionalInfo: string;
  categoryList: Category[];
  registrantComment: string;
  subwayStationList: SubwayStation[];
}

export type UpdatePlaceBasicVariables = {
  placeId: number;
  data: CreatePlaceVariables;
}

export type UpdatePlaceMenu = {
  name: string;
  price: string;
  isMain: boolean;
  description: string;
  fullFilename: string | null;
}

export type UpdatePlaceMenuVariables = {
  placeId: number;
  data: UpdatePlaceMenu[];
}

export type UpdatePlaceImageListVariables = {
  placeId: number;
  data: PlaceImage[];
}

export type CreateTemporaryBusinessHour = {
  placeId: number;
  body: {
    date: string;
    businessHour: {
      openTime: Time | null;
      closeTime: Time | null;
      breakStart: Time | null;
      breakEnd: Time | null;
      isDayOff: boolean;
    };
  };
}

export type UpdateTemporaryBusinessHour = {
  placeId: number;
  temporaryBusinessHourId: number;
  body: {
    date: string;
    businessHour: {
      openTime: Time | null;
      closeTime: Time | null;
      breakStart: Time | null;
      breakEnd: Time | null;
      isDayOff: boolean;
    };
  };
}

export type DeleteTemporaryBusinessHour = {
  placeId: number;
  temporaryBusinessHourId: number;
}

// Response
export type FetchPlaceBasicResponse = PlaceBasic

export type FetchPlaceMenuResponse = PlaceMenu[]

export type FetchPlaceImageResponse = PlaceImage[]

export type FetchPlaceBusinessHourResponse = PlaceBusinessHour

export type FetchPlaceListResponse = {
  page: PageInfo;
  data: PlaceRow[];
}

export type FetchRegionListResponse = string[]

export type FetchDistrictListResponse = { id: number; title: string; }[]

export type CreateBannerResponse = {
  placeId: number;
}