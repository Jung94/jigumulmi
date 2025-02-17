'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './image-list.module.scss'
import { useImagePreview } from '@/src/shared/hooks'
import type { ReviewImage } from '@/src/4.entities/place/model/types'

const ReviewImageList = ({ 
  placeId,
  bannerId,
  imageList,
}: { 
  placeId: number
  bannerId: number
  imageList: ReviewImage[] 
}) => {
  const router = useRouter()
  const nRestImage = imageList.length - 4
  const fourImageList = imageList.slice(0, 4)
  const isOverFourImages = imageList.length > 4
  const ImagePreview = useImagePreview(imageList, { disabledBackdropClosing: true })

  // const handleClickPreviewImage = (startIndex: number) => ImagePreview.open(startIndex)

  const handleReviewImageGalleryNavigation = () => router.push(`/banner/${bannerId}/place/${placeId}/review/image-gallery`)

  return (
    <div className={styles['image-list']} onClick={handleReviewImageGalleryNavigation}>
      {fourImageList.map((rImage, index) => {
        return (
          <div 
            key={rImage.id} 
            className={styles['image-list-image']}
            // onClick={() => (index !== 3 || !isOverFourImages) 
            //   ? handleClickPreviewImage(index)
            //   : handleReviewImageGalleryNavigation()
            // }
          >
            <Image 
              fill
              alt='preview-image'
              style={{ objectFit: 'cover' }}
              src={process.env.NEXT_PUBLIC_CDN + rImage.s3Key}
            />
            {index === 3 && isOverFourImages && 
              <div className={styles['image-list-image-last']}>{nRestImage}개 더보기</div>
            }
          </div>
        )
      })}
      {ImagePreview.create()}
    </div>
  )
}

export default React.memo(ReviewImageList)