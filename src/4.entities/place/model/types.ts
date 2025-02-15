import type {
  Category,
  PlaceImage,
  SubwayStation,
  FixedBusinessHour,
  TimeCategory as TTimeCategory,
  DayOfTheWeek as TDayOfTheWeek,
} from '@/src/shared/types/place'
import type { Member } from '@/src/4.entities/member/model/types';

export type TimeCategory = TTimeCategory;
export type DayOfTheWeek = TDayOfTheWeek;
export type WeeklyBusinessHour = FixedBusinessHour;

export type LiveOpeningInfo = {
  currentOpeningStatus: string;
  nextOpeningInfo: { 
    status: string; 
    at: { hour: number; minute: number; }; 
  };
  weeklyBusinessHour: WeeklyBusinessHour;
}

export type PlaceBasic = {
  id: number;
  name: string;
  address: string;
  contact: string;
  additionalInfo: string;
  imageList: PlaceImage[];
  categoryList: Category[];
  subwayStation: SubwayStation;
  liveOpeningInfo: LiveOpeningInfo;
}

export type Menu = {
  name: string;
  price: string;
  isMain: boolean;
  imageS3Key: string;
  description: string;
  imageFilename: string;
}

export type ReviewStatistics = {
  averageRating: number;
  totalCount: number;
  statistics: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
export type ReviewImage = {
  id: number;
  s3Key: string;
  createAt: string;
}
export type Review = {
  id: number;
  rating: number;
  content: string;
  replyCount: number;
  isEdited: boolean;
  isEditable: boolean;
  deletedAt: string;
  reviewedAt: string;
  imageList: ReviewImage[];
  member: Member;
}

// Request
export type CreateReviewRequestBody = {
  rating: number;
  content?: string;
  imageList?: any[];
}
export type CreateReviewRequest = {
  placeId: number;
  body: CreateReviewRequestBody;
}

// Response
type PageData = {
  totalPage: number;
  totalCount: number;
  currentPage: number;
}

export type FetchPlaceBasicResponse = PlaceBasic

export type FetchMenuListResponse = {
  page: PageData;
  data: Menu[];
}

export type FetchReviewStatisticsResponse = ReviewStatistics
export type FetchReviewImageListResponse = {
  page: PageData;
  data: ReviewImage[];
}
export type FetchReviewListResponse = {
  page: PageData;
  data: Review[];
}

export type FetchSubwayListResponse = {
  id: number;
  isMain: boolean | null;
  stationName: string;
  subwayStationLineList: { id: number; lineNumber: string; }[] | null;
}[]
