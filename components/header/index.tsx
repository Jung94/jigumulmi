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
          <button className={`${styles.links} ${styles.logo}`}>
            <div className={styles.logo}>JIGUMULMI</div>
          </button>

          {/* Mobile */}
          {windowSize.width <= 1100 &&
            <button className={`${styles.links} ${styles.registration}`}>
              <div>등록하기</div>
              {/* <svg width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> */}
            </button>
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