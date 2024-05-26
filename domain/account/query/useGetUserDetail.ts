import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIaccount } from "@/lib/api/account";

export async function checkIsLogin() {
  const response = await getAPI(APIaccount.getUserDetail)
  return response
}

export default function useGetUserDetail () {
  const response = useQuery(
    [APIaccount.getUserDetail],
    () => getAPI(APIaccount.getUserDetail))
  // console.log('useGetUserDetail', response)
  return response
}

