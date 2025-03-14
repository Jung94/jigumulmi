"use client"

import styles from './no-review.module.scss'
import Button from '@/components/button'
import { useModal } from '@/lib/hooks'
import RequestLoginContent from '@/components/modal/request-login/Content'
import RegistrationReviewContent from '@/components/modal/registration-review/Content'
import { checkIsLogin } from '@/domain/account/query/useGetUserDetail'

export default function NoReview() {
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
    />
  )
  function handleOpenRegistrationReviewModal() { RegistrationReviewModal.open() }
  function handleCloseRegistrationReviewModal() { RegistrationReviewModal.close()}

  const handleOpenModal = async () => {
    const response = await checkIsLogin()

    if (response.status === 200) handleOpenRegistrationReviewModal()
      else handleOpenRequestLoginModal()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.text_wrapper}>
        작성된 리뷰가 없습니다.
      </div>
      <div className={styles.text_wrapper}>
        이 가게가 궁금하지만 망설이고 있는 다른 분들을 위해 첫 번째 리뷰를 남겨주세요.
      </div>
      <Button 
        style={{marginTop: '0.5rem', width: '100%', height: '2.5rem', fontSize: '14px'}} 
        onClick={handleOpenModal}
      >
        리뷰 작성하러 가기
      </Button>

      {RequestLoginModal.Dialog}
      {RegistrationReviewModal.Dialog}
    </div>
  )
}