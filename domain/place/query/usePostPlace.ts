import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIplace } from "@/lib/api/place";

type MutateProps = {
  name: string
  subwayStationId: number
  menuList: string[]
  registrantComment: string
}

export default function usePostPlace() {
  const response = useMutation(
    [APIplace.registerPlace],
    ({ name, subwayStationId, menuList, registrantComment}: MutateProps) => 
      postAPI({apiURL: APIplace.registerPlace, body: { name, subwayStationId, menuList, registrantComment }}))
  return response
}

