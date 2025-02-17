'use client'

import { useState } from 'react'
import styles from './review.module.scss'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/src/shared/ui/admin'
import { useQueryClient } from '@tanstack/react-query'
import { HeaderMobileLayout } from '@/src/shared/ui/layout'
import placeAPI from '@/src/4.entities/place/api/place.constant'
import { useCreateReview } from '@/src/4.entities/place/model/queries'
import { Star, Content, UploadingImage } from '@/src/2.widgets/service-review/ui'
import placeQueryKey from '@/src/4.entities/place/model/queries/query-key.constant'

type PreviewImage = {
  id: number | null
  url: string
  file: File | null
}

export default function ReviewPage({ 
  bannerId,
  placeId 
}: { 
  bannerId: number 
  placeId: number 
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const createReview = useCreateReview()
  
  const [ loading, setLoading ] = useState(false)
  const [ rating, setRating ] = useState<number>(0)
  const [ content, setContent ] = useState<string>('')
  const [ previewImages, setPreviewImages ] = useState<PreviewImage[]>([])

  const handleStarClick = (rating: number) => setRating(rating)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setContent(value)
  }

  const handlePlacePageNavigation = () => {
    router.push(`/banner/${bannerId}/place/${placeId}`)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await createReview.mutateAsync({
        placeId, 
        body: { rating, content, imageList: previewImages }
      })
      await queryClient.refetchQueries({ queryKey: [placeAPI.review(placeId)] }) // 리뷰 목록
      await queryClient.refetchQueries({ queryKey: [placeAPI.reviewImage(placeId)] }) // 리뷰 이미지 목록
      await queryClient.refetchQueries({ queryKey: placeQueryKey.reviewStatistics(placeId) }) // 리뷰 통계
      setLoading(false)
      alert('리뷰 저장이 완료되었습니다.')
      handlePlacePageNavigation()
    } catch (error: any) {
      setLoading(false)
      if (error.status === 400) {
        alert('리뷰는 장소별 한 번만 작성 가능합니다.')
        handlePlacePageNavigation()
      } else {
        alert("리뷰 저장에 실패하였습니다. 운영자에게 문의해 주세요.")
      }
    }
  }

  return (
    <div className={styles['review']}>
      <HeaderMobileLayout showHomeIcon onGoBack={handlePlacePageNavigation}>
        <div className={styles['review-header-title']}>
          리뷰 작성
        </div>
      </HeaderMobileLayout>
      <Star rating={rating} onStarClick={handleStarClick} />
      <Content content={content} onChange={handleContentChange} />
      <UploadingImage previewImages={previewImages} setPreviewImages={setPreviewImages} />

      <div className={styles['review-button-wrapper']}>
        <Button 
          loading={loading} 
          disabled={rating === 0}
          style={{ width: '100%' }}
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  )
}
