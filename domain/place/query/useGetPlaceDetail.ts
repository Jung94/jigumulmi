import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIplace } from "@/lib/api/place";

export const placeDetailQueryKey = (placeId: number) => APIplace.getPlaceDetail(placeId)

export default function useGetPlaceDetail (placeId: number) {
  const response = useQuery(
    [placeDetailQueryKey(placeId), placeId],
    () => getAPI(placeDetailQueryKey(placeId)), {
      enabled: placeId !== 0
    })
  return response
}

