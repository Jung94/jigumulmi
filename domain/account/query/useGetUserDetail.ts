import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIaccount } from "@/lib/api/account";

export default function useGetUserDetail () {
  const response = useQuery(
    [APIaccount.getUserDetail],
    () => getAPI(APIaccount.getUserDetail))
  return response
}

