import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/utils/Provider'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import getQueryClient from '@/lib/utils/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import { getPlaceList } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jigumulmi',
  description: '세상을 구하라. 어-명이다!',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["places"], () => getPlaceList())
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
