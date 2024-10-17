import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export type MembersQueryParams = { sort: number, page: number }

export default function useGetMemberList ({ sort, page }: MembersQueryParams) {
  const response = useQuery(
    [APIadmin.members, sort, page],
    () => getAPI(
      APIadmin.members, { sort: sort === 1 ? 'ASC' : 'DESC', page }
    ), {
      // enabled: !(subwayStationId && placeId)
    })
  return response
}

