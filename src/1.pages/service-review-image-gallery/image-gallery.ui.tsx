'use client'

import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import styles from './image-gallery.module.scss'
import { useImagePreview } from '@/src/shared/hooks'
import { LoadingSpinner } from '@/src/shared/assets/icons'
import { HeaderMobileLayout } from '@/src/shared/ui/layout'
import { 
  useFetchReviewStatistics,
  useFetchReviewImageList 
} from '@/src/4.entities/place/model/queries'
import type { ReviewImage } from '@/src/4.entities/place/model/types'

export default function ReviewImageGallery({ 
  placeId,
}: { 
  placeId: number
}) {
  const { data: reviewStatistics } = useFetchReviewStatistics(placeId)
  const { 
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useFetchReviewImageList(
    placeId, 
    reviewStatistics ? reviewStatistics.totalCount > 0 : false, 
  )

  const observerRef = useRef<HTMLDivElement | null>(null)

  const reviewImageList = data 
    ? data.pages.reduce<ReviewImage[]>((acc, page) => acc.concat(page.data), []) 
    : []
  const ImagePreview = useImagePreview(reviewImageList, { disabledBackdropClosing: true })
  const handlePreviewImageClick = (startIndex: number) => ImagePreview.open(startIndex)

  useEffect(() => {
    const currentObserverRef = observerRef.current
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    if (currentObserverRef) io.observe(currentObserverRef)

    return () => {
      currentObserverRef && io.disconnect()
    }
  }, [hasNextPage, fetchNextPage])
  
  if (!data) return

  return (
    <div className={styles['image-gallery']}>
      <HeaderMobileLayout showBackIcon hasHomeIcon>
        <div className={styles['image-gallery-header-title']}>
          리뷰 사진 모아보기
        </div>
      </HeaderMobileLayout>
      <div className={styles['image-gallery-list-wrapper']}>
        <div className={styles['image-gallery-list']}>
          {data.pages.map((page, idx) =>
            page.data.map((rImage, index) => (
              <div 
                key={rImage.id} 
                className={styles['image-gallery-list-image']}
                onClick={() => handlePreviewImageClick(index)}
                ref={
                  idx === data.pages.length - 1 && 
                  page.data.length === 15 
                  && index === page.data.length - 5
                    ? observerRef
                    : null
                }
              >
                <Image 
                  fill
                  alt='preview-image'
                  style={{ objectFit: 'cover' }}
                  src={process.env.NEXT_PUBLIC_CDN + rImage.s3Key}
                />
              </div>
            ))
          )}
        </div>
        {isFetchingNextPage 
          ? (
            <LoadingSpinner 
              width={24} 
              height={24} 
              style={{ margin: '2rem auto', width: '100%' }} 
            />
          )
          : null
        }
      </div>
      {ImagePreview.create()}
    </div>
  )
}
