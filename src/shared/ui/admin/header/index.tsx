'use client'

import styles from './header.module.scss'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/ui/admin'

const Header = () => {
  const router = useRouter()

  const navigateHomePage = () => router.push('/')

  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Button variant="outline" onClick={navigateHomePage}>
          Home
        </Button>
      </div>
    </div>
  )
}

export default Header