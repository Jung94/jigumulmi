'use server'

import { getAPI } from "@/lib/api";
import { APIsearch } from '@/lib/api/search'
import type { Bakery } from '@/types/bakery'

export async function getPlaceList() {
  // const res = await fetch()
  const res = await getAPI(
    APIsearch.getPlaceList,
    { subwayStationId: null }
  )
  
  if (res.status !== 200) throw new Error('Failed: getPlaceList')

  let placeList: Bakery[] = []
  
  for (let place of res.data) {
    let _bakery: Bakery = {
      id: place.id,
      name: place.name,
      category: place.category,
      material: place.material 
        ? [...place.material.split(', ')] 
        : [],
      address: place.address,
      phone: place.phone ?? '',
      menus: place.menuList 
        ? [...place.menuList.map((place: {id: number, name: string}) => place.name)] 
        : [],
      subwayStation: {id: place.subwayStation.id, stationName: place.subwayStation.stationName, lineNumber: place.subwayStation.lineNumber},
      position: {lat: place.position.latitude, lng: place.position.longitude},
      openingHour: {월: place.openingHour.openingHourMon, 화: place.openingHour.openingHourTue, 수: place.openingHour.openingHourWed, 목: place.openingHour.openingHourThu, 금: place.openingHour.openingHourFri, 토: place.openingHour.openingHourSat, 일: place.openingHour.openingHourSun},
      additionalInfo: place.additionalInfo,
      placeUrl: place.placeUrl,
      images: [place.mainImageUrl],
    }

    placeList.push(_bakery)
  }

  return { data: placeList }
}