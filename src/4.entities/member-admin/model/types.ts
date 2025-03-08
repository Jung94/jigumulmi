// 페이지 정보 타입
interface PageInfo {
  totalCount: number;
  currentPage: number;
  totalPage: number;
}

export type Member = {
  id: number;
  email: string;
  isAdmin: boolean;
  nickname: string;
  createdAt: string;
  modifiedAt: string;
  kakaoUserId: string;
  deregisteredAt: string;
}

// Response
export type FetchMemberListResponse = {
  page: PageInfo;
  data: Member[];
}