import { postAPI } from "@/lib/api"
import { APIaccount } from '@/lib/api/account'

export async function checkRegistered(code: string) { // 회원가입된 유저인지 아닌지
  const res = await postAPI({apiURL: APIaccount.checkRegisteredUser, body: { code }})
  return res
}