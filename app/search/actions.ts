'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

import { createClient } from '@/lib/api/supabase/server'
import type { Bakeries } from '@/types/bakery'

export async function getBakeryList() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bakeries')
    .select('*')

  if (error) console.log("error", error)

  let res: Bakeries[] = []
  
  for (let bakery of data!) {
    let _bakery: Bakeries = {
      id: bakery.id,
      name: bakery.name,
      category: bakery.name,
      material: bakery.material ? [...bakery.material.split(', ')] : [],
      address: bakery.address,
      phone: bakery.phone,
      menus: bakery.menus ? [...bakery.menus.split(', ')] : [],
      stations: [bakery.station_name_1, bakery.station_name_2],
      position: {lat: bakery.position_lat, lng: bakery.position_lng},
      opening_hours: { 월: bakery.opening_hour_mon, 화: bakery.opening_hour_tue, 수: bakery.opening_hour_wed, 목: bakery.opening_hour_thu, 금: bakery.opening_hour_fri, 토: bakery.opening_hour_sat, 일: bakery.opening_hour_sun },
      description: bakery.description,
      naver_link: bakery.link,
      images: [bakery.image_1],
    }
    // if (bakery.position) bakery.position = JSON.parse(bakery.position)

    res.push(_bakery)
  }
  console.log(res)

  return { data: res }
}

export async function registerBakery(formData: FormData) {
  const supabase = createClient()

  const data = {
    id: 1,
    bakeryName: formData.get('bakery_name') as string,
    subway: formData.get('subway') as string,
    desc: formData.get('desc') as string,
  }
  console.log(data)

  try {
    const { error } = await supabase.from('test_bakery').insert(data)
    if (error) throw error
    console.log('Bakery updated!')
  } catch (error) {
    console.log('Error updating the data!')
  } finally {
    console.log('Updating data is finished.')
  }

  // const { error } = await supabase.auth.signUp(data)

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // redirect('/')
}