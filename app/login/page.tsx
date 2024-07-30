"use client"

import { useState, useEffect } from 'react'
import styles from './login.module.scss'
import Image from 'next/image'
import { useModal } from '@/lib/hooks'
import { getCookie, deleteCookie } from 'cookies-next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { checkRegistered } from './actions'
import { APIaccount } from "@/lib/api/account"
import Logo from '@/public/jigumulmi_logo.png'
import Spinner from '@/public/icons/LoadingSpinnerWhite'
import KakaoLoginSymbol from '@/public/icons/login/kakao_login_symbol.svg'
import RegistrationNicknameContent from '@/components/modal/registration-nickname/Content'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const code = searchParams?.get("code") // string | null
  const [ isLoading, setIsLoading ] = useState(!!(code))
  const [ defaultNickname, setDefaultNickname ] = useState('')

  const handleLogin = () => {
    setIsLoading(true)

    const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL

    setTimeout(()=>{
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    }, 500)
  }

  const kakaoLoginRedirectURL = async (code: string) => {
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL_ORIGIN

    if (!code || !REDIRECT_URI) return
    const { status, data } = await checkRegistered(code, decodeURI(REDIRECT_URI))
    
    if (status === 201) {
      queryClient.invalidateQueries([APIaccount.getUserDetail])
      setIsLoading(false)

      if (data.hasRegistered) { // 기존 회원
        // 로그인 페이지 이전 경로 기록 유무에 따른 페이지 이동
        const prevPath: string | undefined = getCookie("ji-login-prev-path")
        deleteCookie("ji-login-prev-path")

        if (prevPath) router.push(prevPath)
          else router.push('search')
      } else { // 신규 회원
        setDefaultNickname(data.nickname)
        handleOpenRegistrationNicknameModal()
      }
    }
  }

  const RegistrationNicknameModal = useModal(
    <RegistrationNicknameContent defaultNickname={defaultNickname} />,
    { disabledBackdropClosing: true }
  )
  function handleOpenRegistrationNicknameModal() { RegistrationNicknameModal.open() }

  // 카카오 로그인 callback url 처리
  useEffect(() => {
    if (code) kakaoLoginRedirectURL(code)
  }, [])

  return (
    <>
      <div className={styles.container}>
        {isLoading && 
          <div className={`${styles.is_loading} ${!!(!code) && styles.fade_in}`}>
            <Spinner size='30px' />
          </div>
        }
        <Image src={Logo} width={130} height={24.6} alt='logo'></Image>
        <div className={styles.desc}>
          <div className={styles.text}>
            비정상적인 속도로 달려가는 지구의 속도에 멀미가 느껴지진 않나요?
          </div>
          <div className={styles.text}>
            지구에게 편안한 속도를 찾아가는 여정에 합류하세요.
          </div>
        </div>
        <button className={`${styles.login} ${styles.kakao}`} onClick={handleLogin}>
          <Image className={styles.symbol} src={KakaoLoginSymbol} width={17} height={17} alt='KakaoLoginSymbol'></Image>
          카카오톡으로 로그인하기
        </button>
      </div>
      {RegistrationNicknameModal.Dialog}
    </>
  )
}
// https://supabase.com/docs/guides/auth/server-side/nextjs