'use client'

import { useRouter } from 'next/navigation'
import styles from './header-mobile.module.scss'
import { Home } from '@/src/shared/assets/icons'

export default function HeaderMobileLayout({
  children,
  showHomeIcon,
  showBackIcon,
  onGoBack,
}: {
  children?: React.ReactNode
  showHomeIcon?: boolean
  showBackIcon?: boolean
  onGoBack?: () => void
}) {
  const router = useRouter()
  const handleGoBackNavigation = () => router.back()

  return (
    <header className={styles['header-mobile-layout']}>
      {(showBackIcon || onGoBack) &&
        <button 
          type='button'
          className={styles['header-mobile-layout-back-icon']}
          onClick={() => onGoBack ? onGoBack() : handleGoBackNavigation()}
        >
          <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      }
      {children}
      {showHomeIcon &&
        <button 
          className={styles['header-mobile-layout-icon']}
          onClick={() => router.push('/')}
        >
          <Home width={24} height={24} />
        </button>
      }
    </header>
  )
}