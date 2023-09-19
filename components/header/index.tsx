import React from 'react'
import styles from './header.module.scss'
import SearchBar from '@/components/searchBar'

const Header = () => {
  return (
    <div className={styles.container}>
      <header>
        <nav>
          <div className={styles.links}>
            <div className={styles.logo}>jigumulmi</div>
            {/* <div className={styles.logo}>JIGUMULMI</div> */}
            {/* <ul>
              <li></li>
            </ul> */}
          </div>

          <div className={styles.buttons}>
            <SearchBar type='station' />
            <SearchBar type='bakery' />
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header