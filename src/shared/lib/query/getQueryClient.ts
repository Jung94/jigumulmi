import { cache } from 'react'
import { QueryClient } from '@tanstack/query-core'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          keepPreviousData: true,
          staleTime: 5000,
          retry: 1,
        },
      },
    })
)

export default getQueryClient
