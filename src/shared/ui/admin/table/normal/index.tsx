"use client"

import styles from './normal.module.scss'
import ArrowLeftIcon from "@/public/icons/table/pg-arrow-left"
import ArrowRightIcon from "@/public/icons/table/pg-arrow-right"
import ArrowLeftTwoIcon from "@/public/icons/table/pg-arrow-left-two"
import ArrowRightTwoIcon from "@/public/icons/table/pg-arrow-right-two"

type Props = {
  col: any
  head: any
  body: any
  emptyMsg?: string
  orderToText?: string
  orderStyle?: any
  totalPage: number
  currentPage: number
  rowsPerPage: number
  handlePage: (page: number)=>void
}

export default function table({
  col,
  head, 
  body,
  emptyMsg,
  orderToText="#",
  orderStyle,
  totalPage,
  currentPage,
  rowsPerPage=20,
  handlePage,
}: Props) {
  const pageGroup = Math.ceil(currentPage / 5) // ex - 1: [1, 2, 3, 4, 5], 2: [6, 7, 8]
  const startPage = (pageGroup - 1) * 5 + 1
  const endPage = pageGroup * 5 > totalPage ? totalPage : pageGroup * 5
  const endGroup = Math.ceil(totalPage / 5)

  const isActiveLeft = pageGroup > 1
  const isActiveLeftTwo = pageGroup > 1
  const isActiveRight = endGroup > pageGroup
  const isActiveRightTwo = endGroup > pageGroup

  const handleArrow = (isPossible: boolean, page: number) => {
    if (!isPossible) return
    handlePage(page)
  }

  return (
    <div className={styles.container}>
      <div className={styles.table_wrap}>
        {emptyMsg 
          ? <div className={styles.empty_msg}>{emptyMsg}</div>
          : (
            <table className={styles.table}>
              <colgroup>
                <col />
                {col}
              </colgroup>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.order} style={orderStyle}>{orderToText}</th>
                  {head}
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {body}
              </tbody>
            </table>
          )
        }
        
      </div>

{/* 페이지네이션 */}
      <div className={styles.pagination}>
        <div className={styles.pagination_section}>
          <div className={styles.pagination_box}>
            <div className={[`${styles.pagination_arrow_box}`, `${styles.arrow_left}`].join(" ")}>
              <button
                type="button"
                onClick={() => handleArrow(isActiveLeftTwo, 1)}
                className={[`${styles.arrow_icon_box}`, isActiveLeftTwo && `${styles.active_arrow}`].join(" ")}
              >
                <ArrowLeftTwoIcon disabled={!isActiveLeftTwo} />
              </button>
              <button
                type="button"
                onClick={() => handleArrow(isActiveLeft, startPage - 1)}
                className={[`${styles.arrow_icon_box}`, isActiveLeft && `${styles.active_arrow}`].join(" ")}
              >
                <ArrowLeftIcon disabled={!isActiveLeft} />
              </button>
            </div>

            <div className={styles.page_number_box}>
              {Array.from({length: endPage - startPage + 1}).map((e: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePage(startPage + index)}
                  className={[`${styles.page_number}`, currentPage === startPage + index && `${styles.active}`].join(" ")}
                >
                  {startPage + index}
                </button>
              ))}
            </div>

            <div className={[`${styles.pagination_arrow_box}`, `${styles.arrow_right}`].join(" ")}>
              <button
                type="button"
                onClick={() => handleArrow(isActiveRight, endPage + 1)}
                className={[`${styles.arrow_icon_box}`, isActiveRight && `${styles.active_arrow}`].join(" ")}
              >
                <ArrowRightIcon disabled={!isActiveRight} />
              </button>
              <button
                type="button"
                onClick={() => handleArrow(isActiveRightTwo, totalPage)}
                className={[`${styles.arrow_icon_box}`, isActiveRightTwo && `${styles.active_arrow}`].join(" ")}
              >
                <ArrowRightTwoIcon disabled={!isActiveRightTwo} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.currentAndTotalPage}>
          <span>{currentPage}</span> of <span>{totalPage}</span>
        </div>
      </div>
    </div>
  )
}