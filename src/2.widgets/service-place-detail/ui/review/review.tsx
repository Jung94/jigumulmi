'use client'

import { setCookie } from 'cookies-next'
import { useRef, useEffect } from 'react'
import styles from './review.module.scss'
import { Button } from '@/src/shared/ui/admin'
import { useAuthCheck } from '@/src/shared/hooks'
import { LoadingSpinner } from '@/src/shared/assets/icons'
import { ReviewCard, ReviewImageList } from '@/src/2.widgets/service-place-detail/ui'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { 
  useFetchReviewList,
  useFetchReviewImageList,
  useFetchReviewStatistics 
} from '@/src/4.entities/place/model/queries'

export default function Review({
  bannerId,
  placeId
}: {
  bannerId: number
  placeId: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthenticated = useAuthCheck()
  const { data: reviewStatistics } = useFetchReviewStatistics(placeId)
  const { data: reviewImageList } = useFetchReviewImageList(
    placeId, 
    reviewStatistics ? reviewStatistics.totalCount > 0 : false, 
    { size: 5 }
  )
  const { 
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage } = useFetchReviewList(
    placeId, 
    reviewStatistics ? reviewStatistics.totalCount > 0 : false, 
  )

  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleLoginPageNavigation = () => {
    if (!window.confirm('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?')) return
    const params = new URLSearchParams(searchParams!)
    const currentUrl = `${pathname}?${params.toString()}`
    
    setCookie('ji-login-prev-path', currentUrl)
    router.push('/login')
  }

  const handleClickReviewCreation = () => {
    if (isAuthenticated) router.push(`/banner/${bannerId}/place/${placeId}/review`)
      else handleLoginPageNavigation()
  }

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

  if (!reviewStatistics) return

  return (
    <div className={styles['review']}>
      {reviewImageList && reviewImageList.pages[0].data.length > 0 &&
        <ReviewImageList 
          placeId={placeId} 
          bannerId={bannerId} 
          imageList={reviewImageList.pages[0].data} 
        />
      }
      <div className='padding-xy-mobile'>
        <Button 
          variant='outline'
          onClick={handleClickReviewCreation}
          style={{ width: '100%', borderRadius: '4px' }}
        >
          리뷰 남기기
        </Button>
      </div>
      {data?.pages.map((page, idx) =>
        page.data.map((review, index) => (
          <div
            key={review.id} 
            ref={
              idx === data.pages.length - 1 && 
              page.data.length === 15 
              && index === page.data.length - 5
                ? observerRef
                : null
            }
          >
            <ReviewCard 
              review={review} 
              placeId={placeId} 
              isLast={index === page.data.length - 1} 
            />
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