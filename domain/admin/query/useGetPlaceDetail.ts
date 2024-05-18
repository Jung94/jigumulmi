import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

// export type PlaceDetailQueryParams = { placeId: number }

export default function useGetPlaceList (placeId: number | null) {
  const response = useQuery(
    [APIadmin.placeDetail, placeId],
    () => getAPI(
      APIadmin.placeDetail, { placeId }
    ), {
      enabled: !!(placeId)
    })
  return response
}
