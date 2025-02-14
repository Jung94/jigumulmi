import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './place-list.module.scss'
import { LoadingSpinner } from '@/src/shared/assets/icons'
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import type { FetchPlaceListResponse } from '@/src/4.entities/banner/model/types'

export default function PlaceList({ 
  bannerId,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: { 
  bannerId: number
  data: InfiniteData<FetchPlaceListResponse> 
  hasNextPage?: boolean
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<FetchPlaceListResponse, unknown>>
  isFetchingNextPage: boolean
}) {
  const router = useRouter()
  const observerRef = useRef<HTMLDivElement | null>(null)

  const navigatePlaceDetail = (placeId: number) => router.push(`/banner/${bannerId}/place/${placeId}`)
  const handleClickPlaceCard = (placeId: number) => navigatePlaceDetail(placeId)

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
    <div className={styles['place-list']}>
      {data.pages.map((page, idx) => 
        page.data.map((place, index) => (
          <div key={place.id} className={styles['place-list-card']}>
            {idx === data.pages.length - 1 && page.data.length === 15 && index === page.data.length - 5 &&
              <div ref={observerRef} />
            }
            <div 
              className={styles['place-list-card-content']} 
              onClick={() => handleClickPlaceCard(place.id)}
            >
              <div className={styles['place-list-card-content-top']}>
                <div className={styles['place-list-card-content-top-title']}>
                  {place.name}
                </div>
                {!!place.categoryList.length &&
                  <div className={styles['place-list-card-content-top-category']}>
                    {[...new Set(place.categoryList.map(c => c.categoryGroup))].join(', ')}
                  </div>
                }
              </div>
              <div className={styles['place-list-card-content-middle']}>
                <span className={`${
                  place.currentOpeningStatus === '영업 중' 
                    ? styles['place-list-card-content-middle-active'] 
                    : ''
                }`}>
                  {place.currentOpeningStatus}
                </span>
                <span className={styles['place-list-card-content-middle-divider']}></span>
                <span>{place.region}&nbsp;{place.district}</span>
              </div>
              <div className={styles['place-list-card-content-image-list']}>
                {place.imageList.map((image) => (
                  <div key={image.url} className={styles['place-list-card-content-image-list-item']}>
                    <Image 
                      fill
                      alt='preview-image'
                      src={image.url}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
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
  )
}