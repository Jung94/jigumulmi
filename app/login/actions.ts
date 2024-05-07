import { postAPI } from "@/lib/api"
import { APIaccount } from '@/lib/api/account'

export async function checkRegistered(code: string, redirectUrl: string) { // 회원가입된 유저인지 아닌지
  const response = await postAPI({apiURL: APIaccount.checkRegisteredUser, body: { code, redirectUrl }})
  return response
}