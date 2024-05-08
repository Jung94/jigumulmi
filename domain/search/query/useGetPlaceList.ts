import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIsearch } from "@/lib/api/search";

type Props = {
  subwayStationId?: number
  placeId?: number
}

export default function useGetPlaceList ({
  subwayStationId, 
  placeId
}: Props) {
  const response = useQuery(
    [APIsearch.getPlaceList, subwayStationId, placeId],
    () => getAPI(
      APIsearch.getPlaceList,
      { subwayStationId: subwayStationId !== 0 ? (subwayStationId ?? null) : null, placeId: placeId ?? null }
    ), {
      enabled: !(subwayStationId && placeId)
    })
  return response
}

