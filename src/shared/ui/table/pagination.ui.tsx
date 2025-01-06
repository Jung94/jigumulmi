'use client'

import styles from './table.module.scss'
import ArrowLeftIcon from "@/public/icons/table/pg-arrow-left"
import ArrowRightIcon from "@/public/icons/table/pg-arrow-right"
import ArrowLeftTwoIcon from "@/public/icons/table/pg-arrow-left-two"
import ArrowRightTwoIcon from "@/public/icons/table/pg-arrow-right-two"

type Props = {
  totalPage?: number
  currentPage?: number
  handlePage?: (page: number) => void
}

export default function Pagination({
  totalPage,
  currentPage,
  handlePage,
}: Props) {
  if (!totalPage || !currentPage || !handlePage) return

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
    <div className={styles.pagination}>
      <div className={styles.currentAndTotalPage}>
        <span>{currentPage}</span> of <span>{totalPage}</span>
      </div>
      <div className={styles.pagination_section}>
        <div className={styles.pagination_box}>
          <div className={[`${styles.pagination_arrow_box}`, `${styles.arrow_left}`].join(" ")}>
            <button
              type="button"
              onClick={() => handleArrow(isActiveLeftTwo, 1)}
              className={`${styles['button-arrow']} ${isActiveLeftTwo && styles['arrow-active']}`}
            >
              <ArrowLeftTwoIcon />
            </button>
            <button
              type="button"
              onClick={() => handleArrow(isActiveLeft, startPage - 1)}
              className={`${styles['button-arrow']} ${isActiveLeft && styles['arrow-active']}`}
            >
              <ArrowLeftIcon />
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
              className={`${styles['button-arrow']} ${isActiveRight && styles['arrow-active']}`}
            >
              <ArrowRightIcon />
            </button>
            <button
              type="button"
              onClick={() => handleArrow(isActiveRightTwo, totalPage)}
              className={`${styles['button-arrow']} ${isActiveRightTwo && styles['arrow-active']}`}
            >
              <ArrowRightTwoIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}