export const bannerAPI = {
  list: '/banner', // 배너 목록 조회
  detail: (bannerId: number) => `/banner/${bannerId}`,
  placeList: (bannerId: number) => `/banner/${bannerId}/place`, // 배너에 연관된 장소 목록 조회
}