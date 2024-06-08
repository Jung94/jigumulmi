import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIsearch } from "@/lib/api/search";

export default function useGetPlaceList (subwayStationId: number | null) {
  const response = useQuery(
    [APIsearch.getPlaceList, subwayStationId],
    () => getAPI(
      APIsearch.getPlaceList,
      { subwayStationId }
    ), {
      // enabled: !subwayStationId
    })
  return response
}

