import { placeAmdinAPI } from '@/src/4.entities/place-admin/api/place.constant'

const placeQueryKey = {
  /**
   * @description 장소 리스트 조회
   */
  menu: (placeId: number) => [placeAmdinAPI.menu(placeId)],
  basic: (placeId: number) => [placeAmdinAPI.basic(placeId)],
  image: (placeId: number) => [placeAmdinAPI.image(placeId)],
  businessHour: (placeId: number, queryParams: Record<string, any>) => [placeAmdinAPI.businessHour(placeId), queryParams],
  list: (queryParams: Record<string, any>) => [placeAmdinAPI.base, queryParams],
  district: (queryParams: Record<string, any>) => [placeAmdinAPI.district, queryParams],
}

export default placeQueryKey