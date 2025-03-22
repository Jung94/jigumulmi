export type Member = {
  id: number;
  email: string;
  isAdmin: boolean;
  nickname: string;
  createdAt: string;
  deregisteredAt: string;
}

// Request
export type CheckIsRegisteredMemberVariables = {
  code: string;
  redirectUrl: string;
}

// Response
export type FetchMemberResponse = Member;