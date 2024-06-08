"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './header.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { useWindowSize } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useModal } from '@/lib/hooks'
import { APIaccount } from "@/lib/api/account"
import SearchBar from '@/components/searchBar'
import Logo from '@/public/jigumulmi_logo.png'
import Spinner from '@/public/icons/LoadingSpinnerWhite'
import User from '@/public/icons/User'
import Check from '@/public/icons/Check'
import XMark from '@/public/icons/XMark'
import Button from '@/components/button'
import DeregistrationContent from '@/components/modal/deregistration/Content'
import { usePostLogout, usePutNickname, useGetUserDetail } from '@/domain/account/query'

const UserButton = ({ onOpen }: { onOpen: ()=>void }) => {
  return (
    <button className={styles.button_user_space} onClick={onOpen}>
      <User size='23px' />
    </button>
  )
}

export const UserPopup = ({ userNickname, onClose }: { userNickname?: string, onClose: ()=>void }) => {
  const router = useRouter()
  const logout = usePostLogout()
  const queryClient = useQueryClient()
  const modifyNickname = usePutNickname()
  const nicknameRef = useRef<HTMLInputElement>(null)
  const [ nickname, setNickname ] = useState<string>(userNickname ?? "")
  const [ status, setStatus ] = useState<'disabled' | 'active' | 'loading' | 'success' | 'error'>('disabled')

  // 닉네임 수정
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target as HTMLInputElement
    setNickname(value)
  }

  // 닉네임 수정 가능하게 활성화
  const handleActiveNicknameInput = () => setStatus('active')

  // 닉네임 저장
  const handleModifyNickname = () => {
    setStatus('loading')

    modifyNickname.mutate(
      { nickname },
      {
        onSuccess: async (data) => {
          console.log(data)
          if (data.status === 201) {
            queryClient.refetchQueries([APIaccount.getUserDetail])
            setStatus('success')
          }
        },
        onError(error, variables, context) {
          setStatus('error')
          alert('수정에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  // 회원 탈퇴
  const DeregistrationModal = useModal(
    <DeregistrationContent />,
    { disabledBackdropClosing: true, style: {top: '45%'} }
  )
  function handleOpenDeregistrationModal() { DeregistrationModal.open() }

  // 건의 사항 모달 열기
  const handleOpenFeedback = () => {
    
  }

  // 로그인
  const handleLogin = () => router.push('login')

  // 로그아웃
  const handleLogout = () => logout.mutate()

  useEffect(()=>{
    return () => {
      setStatus('disabled')
    }
  }, [])

  // 닉네임 수정 시 인풋 포커스
  useEffect(()=>{
    if (status === 'active') nicknameRef.current?.focus()
    if (status === 'success') setTimeout(()=>setStatus('disabled'), 1500)
    if (status === 'error') setTimeout(()=>setStatus('active'), 1500)
  }, [status])

  return (
    <>
      <div className={styles.backdrop_popup} onClick={onClose}></div>
      <div className={styles.popup_user}>
        <div className={styles.wrapper_modification_nickname}>
          <div className={styles.button_user_icon}>
            <User size='20px' />
          </div>
          {userNickname 
            ? (
              <>
                <input ref={nicknameRef} disabled={status !== 'active'} className={styles.input_nickname} value={nickname} onChange={handleChangeNickname} />
                {status === 'disabled' &&
                  <button className={`${styles.wrapper_status} ${styles.icon_pencil}`} onClick={handleActiveNicknameInput}>
                    <svg width="18px" height="18px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                      <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>
                }
                {status === 'active' &&
                  <button className={`${styles.wrapper_status} ${styles.icon_pencil}`} onClick={handleModifyNickname}>
                    수정
                  </button>
                }
                {status === 'loading' &&
                  <div className={styles.wrapper_status}>
                    <Spinner size='18px' color='#232323' />
                  </div>
                }
                {status === 'success' &&
                  <div className={`${styles.wrapper_status}`}>
                    <Check color='#0060AE' />
                  </div>
                }
                {status === 'error' &&
                  <div className={styles.wrapper_status}>
                    <XMark color='hsl(358,75%,59%)' />
                  </div>
                }
              </>
            )
            : <input readOnly disabled className={styles.input_nickname} value="로그인을 해주세요"  />
          }
          
        </div>
        <div className={styles.wrapper_buttons}>
          {/* <Button style={{width: '100%', height: '2rem', fontSize: '13px'}} onClick={handleOpenFeedback}>건의 사항</Button> */}
          <Button style={{width: '100%', height: '2rem', fontSize: '13px'}} onClick={userNickname ? handleLogout : handleLogin}>
            {userNickname ? '로그아웃' : '로그인'}
          </Button>
          {/* {userNickname &&
            <Button variant='outlined' style={{width: '100%', height: '2rem', fontSize: '13px'}} onClick={handleOpenDeregistrationModal}>회원 탈퇴</Button>
          } */}
        </div>
      </div>
      {DeregistrationModal.Dialog}
    </>
  )
}

const Header = () => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const { data: userDetail } = useGetUserDetail()
  const nickname: string | undefined = userDetail?.data?.nickname
  const [ shownUserModal, setShownUserModal ] = useState(false)

  const openUserModal = () => setShownUserModal(true)
  const closeUserModal = () => setShownUserModal(false)

  const handleClickLogo = () => {
    router.push('/search')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button className={styles.links}>
          {1100 < windowSize.width &&
            <Image src={Logo} width={100} height={25} alt='logo' style={{marginTop: '4px'}} onClick={handleClickLogo}></Image>
          }
          {windowSize.width <= 1100 &&
            <Image src={Logo} width={85} height={22} alt='logo' style={{marginTop: '8px'}} onClick={()=>router.push('/search')}></Image>
          }
        </button>

        <div className={styles.buttons}>
          <SearchBar type='station' />
          <UserButton onOpen={openUserModal} />
          {shownUserModal && <UserPopup userNickname={nickname} onClose={closeUserModal} />}
        </div>
      </nav>
    </header>
  )
}

export default Header