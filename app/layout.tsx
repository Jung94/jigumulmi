import './globals.scss'
import Script from "next/script"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import { Inter } from 'next/font/google'
import Providers from '@/lib/utils/Provider'
import getQueryClient from '@/lib/utils/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import { getPlaceList } from '@/app/actions'

// const inter = Inter({ subsets: ['latin'] })
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

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
      <head>
        <Script 
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ml4k9s5lc3");
            `
          }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0Q5RSTCK8N" />
        <Script 
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0Q5RSTCK8N');
            `
          }}
        />
      </head>
      <body className={pretendard.className}>
        <Providers>
          <Hydrate state={dehydratedState}>
            {children}
          </Hydrate>
        </Providers>
      </body>
    </html>
  )
}
