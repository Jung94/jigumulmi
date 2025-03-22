'use client'

import React, { useMemo } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider as Providers } from 'react-redux'
import { store } from '@/lib/store'

export default function Provider({ children }: React.PropsWithChildren) {
  const queryClient = useMemo(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          keepPreviousData: true,
          staleTime: 5000,
          retry: 1
        }
      }
    })
    , []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Providers store={store}>{children}</Providers>
    </QueryClientProvider>
  )
}
