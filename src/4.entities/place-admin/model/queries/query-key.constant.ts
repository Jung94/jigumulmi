import { placeAmdinAPI } from '@/src/4.entities/place-admin/api/place.constant'

const placeQueryKey = {
  /**
   * @description 장소 리스트 조회
   */
  list: (queryParams: Record<string, any>) => [placeAmdinAPI.base, queryParams],
  district: (queryParams: Record<string, any>) => [placeAmdinAPI.district, queryParams],
}

export default placeQueryKey