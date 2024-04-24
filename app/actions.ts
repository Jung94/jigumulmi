'use server'

import { getAPI } from "@/lib/api"
import { APIsearch } from '@/lib/api/search'
import { APIaccount } from '@/lib/api/account'
import { convertPlaceList } from '@/app/search/_utils/convertPlaceList'

export async function getPlaceList() {
  // const res = await fetch()
  const res = await getAPI(
    APIsearch.getPlaceList,
    { subwayStationId: null, placeId: null }
  )
  
  if (res.status !== 200) throw new Error('Failed: getPlaceList')

  return convertPlaceList(res.data)
}