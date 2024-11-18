"use client"

import React from 'react'
import Image from 'next/image'
import styles from './image-list.module.scss'
import { useImagePreview } from '@/lib/hooks'
import type { ReviewImage } from '@/types/place'

const ReviewImageList = ({ 
  reviewImageList,
  handleOpenImageGallery
}: { 
  reviewImageList: ReviewImage[] 
  handleOpenImageGallery: () => void
}) => {
  const nRestImage = reviewImageList.length - 4
  const fourImageList = reviewImageList.slice(0, 4)
  const isOverFourImages = reviewImageList.length > 4
  const ImagePreview = useImagePreview(reviewImageList, { disabledBackdropClosing: true })
  const handleClickPreviewImage = (startIndex: number) => ImagePreview.open(startIndex)

  return (
    <div className={styles['image-list']}>
      {fourImageList.map((rImage, index) => {
        return (
          <div 
            key={rImage.id} 
            className={styles['image-list-image']}
            onClick={() => (index !== 3 || !isOverFourImages) 
              ? handleClickPreviewImage(index)
              : handleOpenImageGallery()
            }
          >
            <Image 
              fill
              alt='preview-image'
              className={styles['image-list-image-content']}
              src={process.env.NEXT_PUBLIC_CDN + rImage.s3Key}
            />
            {index === 3 && isOverFourImages && 
              <div className={styles['image-list-image-last']}>+ {nRestImage}</div>
            }
          </div>
        )
      })}
      {ImagePreview.create()}
    </div>
  )
}

export default React.memo(ReviewImageList)