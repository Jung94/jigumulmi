'use client'

import { useRouter } from 'next/navigation'
import styles from './header-mobile.module.scss'

export default function HeaderMobileLayout({
  children,
  showBackIcon,
}: {
  children?: React.ReactNode
  showBackIcon?: boolean
}) {
  const router = useRouter()
  const handleGoBackNavigation = () => router.back()

  return (
    <header className={styles['header-mobile-layout']}>
      {showBackIcon &&
        <button 
          type='button'
          className={styles['header-mobile-layout-back-icon']}
          onClick={handleGoBackNavigation}
        >
          <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      }
      {children}
    </header>
  )
}