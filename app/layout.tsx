import './globals.scss'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "@/lib/utils/Provider"
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jigumulmi',
  description: '세상을 구하라. 어-명이다!',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
