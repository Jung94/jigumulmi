import type { PlaceSummary } from '@/types/place'

export const convertPlaceList = (placeList: any[]): PlaceSummary[] => {
  if (typeof placeList !== "object") return []
  return placeList.map(place => {
    return {
      id: place.id,
      name: place.name,
      category: place.category,
      currentOpeningInfo: place.currentOpeningInfo,
      subwayStation: place.subwayStation ?? [],
      position: {latitude: place.position.latitude, longitude: place.position.longitude},
      imageUrl: place.imageList[0].url,
    }
  })
}