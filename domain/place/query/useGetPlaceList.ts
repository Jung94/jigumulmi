import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIplace } from "@/lib/api/place";

export default function useGetPlaceList (
  subwayStationId: number | null,
  placeName: string | null,
  categoryGroup: string | null
) {
  const response = useQuery(
    [APIplace.getPlaceList, subwayStationId, placeName, categoryGroup],
    () => getAPI(
      APIplace.getPlaceList,
      { subwayStationId, placeName, categoryGroup }
    ), {
      // enabled: !subwayStationId
    })
  return response
}

