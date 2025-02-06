import './globals.scss'
import Script from "next/script"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import { Inter } from 'next/font/google'
import Providers from '@/lib/utils/Provider'
import getQueryClient from '@/lib/utils/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import { getPlaceList } from '@/app/actions'
// import { FacebookPixel } from "@/components/marketing"

// const inter = Inter({ subsets: ['latin'] })
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  title: '지구멀미 - 비건 베이커리를 찾는 가장 쉬운 방법',
  description: '지하철역 주변 가까운 비건 카페, 비건 베이커리 찾기',
  keywords: [
    "지구멀미",
    "지구",
    "비건",
    "비건베이커리",
    "비건카페",
    "비건식당",
    "비건빵",
    "비건음식",
    "비건지도",
    "채식베이커리",
    "통밀빵",
    "다이어트간식",
    "다이어트빵",
    "통밀식빵",
    "사워도우",
    "건강한간식",
    "베지테리언"
  ],
  openGraph: {
    title: "지구멀미 - 비건 베이커리를 찾는 가장 쉬운 방법",
    description: "지하철역 주변 가까운 비건 카페, 비건 베이커리 찾기",
    url: "https://www.jigumulmi.com/",
    siteName: "https://www.jigumulmi.com/",
    images: ["https://contents.jigumulmi.com/marketing/jigumulmi_opengraph.png"],
    type: "website"
  },
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient()
  // await queryClient.prefetchQuery(["places"], () => getPlaceList())
  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en">
      <head>
        <meta name="naver-site-verification" content="75700d447f8d54a9d94333669ae3e3c2de749a14" />
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
        <Script 
          id="meta-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1321800105443062');
            fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display: "none"}} src={"https://www.facebook.com/tr?id=1321800105443062&ev=PageView&noscript=1"} />
        </noscript>
        {/* <FacebookPixel /> */}
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
