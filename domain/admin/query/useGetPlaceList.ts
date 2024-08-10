import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export type PlaceQueryParams = { 
  sort: number
  page: number
  placeName: string
  isFromAdmin: number
}

type Queries = { 
  direction: 'ASC' | 'DESC'
  page: number
  placeName?: string
  isFromAdmin: boolean
}


export default function useGetPlaceList ({sort, page, placeName, isFromAdmin}: PlaceQueryParams) {
  let queries: Queries = { direction: sort === 1 ? 'ASC' : 'DESC', page, isFromAdmin: isFromAdmin === 0 ? false : true }
  if (placeName) queries['placeName'] = placeName

  const response = useQuery(
    [APIadmin.place, sort, page, placeName, isFromAdmin],
    () => getAPI(
      APIadmin.place, queries
    ), {
      // enabled: !(subwayStationId && placeId)
    })
  return response
}

