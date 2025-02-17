import Image from 'next/image'
import styles from './review.module.scss'
import { useImagePreview } from '@/src/shared/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Star, ProfileImage } from '@/src/shared/assets/icons'
import placeAPI from '@/src/4.entities/place/api/place.constant'
import { useDeleteReview } from '@/src/4.entities/place/model/queries'
import placeQueryKey from '@/src/4.entities/place/model/queries/query-key.constant'
import type { Review } from '@/src/4.entities/place/model/types'

export default function ReviewCard({ review, isLast, placeId }: { 
  review: Review 
  isLast: boolean
  placeId: number
}) {
  const queryClient = useQueryClient()
  const deleteReview = useDeleteReview()

  const ImagePreview = useImagePreview(review.imageList, { disabledBackdropClosing: true })
  const handleClickPreviewImage = (startIndex: number) => ImagePreview.open(startIndex)

  const handleReviewDeletion = async () => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    try {
      await deleteReview.mutateAsync(review.id)
      await queryClient.refetchQueries({ queryKey: [placeAPI.review(placeId)] }) // 리뷰 목록
      await queryClient.refetchQueries({ queryKey: [placeAPI.reviewImage(placeId)] }) // 리뷰 이미지 목록
      await queryClient.refetchQueries({ queryKey: placeQueryKey.reviewStatistics(placeId) }) // 리뷰 통계
      alert('리뷰 삭제가 완료되었습니다.')
    } catch (error: any) {
      alert("리뷰 삭제에 실패하였습니다. 운영자에게 문의해 주세요.")
    }
  }

  return (
    <>
      <div className={styles['review-card']}>
        <div className={styles['review-card-header']}>
          <div className={styles['review-card-header-left']}>
            <div className={styles['review-card-header-left-profile-image']}>
              <ProfileImage width={24} height={24} color='#999' strokeWidth={1.2} />
            </div>
            <div className={styles['review-card-header-left-nickname']}>
              {review.member.nickname}
            </div>
            {/* {true && */}
            {review.isEditable &&
              <div className={styles['review-card-rating-buttons']}>
                {/* <button 
                  className={styles['review-card-rating-buttons-modification']} 
                  onClick={handleOpenRegistrationReviewModal}
                >
                  수정
                </button> */}
                <button 
                  className={styles['review-card-rating-buttons-deletion']} 
                  onClick={handleReviewDeletion}
                >
                  삭제
                </button>
              </div>
            }
          </div>
          {!review.deletedAt &&
            <div className={styles['review-card-header-reviewed-at']}>
              {review.isEdited &&
                <span className={styles['review-card-header-modified']}>
                  수정됨
                </span>
              }
              {review.reviewedAt}
            </div>
          }
        </div>

        {!review.deletedAt &&
          <div className={styles['review-card-rating']}>
            <div className={styles['review-card-rating-star']}>
              <div className={styles['review-card-rating-star-icon']}>
                <Star width={16} height={16} />
              </div>
              <span className={styles['review-card-rating-star-number']}>
                {review.rating}
              </span>
            </div>
          </div>
        }

        {!!review.imageList.length && 
          <div className={styles['review-card-image-preview']}>
            {review.imageList.map((rImage, index) => {
              return (
                <div 
                  key={rImage.id} 
                  className={styles['review-card-image-preview-image']}
                  onClick={() => handleClickPreviewImage(index)}
                >
                  <Image 
                    fill
                    src={process.env.NEXT_PUBLIC_CDN + rImage.s3Key}
                    alt='review-image-preview'
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )
            })}
          </div>
        }
        
        {review.deletedAt
          ? <div>삭제된 리뷰입니다.</div>
          : (!!review.content &&
            <div className={styles['review-card-content']}>
              {review.content}
            </div>
          )
          // (isModifying
          //   ? <textarea>{review.content}</textarea>
          //   : <div className={styles.review_card_content}>{review.content}</div>
          // )
        }
      </div>
      {!isLast &&
        <div className='padding-x-mobile'>
          <div className='divider' />
        </div>
      }
      {ImagePreview.create()}
    </>
  )
}
