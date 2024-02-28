"use client"

import React from 'react'
import styles from './header.module.scss'
import { useWindowSize } from '@/lib/hooks'
import SearchBar from '@/components/searchBar'

const Header = () => {
  const windowSize = useWindowSize()

  return (
    <div className={styles.container}>
      <header>
        <nav className={styles.nav}>
          <button className={styles.links}>
            <div className={styles.logo}>JIGUMULMI</div>
          </button>
          
          {/* PC */}
          {1100 < windowSize.width &&
            <div className={styles.buttons}>
              <SearchBar type='station' />
              {/* <SearchBar type='bakery' /> */}
            </div>
          }

          {/* Mobile */}
          {windowSize.width <= 1100 &&
            <SearchBar type='station' />
          }
        </nav>
      </header>
    </div>
  )
}

export default Header