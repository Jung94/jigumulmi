"use client"

import styles from './review.module.scss';
import Button from '@/components/button';
import NoComment from './no-review';
import RatingSection from './rating';
import ReviewListSection from './review-list';
import { useModal } from '@/lib/hooks';
import RequestLoginContent from '@/components/modal/request-login/Content';
import RegistrationReviewContent from '@/components/modal/registration-review/Content';
import { checkIsLogin } from '@/domain/account/query/useGetUserDetail';
import { useGetReview } from '@/domain/review/query';
import type { OverallReview } from '@/types/place';

export default function Review({ placeId, data }: { placeId: number, data: OverallReview }) {
  const { data: review } = useGetReview(placeId);
  console.log(review)

  const RequestLoginModal = useModal(
    <RequestLoginContent
      onClose={handleCloseRequestLoginModal} 
    />,
    {style: {top: '30%'}}
  )
  function handleOpenRequestLoginModal() { RequestLoginModal.open() }
  function handleCloseRequestLoginModal() { RequestLoginModal.close()}

  const RegistrationReviewModal = useModal(
    <RegistrationReviewContent
      onClose={handleCloseRegistrationReviewModal} 
    />,
    {disabledBackdropClosing: true, style: {top: '30%'}}
  )
  function handleOpenRegistrationReviewModal() { RegistrationReviewModal.open() }
  function handleCloseRegistrationReviewModal() { RegistrationReviewModal.close()}

  const handleOpenModal = async () => {
    const response = await checkIsLogin()
    
    if (response.status === 200) handleOpenRegistrationReviewModal()
      else handleOpenRequestLoginModal()
  }

  return (
    <div className={styles.section}>
      <div className={styles.header_wrapper}>
        <div className={styles.title}>리뷰 <span>{data.totalCount}</span></div>
        <Button
          variant='outlined'
          style={{padding: '0px', width: '4.75rem', height: '1.65rem', fontSize: '12px', fontWeight: '400'}}
          onClick={handleOpenModal}
        >리뷰 남기기</Button>
      </div>
      {/* <NoComment /> */}
      <RatingSection data={data}/>
      {review?.data &&
        <ReviewListSection reviewList={review.data} />
      }

      {RequestLoginModal.Dialog}
      {RegistrationReviewModal.Dialog}
    </div>
  );
};