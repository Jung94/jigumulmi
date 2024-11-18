"use client"

import styles from './no-login.module.scss'
import Button from '@/components/button'
import { useModal } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import RequestLoginContent from '@/components/modal/request-login/Content'
import RegistrationReviewContent from '@/components/modal/registration-review/Content'
import { checkIsLogin } from '@/domain/account/query/useGetUserDetail'

export default function NoLogin() {
  const router = useRouter()
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
        로그인이 필요한 서비스입니다.
      </div>
      <div className={styles.text_wrapper}>
        간편 소셜 로그인으로 3초 만에 로그인해 보세요.
      </div>
      <Button 
        style={{marginTop: '0.5rem', width: '100%', height: '2.5rem', fontSize: '14px'}} 
        onClick={() => router.push('/login')}
      >
        로그인 하러 가기
      </Button>

      {RequestLoginModal.Dialog}
      {RegistrationReviewModal.Dialog}
    </div>
  )
}