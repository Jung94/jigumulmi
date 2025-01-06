import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { placeAmdinAPI } from '../../api/place.constant'
import fetchRegionList from '@/src/4.entities/place-admin/api/fetchRegionList'
import type { FetchRegionListResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchRegionList(): UseQueryResult<FetchRegionListResponse> {
  return useQuery({
    queryKey: [placeAmdinAPI.region],
    queryFn: fetchRegionList,
  })
}
