import { useState, useEffect } from 'react'
import fetchMember from '@/src/4.entities/member/api/fetchMember'

export default function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchMember()
        setIsAuthenticated(true)
      } catch (error: any) {
        if (error.status === 401) {
          setIsAuthenticated(false)
        }
      }
    }

    checkAuth()
  }, [])

  return isAuthenticated // true: 로그인됨, false: 로그아웃 상태, null: 체크 중
}
