import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIplace } from "@/lib/api/place";

export default function useGetPlaceList (subwayStationId: number | null) {
  const response = useQuery(
    [APIplace.getPlaceList, subwayStationId],
    () => getAPI(
      APIplace.getPlaceList,
      { subwayStationId }
    ), {
      // enabled: !subwayStationId
    })
  return response
}

