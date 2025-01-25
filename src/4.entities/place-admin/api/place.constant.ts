export const placeAPI = {
  base: '/place',
}

export const placeAmdinAPI = {
  base: '/admin/place',
  region: '/admin/place/region', // 광역시도 조회
  district: '/admin/place/district', // 시군구 조회
  basic: (placeId: number) => `/admin/place/${placeId}/basic`,
  image: (placeId: number) => `/admin/place/${placeId}/image`,
  imageList: (placeId: number) => `/admin/place/${placeId}/image`,
}