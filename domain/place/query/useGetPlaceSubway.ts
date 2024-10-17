import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIplace } from "@/lib/api/place";

export default function useGetPlaceSubway (stationName: string) {
  const response = useQuery(
    [APIplace.getSubwayStations, stationName],
    () => getAPI(
      APIplace.getSubwayStations,
      { stationName: stationName }
    ), {
      enabled: !!stationName
    })
  return response
}

