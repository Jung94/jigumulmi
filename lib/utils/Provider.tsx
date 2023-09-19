"use client"

import React from "react"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {Provider as Providers} from "react-redux"
import {makeStore} from "@/lib/store"

const Provider = ({children}: React.PropsWithChildren) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          keepPreviousData: true,
          staleTime: 5000,
          retry: 1
        }
      }
    })
  )

  return (
    <QueryClientProvider client={client}>
      <Providers store={makeStore()}>{children}</Providers>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Provider
