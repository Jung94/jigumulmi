import { useState } from 'react'
import styles from './mobile.module.scss'
import Sidebar from '@/src/shared/ui/sidebar'
import SearchBar from '@/components/searchBar'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_is_shown_detail } from '@/lib/store/modules/search'

const HeaderMobile = () => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const kakaoMapFunc = useAppSelector(((state) => state.search.kakaoMap))

  const [shownSidebar, setShownSidebar] = useState(false)

  const handleClickHome = () => {
    if (!kakaoMapFunc) return
    dispatch(update_is_shown_detail(false))
    router.push('/search')
    
    // const moveLatLon = new window.kakao.maps.LatLng(37.523844561019224, 126.98021150388406)
    // kakaoMapFunc.panTo(moveLatLon)
    // kakaoMapFunc.relayout()
    // kakaoMapFunc.setLevel(8)
  }

  const handleCloseSidebar = () => setShownSidebar(false)
  const handleClickHamburger = () => setShownSidebar((prev: boolean) => !prev)

  return (
    <>
      <header className={styles['header']}>
        <div className={`${styles['section']} ${styles['section-left']}`}>
          <button className={styles['move-to-home']} onClick={handleClickHome}>
            <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          {pathname === '/search' &&
            <SearchBar type='station' />
          }
        </div>
        <div className={`${styles['section']} ${styles['section-right']}`}>
          <button className={styles['open-sidebar']} onClick={handleClickHamburger}>
            <svg style={{ paddingTop: '1px' }} width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path d="M3 5H21" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 12H21" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 19H21" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </header>
      <Sidebar active={shownSidebar} handleClose={handleCloseSidebar} />
    </>
  )
}

export default HeaderMobile