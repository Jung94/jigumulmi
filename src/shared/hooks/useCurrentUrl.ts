'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function useCurrentUrl() {
  const pathname = usePathname()
  const searchParams = useSearchParams() || new URLSearchParams()

  const queryString = searchParams.toString()
  const currentUrl = queryString ? `${pathname}?${queryString}` : pathname

  return currentUrl
}
