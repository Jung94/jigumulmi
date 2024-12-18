// 위치 정보 타입
interface Position {
  latitude: number;
  longitude: number;
}

// 지하철역 정보 타입
interface SubwayStation {
  id: number;
  stationName: string;
  isMain: boolean | null;
  subwayStationLineList: { id: number, lineNumber: string }[] | null; // 구체적인 구조를 알면 수정 가능
}

// 카테고리 타입
interface Category {
  categoryGroup: string;
  category: string;
}

// 개별 장소 타입
interface Place {
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

// 최종 응답 타입
interface PlacesResponse {
  page: PageInfo;
  data: Place[];
}

export type {
  Place,
  PlacesResponse
}