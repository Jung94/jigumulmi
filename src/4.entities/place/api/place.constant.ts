const placeAPI = {
  base: '/place',
  subway: '/place/subway', // 지하철역 조회
  menu: (placeId: number) => `/place/${placeId}/menu`,
  basic: (placeId: number) => `/place/${placeId}/basic`,
  review: (placeId: number) => `/place/${placeId}/review`,
  deleteReview: (reviewId: number) => `/place/review/${reviewId}`,
  reviewImage: (placeId: number) => `/place/${placeId}/review/image`,
  reviewStatistics: (placeId: number) => `/place/${placeId}/review/statistics`,
}

export default placeAPI