export const APIadmin = {
  /**
   * @description 장소 리스트 조회 / 등록 / 수정
   * @method get/post/put
   */
  place: "/admin/place",
  /**
   * @description 장소 상세 조회
   * @method get
   */
  getPlaceDetail: (placeId: number) => `/admin/place/detail/${placeId}`,
  /**
   * @description 유저 리스트 조회
   * @method get
   */
  members: "/admin/member",
}
