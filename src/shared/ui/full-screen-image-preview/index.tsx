"use client"

import Image from 'next/image'
import styles from './preview.module.scss'

export default function FullScreenImagePreview({ path }: { path: string }) {
  return (
    <div className={styles['preview']}>
      <div className={styles['preview-close']}></div>
      {/* <div className={styles['preview-']}>
        <Image 
          fill
          src={process.env.NEXT_PUBLIC_CDN + path}
          alt='preview-image'
          className={styles.review_card_image_preview_image_content}
        />
      </div> */}
    </div>
  )
}