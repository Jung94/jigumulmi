import { useMutation } from "@tanstack/react-query";
import { putAPI } from "@/lib/api";
import { APIaccount } from "@/lib/api/account";

const usePutNickname = () => {
  const response = useMutation(
    [APIaccount.modifyNickname],
    ({ nickname }: { nickname: string }) => putAPI({apiURL: APIaccount.modifyNickname, body: { nickname }}))
  return response
}

export default usePutNickname

