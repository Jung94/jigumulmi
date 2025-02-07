export const APIplace = {
  /**
   * @description 장소 리스트 조회
   * @method get
   */
  getPlaceList: "/place",
  /**
   * @description 장소 세부 정보 조회
   * @method get
   */
  getPlaceDetail: (placeId: number) => `/place/${placeId}`,
  /**
   * @description 지하철역 조회
   * @method get
   */
  getSubwayStations: "/place/subway",
  /**
   * @description 장소 등록
   * @method post
   */
  registerPlace: "/place",
}
