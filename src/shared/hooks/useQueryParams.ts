import { useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type QueryParams = Record<string, string | null>

export default function useQueryParams<T extends Record<string, any>>(
  defaultValues?: T
): { 
  queryParams: T
  updateQueryParams: (params: QueryParams) => void 
  clearQueryParams: () => void
} {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryParams = useMemo<T>(() => {
    const query = { ...(defaultValues || {}) } as Partial<T>

    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        // if (key in query) {
          query[key as keyof T] = value as T[keyof T]
        // }
      }
    }

    return query as T
  }, [searchParams, defaultValues])

  const updateQueryParams = (params: QueryParams) => {
    const currentParams = new URLSearchParams(searchParams?.toString())
  
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        currentParams.delete(key) // 값이 null 또는 빈 문자열이면 삭제
      } else {
        currentParams.set(key, value) // 쿼리스트링 업데이트
      }
    })
  
    const newQueryString = currentParams.toString()
    const newPath = newQueryString ? `?${newQueryString}` : (pathname ?? '')
  
    router.push(newPath)
  }

  const clearQueryParams = () => {
    pathname && router.push(pathname)
  }

  return { queryParams, updateQueryParams, clearQueryParams }
}
