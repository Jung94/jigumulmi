import Image from 'next/image'
import styles from './Detail.module.scss'

type Props = {
  bakery: any
}

const BakeryDetail = ({ bakery }: Props) => {
  // console.log(bakery)

  return bakery && (
    <div className={styles.card_detail}>
      <div className={styles.card_detail_carousel}>
        <Image fill src={bakery.image_thum} alt={bakery.bakery_nm} />
      </div>
      <div className={styles.card_detail_content}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>{bakery.bakery_nm}</div>
          <div className={styles.category_main}>{bakery.category_main}</div>
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
              <div className={styles.status}>
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
            <div className={styles.menu}>
              <div className={styles.checkbox}>
                <svg width="13px" height="13px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className={styles.menu_nm}>무화과치아바타</div>
              <div className={styles.price}>6,000원</div>
            </div>
            <div className={styles.menu}>
              <div className={styles.checkbox}>
                <svg width="13px" height="13px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className={styles.menu_nm}>무화과치아바타</div>
              <div className={styles.price}>6,000원</div>
            </div>
          </div>
          <div className={styles.content}>
            이모지 넣을 수 있어?
          </div>
        </div>
      </div>
    </div>
  )
}

export default BakeryDetail