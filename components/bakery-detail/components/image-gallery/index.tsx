"use client"

import React from 'react'
import Image from 'next/image'
import styles from './image-gallery.module.scss'
import { useImagePreview } from '@/lib/hooks'
import type { ReviewImage } from '@/types/place'

const ReviewImageGallery = ({ 
  reviewImageList,
  handleCloseImageGallery
}: { 
  reviewImageList: ReviewImage[] 
  handleCloseImageGallery: () => void
}) => {
  const ImagePreview = useImagePreview({ disabledBackdropClosing: true })
  const handleClickPreviewImage = (path: string) => ImagePreview.open(path)

  return (
    <div className={styles['image-gallery']}>
      <div className={styles['image-gallery-header']}>
        <button type='button' className={styles['image-gallery-header-close']} onClick={handleCloseImageGallery}>
          <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M15 6L9 12L15 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <span>사진 모아보기</span>
      </div>
      <div className={styles['image-gallery-list-outer']}>
      <div className={styles['image-gallery-list']}>
        {reviewImageList.map(rImage => {
          return (
            <div 
              key={rImage.id} 
              className={styles['image-gallery-list-image']}
              onClick={() => handleClickPreviewImage(rImage.s3Key)}
            >
              <Image 
                fill
                alt='preview-image'
                className={styles['image-gallery-list-image-content']}
                src={process.env.NEXT_PUBLIC_CDN + rImage.s3Key}
              />
            </div>
          )
        })}
        {ImagePreview.create()}
      </div>
      </div>
    </div>
  )
}

export default React.memo(ReviewImageGallery)