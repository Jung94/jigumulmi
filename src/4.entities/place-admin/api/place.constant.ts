export const placeAPI = {
  base: '/place',
  putPresignedUrl: '/place/menu/s3-put-presigned-url',
  deletePresignedUrl: '/place/menu/s3-delete-presigned-url',
}

export const placeAmdinAPI = {
  base: '/admin/place',
  region: '/admin/place/region', // 광역시도 조회
  district: '/admin/place/district', // 시군구 조회
  basic: (placeId: number) => `/admin/place/${placeId}/basic`,
  menu: (placeId: number) => `/admin/place/${placeId}/menu`,
  image: (placeId: number) => `/admin/place/${placeId}/image`,
  imageList: (placeId: number) => `/admin/place/${placeId}/image`,
}