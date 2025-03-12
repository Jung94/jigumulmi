export type Member = {
  id: number;
  email: string;
  isAdmin: boolean;
  nickname: string;
  createdAt: string;
  deregisteredAt: string;
}

// Response
export type FetchMemberResponse = Member;