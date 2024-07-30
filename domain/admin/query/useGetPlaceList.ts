import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export type PlaceQueryParams = { sort: number, page: number, placeName: string }

export default function useGetPlaceList ({sort, page, placeName}: PlaceQueryParams) {
  const response = useQuery(
    [APIadmin.place, sort, page, placeName],
    () => getAPI(
      APIadmin.place, { direction: sort === 1 ? 'ASC' : 'DESC', page, placeName }
    ), {
      // enabled: !(subwayStationId && placeId)
    })
  return response
}

