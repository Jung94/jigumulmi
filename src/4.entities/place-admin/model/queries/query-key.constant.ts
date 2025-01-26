import { placeAmdinAPI } from '@/src/4.entities/place-admin/api/place.constant'

const placeQueryKey = {
  /**
   * @description 장소 리스트 조회
   */
  basic: (placeId: number) => [placeAmdinAPI.basic(placeId)],
  menu: (placeId: number) => [placeAmdinAPI.menu(placeId)],
  image: (placeId: number) => [placeAmdinAPI.image(placeId)],
  list: (queryParams: Record<string, any>) => [placeAmdinAPI.base, queryParams],
  district: (queryParams: Record<string, any>) => [placeAmdinAPI.district, queryParams],
}

export default placeQueryKey