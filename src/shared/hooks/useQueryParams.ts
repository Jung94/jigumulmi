import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export default function useQueryParams<T extends Record<string, any>>(defaultValues: T): T {
  const searchParams = useSearchParams()

  const queryParams = useMemo(() => {
    const query: Partial<T> = {}

    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        query[key as keyof T] = value as T[keyof T]
      }
    }

    return { ...defaultValues, ...query }
  }, [searchParams, defaultValues])

  return queryParams as T
}
