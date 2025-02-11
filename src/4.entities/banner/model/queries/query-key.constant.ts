import { bannerAPI } from '@/src/4.entities/banner/api/banner.constant'

const bannerQueryKey = {
  /**
   * @description 배너 목록 조회
   */
  list: () => [bannerAPI.list],
  /**
   * @description 배너 개별 조회
   */
  detail: (bannerId: number) => [bannerAPI.detail(bannerId)],
  /**
   * @description 배너와 연관된 장소 목록 조회
   */
  placeList: (bannerId: number) => [bannerAPI.placeList(bannerId)],
}

export default bannerQueryKey