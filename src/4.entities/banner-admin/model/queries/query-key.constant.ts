import { bannerAmdinAPI } from '@/src/4.entities/banner-admin/api/banner.constant'

const bannerQueryKey = {
  /**
   * @description 배너 상세 조회
   */
  detail: (bannerId: number) => [bannerAmdinAPI.base, bannerId],
  /**
   * @description 배너와 연관된 장소 목록 조회
   */
  placeList: (bannerId: number, queryParams: Record<string, any>) => 
    [bannerAmdinAPI.placeList(bannerId), bannerId, queryParams],
  /**
   * @description 할당 가능한 장소 목록 조회
   */
  permittedPlaceList: (queryParams: Record<string, any>) => 
    [bannerAmdinAPI.parmittedPlaceList, queryParams],
}

export default bannerQueryKey