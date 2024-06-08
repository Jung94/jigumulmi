import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export const placeDetailQueryKey = (placeId: number | null) => 
  APIadmin.getPlaceDetail(placeId ?? 0)

export default function useGetPlaceList (placeId: number | null) {
  const response = useQuery(
    [placeDetailQueryKey(placeId), placeId],
    () => getAPI(
      placeDetailQueryKey(placeId)
    ), {
      enabled: !!(placeId)
    })
  return response
}
