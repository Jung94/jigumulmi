import {
  Category,
  PlaceImage
} from '@/src/4.entities/place-admin/model/types'

export type Banner = {
  id: number;
  title: string;
  outerImageS3Key: string;
  innerImageS3Key: string;
}

export type PlaceListItem = {
  id: number;
  name: string;
  region: string;
  district: string;
  categoryList: Category[];
  imageList: PlaceImage[];
  currentOpeningStatus: string;
  position: { latitude: number; longitude: number; };
}

export type PlaceForMarker = { id: number, name: string, latlng: any }

// Response
type PageData = {
  totalPage: number;
  totalCount: number;
  currentPage: number;
}
export type FetchBannerResponse = Banner
export type FetchBannerListResponse = Banner[]
export type FetchPlaceListResponse = {
  page: PageData;
  data: PlaceListItem[];
}
