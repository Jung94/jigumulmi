export type BannerTableRow = {
  id: number;
  title: string;
  isActive: boolean;
  modifiedAt: string;
}

export type Banner = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  modifiedAt: string;
  outerImageS3Key: string | null;
  innerImageS3Key: string | null;
}

export type BannerPreviewImage = {
  url: string;
  file: File;
} | null;

// create
export type CreateBannerInput = {
  title: string;
  isActive: boolean;
  outerImage: BannerPreviewImage;
  innerImage: BannerPreviewImage;
}

// update
export type UpdateBannerRequest = {
  title: string;
  isActive: boolean;
}

export type UpdateBannerVariables = {
  bannerId: number;
  data: UpdateBannerRequest;
}

export type UpdatePlaceListVariables = {
  bannerId: number;
  data: { placeIdList: number[] };
}

export type DeletePlaceListVariables = UpdatePlaceListVariables

export type UpdateBannerOuterImageVariables = {
  bannerId: number;
  outerImage: File;
}

export type UpdateBannerInnerImageVariables = {
  bannerId: number;
  innerImage: File;
}

type PageInfo = {
  totalCount: number;
  currentPage: number;
  totalPage: number;
}

export type PermittedPlace = {
  id: number;
  name: string;
  district: string;
  subwayStation: {
    id: number;
    isMain: boolean | null;
    stationName: string;
    subwayStationLineList: {
      id: number;
      lineNumber: string;
    }[] | null;
  };
  categoryList: {
    categoryGroup: string;
    category: string;
  }[];
}

export type AssignedPlace = PermittedPlace

// Response
export type CreateBannerResponse = {
  bannerId: number;
}

export type FetchBannerResponse = Banner;

export type FetchBannersResponse = BannerTableRow[];

export type FetchPermittedPlaceList = {
  page: PageInfo;
  data: PermittedPlace[];
}

export type FetchAssignedPlaceList = {
  page: PageInfo;
  data: AssignedPlace[];
}