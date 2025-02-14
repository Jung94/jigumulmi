import placeAPI from '@/src/4.entities/place/api/place.constant'

const placeQueryKey = {
  subway: (queryParams: Record<string, any>) => [placeAPI.subway, queryParams],
  basic: (placeId: number) => [placeAPI.basic(placeId)],
  menu: (placeId: number, queryParams?: Record<string, any>) => [placeAPI.menu(placeId), queryParams],
  reviewStatistics: (placeId: number) => [placeAPI.reviewStatistics(placeId)],
  review: (placeId: number, queryParams?: Record<string, any>) => [placeAPI.review(placeId), queryParams],
  reviewImage: (placeId: number, queryParams?: Record<string, any>) => [placeAPI.reviewImage(placeId), queryParams],
}

export default placeQueryKey