import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIsearch } from "@/lib/api/search";

export default function useGetPlaceSubway (stationName: string) {
  const response = useQuery(
    [APIsearch.getSubwayStations, stationName],
    () => getAPI(
      APIsearch.getSubwayStations,
      { stationName: stationName }
    ), {
      enabled: !!stationName
    })
  return response
}

