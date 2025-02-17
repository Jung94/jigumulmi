export const placeAmdinAPI = {
  base: '/admin/place',
  region: '/admin/place/region', // 광역시도 조회
  district: '/admin/place/district', // 시군구 조회
  putPresignedUrl: '/admin/place/menu/s3-put-presigned-url',
  deletePresignedUrl: '/admin/place/menu/s3-delete-presigned-url',
  deletePlace: (placeId: number) => `/admin/place/${placeId}`,
  menu: (placeId: number) => `/admin/place/${placeId}/menu`,
  basic: (placeId: number) => `/admin/place/${placeId}/basic`,
  image: (placeId: number) => `/admin/place/${placeId}/image`,
  businessHour: (placeId: number) => `/admin/place/${placeId}/business-hour`,
  updateFixedBusinessHour: (placeId: number) => `/admin/place/${placeId}/business-hour/fixed`,
  createTemporaryBusinessHour: (placeId: number) => `/admin/place/${placeId}/business-hour/temporary`,
  updateTemporaryBusinessHour: (placeId: number, temporaryBusinessHourId: number) => `/admin/place/${placeId}/business-hour/temporary/${temporaryBusinessHourId}`,
}