"use client"

import Image from 'next/image'
import styles from './Detail.module.scss'
import { useWindowSize } from '@/lib/hooks'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_is_shown_detail } from '@/lib/store/modules/search'
import type { Bakery } from '@/types/bakery'

type Props = {
  bakery: Bakery
}

const BakeryDetail = ({ bakery }: Props) => {
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const isShownDetail = useAppSelector(((state) => state.search.isShownDetail))

  const closeDetailOnMobile = () => {
    dispatch(update_is_shown_detail(false))
  }

  return bakery && (windowSize.width <= 1100 ? isShownDetail : true) && (
    <div className={styles.card_detail}>
      <div className={styles.header}>
        <div className={styles.icon_close} onClick={closeDetailOnMobile}>
          <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
      <div className={styles.card_detail_carousel}>
        <Image fill src={bakery.images[0]} alt={bakery.name} style={{objectFit: 'cover'}} />
      </div>
      <div className={styles.card_detail_content}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>{bakery.name}</div>
          <div className={styles.category}>{bakery.category}</div>
        </div>
        <div className={styles.info_wrap}>
          <div className={styles.info}>
            <div className={styles.left} style={{margin: "0 0 0 -1px"}}>
              <svg width="17px" height="17px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#000000" strokeWidth="1.5"></path>
                <path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <div className={styles.right}>
              <div className={styles.address}>{bakery.address}</div>
              {/* <div className={styles.station}>2호선 홍대입구</div> */}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>
              <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M12 6v6h6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <div className={styles.right}>
              <div className={styles.opening_hours}>
                {/* <div className={styles.current_status}>영업 중</div>
                <div className={styles.time}>22시까지</div> */}
                {Object.entries(bakery.opening_hours).map((h: any, idx: number) =>
                  <div key={String(idx)} className={styles.time_wrap}>
                    <div className={styles.day}>
                      {h[0]}
                    </div>
                    <div className={styles.time}>
                      <div className={styles.start}>{h[1].split(" - ")[0]}</div>
                      {h[1].split(" - ")[1] && <div className={styles.divider}>~</div>}
                      <div className={styles.end}>{h[1].split(" - ")[1]}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.main_menus}>
            {bakery.menus.map((menu: any) => {
              return (
                <div key={menu} className={styles.menu}>
                  <div className={styles.checkbox}>
                    <svg width="11px" height="11px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                      <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className={styles.menu_nm}>{menu}</div>
                  {/* <div className={styles.price}>6,000원</div> */}
                </div>
              )
            })}
          </div>
          <div className={styles.content}>
            {bakery.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BakeryDetail