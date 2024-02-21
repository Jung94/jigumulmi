"use client"

import React from 'react'
import styles from './header.module.scss'
import { useWindowSize } from '@/lib/hooks'
import SearchBar from '@/components/searchBar'

const Header = () => {
  const windowSize = useWindowSize()
  console.log(windowSize.width)

  return (
    <div className={styles.container}>
      <header>
        <nav className={styles.nav}>
          <div className={styles.links}>
            <div className={styles.logo}>JIGUMULMI</div>
          </div>

          {/* Mobile */}
          {windowSize.width <= 1100 &&
            <div className={styles.links}>
              <div className={styles.registration}>등록하기</div>
            </div>
          }

          {/* PC */}
          {1100 < windowSize.width &&
            <div className={styles.buttons}>
              <SearchBar type='station' />
              {/* <SearchBar type='bakery' /> */}
            </div>
          }
        </nav>
      </header>
    </div>
  )
}

export default Header