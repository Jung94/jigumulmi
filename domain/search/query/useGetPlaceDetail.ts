import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIsearch } from "@/lib/api/search";

export const placeDetailQueryKey = (placeId: number) => APIsearch.getPlaceDetail(placeId)

export default function useGetPlaceDetail (placeId: number) {
  const response = useQuery(
    [placeDetailQueryKey(placeId), placeId],
    () => getAPI(placeDetailQueryKey(placeId)), {
      enabled: placeId !== 0
    })
  return response
}

