import placeAPI from '@/src/4.entities/place/api/place.constant'

const placeQueryKey = {
  subway: (queryParams: Record<string, any>) => [placeAPI.subway, queryParams],
}

export default placeQueryKey