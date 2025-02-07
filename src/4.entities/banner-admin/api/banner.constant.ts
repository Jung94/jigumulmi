export const bannerAPI = {
  base: '/banner',
}

export const bannerAmdinAPI = {
  base: '/admin/banner',
  parmittedPlaceList: `/admin/banner/place`,
  deleteBanner: (bannerId: number) => `/admin/banner/${bannerId}`,
  placeList: (bannerId: number) => `/admin/banner/${bannerId}/place`,
  putOuterImage: (bannerId: number) => `/admin/banner/${bannerId}/outerImage`,
  putInnerImage: (bannerId: number) => `/admin/banner/${bannerId}/innerImage`,
}