import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export type PlaceQueryParams = { sort: number, page: number }

export default function useGetPlaceList ({sort, page}: PlaceQueryParams) {
  const response = useQuery(
    [APIadmin.place, sort, page],
    () => getAPI(
      APIadmin.place, { direction: sort === 1 ? 'ASC' : 'DESC', page }
    ), {
      // enabled: !(subwayStationId && placeId)
    })
  return response
}

