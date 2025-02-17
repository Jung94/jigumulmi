export type Member = {
  id: number;
  email: string;
  nickname: string;
  isAdmin: boolean;
  createAt: string;
  deregisteredAt: string;
}

// Response
export type FetchMemberResponse = Member