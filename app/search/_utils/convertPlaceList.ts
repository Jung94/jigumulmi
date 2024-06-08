export const convertPlaceList = (placeList: any[]) => {
  if (typeof placeList !== "object") return []
  return placeList.map(place => {
    return {
      id: place.id,
      name: place.name,
      subwayStation: place.subwayStation ?? [],
      position: {latitude: place.position.latitude, longitude: place.position.longitude},
      images: [place.mainImageUrl],
      // category: place.category,
      // material: place.material 
        // ? [...place.material.split(', ')] 
        // : [],
      // address: place.address,
      // phone: place.phone ?? '',
      // menus: place.menuList 
      //   ? [...place.menuList.map((place: {id: number, name: string}) => place.name)] 
      //   : [],
      // openingHour: {월: place.openingHour.openingHourMon, 화: place.openingHour.openingHourTue, 수: place.openingHour.openingHourWed, 목: place.openingHour.openingHourThu, 금: place.openingHour.openingHourFri, 토: place.openingHour.openingHourSat, 일: place.openingHour.openingHourSun},
      // additionalInfo: place.additionalInfo,
      // placeUrl: place.placeUrl,
    }
  })
}