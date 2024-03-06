"use client"

import React from 'react'
import Image from 'next/image'
import styles from './header.module.scss'
import { useWindowSize } from '@/lib/hooks'
import SearchBar from '@/components/searchBar'
import Logo from '@/public/jigumulmi_logo.png'

const Header = () => {
  const windowSize = useWindowSize()

  return (
    <div className={styles.container}>
      <header>
        <nav className={styles.nav}>
          <button className={styles.links}>
            {1100 < windowSize.width &&
              <Image src={Logo} width={100} height={25} alt='logo' style={{marginTop: '4px'}} ></Image>
            }
            {windowSize.width <= 1100 &&
              <Image src={Logo} width={85} height={22} alt='logo' style={{marginTop: '8px'}} ></Image>
            }
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