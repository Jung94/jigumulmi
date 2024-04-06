import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIsearch } from "@/lib/api/search";

const useGetPlaces = (subwayStationId?: number) => {
  const project = useQuery(
    [APIsearch.getPlaceList, subwayStationId],
    () => getAPI(
      APIsearch.getPlaceList,
      { subwayStationId: subwayStationId ?? null }
    ), {
      // enabled: isSearched
    })
  return project
}

export default useGetPlaces

