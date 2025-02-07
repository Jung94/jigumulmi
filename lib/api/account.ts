export const APIaccount = {
  /**
   * @description 회원 등록된 유저인지 아닌지
   * @method post
   */
  checkRegisteredUser: "/member/oauth/kakao/login",
  /**
   * @description 닉네임 수정
   * @method put
   */
  getUserDetail: "/member",
  /**
   * @description 닉네임 수정
   * @method put
   */
  modifyNickname: "/member/nickname",
  /**
   * @description 로그아웃
   * @method post
   */
  logout: "/member/logout",
  /**
   * @description 회원 탈퇴
   * @method post
   */
  deregister: "/member/deregister",
}
