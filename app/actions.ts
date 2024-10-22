'use server'

import { getAPI } from "@/lib/api"
import { APIplace } from '@/lib/api/place'
import { convertPlaceList } from '@/app/search/_utils/convertPlaceList'

export async function getPlaceList() {
  const res = await getAPI(APIplace.getPlaceList, { subwayStationId: null, placeId: null })
  
  if (res.status !== 200) throw new Error('Failed: getPlaceList')

  return convertPlaceList(res.data)
}