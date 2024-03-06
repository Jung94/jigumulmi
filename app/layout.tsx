import './globals.scss'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/utils/Provider'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import getQueryClient from '@/lib/utils/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'

import { createClient } from '@/lib/api/supabase/server'
import type { Bakery } from '@/types/bakery'

async function getBakeryList() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bakeries')
    .select('*')

  if (error) console.log("error", error)

  let res: Bakery[] = []
  
  for (let bakery of data!) {
    let _bakery: Bakery = {
      id: bakery.id,
      name: bakery.name,
      category: bakery.category,
      material: bakery.material ? [...bakery.material.split(', ')] : [],
      address: bakery.address,
      phone: bakery.phone,
      menus: bakery.menus ? [...bakery.menus.split(', ')] : [],
      stations: [{name: bakery.station_name_1, line: bakery.station_line_1}, {name: bakery.station_name_2, line: bakery.station_line_2}],
      position: {lat: bakery.position_lat, lng: bakery.position_lng},
      opening_hours: {월: bakery.opening_hour_mon, 화: bakery.opening_hour_tue, 수: bakery.opening_hour_wed, 목: bakery.opening_hour_thu, 금: bakery.opening_hour_fri, 토: bakery.opening_hour_sat, 일: bakery.opening_hour_sun},
      description: bakery.description,
      naver_link: bakery.link,
      images: [bakery.image_1],
    }
    // if (bakery.position) bakery.position = JSON.parse(bakery.position)

    res.push(_bakery)
  }

  return { data: res }
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jigumulmi',
  description: '세상을 구하라. 어-명이다!',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["bakeries"], () => getBakeryList())
  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Hydrate state={dehydratedState}>
            <Header />
            {children}
            {/* <Navbar /> */}
          </Hydrate>
        </Providers>
      </body>
    </html>
  )
}
