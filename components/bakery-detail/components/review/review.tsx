"use client"

import styles from './review.module.scss';
import Button from '@/components/button';
import NoLogin from './no-login';
import NoReview from './no-review';
import RatingSection from './rating';
import ReviewListSection from './review-list';
import { useModal } from '@/lib/hooks';
import RequestLoginContent from '@/components/modal/request-login/Content';
import RegistrationReviewContent from '@/components/modal/registration-review/Content';
import { checkIsLogin } from '@/domain/account/query/useGetUserDetail';
import { useGetReview } from '@/domain/review/query';
import { useGetUserDetail } from '@/domain/account/query';
import type { OverallReview } from '@/types/place';

export default function Review({ placeId, data }: { placeId: number, data: OverallReview }) {
  const { data: userDetail } = useGetUserDetail()
  const { data: review } = useGetReview(placeId)
  // console.log('review:', review?.data, data)
  // console.log('userDetail:', !!(userDetail?.status === 200), userDetail?.status)

  const RequestLoginModal = useModal(
    <RequestLoginContent
      onClose={handleCloseRequestLoginModal} 
    />
  )
  function handleOpenRequestLoginModal() { RequestLoginModal.open() }
  function handleCloseRequestLoginModal() { RequestLoginModal.close()}

  const RegistrationReviewModal = useModal(
    <RegistrationReviewContent
      type='post'
      onClose={handleCloseRegistrationReviewModal} 
    />,
    {disabledBackdropClosing: true}
  )
  function handleOpenRegistrationReviewModal() { RegistrationReviewModal.open() }
  function handleCloseRegistrationReviewModal() { RegistrationReviewModal.close()}

  const handleOpenModal = async () => {
    const response = await checkIsLogin()
    
    if (response.status === 200) handleOpenRegistrationReviewModal()
      else handleOpenRequestLoginModal()
  }

  return review?.data && (
    <div className={styles.section}>
      <div className={styles.header_wrapper}>
        <div className={styles.title}>리뷰 <span>{!data.totalCount ? '' : data.totalCount}</span></div>
        <Button
          variant='contained-sub'
          style={{padding: '0px', width: '4.2rem', height: '1.65rem', fontSize: '12px', fontWeight: '400'}}
          onClick={handleOpenModal}
        >리뷰 작성</Button>
      </div>
      {(data.totalCount !== 0 || review.data.some(r => r.replyCount > 0))
        ? (<>
          <RatingSection data={data}/>
          {review.data &&
            <ReviewListSection reviewList={review.data} />
          }
        </>)
        : (userDetail?.status === 200
          ? <NoReview />
          : <NoLogin />
        )
      }

      {RequestLoginModal.Dialog}
      {RegistrationReviewModal.Dialog}
    </div>
  );
};