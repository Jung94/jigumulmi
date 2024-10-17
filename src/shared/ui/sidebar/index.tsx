"use client"

import Image from 'next/image'
import styles from './sidebar.module.scss'
import UserNickname from './user-nickname'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import Logo from '@/public/jigumulmi_logo.png'
import { usePostLogout, usePutNickname, useGetUserDetail } from '@/domain/account/query'
import { Check, XMark, User, LoadingSpinner as Spinner } from '@/src/shared/assets/icons'

export default function Sidebar({
  active,
  handleClose
}: {
  active: boolean
  handleClose:() => void
}) {
  const router = useRouter()
  const logout = usePostLogout()
  const windowSize = useWindowSize()
  const { data: userDetail } = useGetUserDetail()
  const isAdmin: string | undefined = userDetail?.data?.isAdmin
  const nickname: string | undefined = userDetail?.data?.nickname

  const handleLogout = () => logout.mutate()
  const handleMoveToSignIn = () => router.push('/login')
  const handleMoveToAdminPage = () => router.push('/admin/place')

  return (
    <div className={active ? styles['container'] : `${styles['container']} ${styles['inactive']}`}>
      <div className={styles['sidebar-backdrop']} onClick={handleClose}></div>
      <div className={styles['sidebar']}>
        <div className={styles['sidebar-header']}>
          <Image src={Logo} width={115} height={21.8} alt='logo' style={{marginTop: '4px'}}></Image>
          <button className={styles['sidebar-header-exit']} onClick={handleClose}>
            <XMark size='33px' />
          </button>
        </div>
        <div className={styles['sidebar-user']}>
          <div className={styles['sidebar-user-icon']}>
            <User size='27px' color='#333' />
          </div>
          {nickname
            ? <UserNickname userNickname={nickname} isAdmin={isAdmin} />
            : <p>로그인을 해주세요</p>
          }
        </div>
        <div className={styles['sidebar-divider']}></div>
        {nickname
          ? (
            <>
              {isAdmin && 700 <= windowSize.width &&
                <div className={styles['sidebar-item']} onClick={handleMoveToAdminPage}>
                  <svg style={{ paddingLeft: '2px' }} width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M2 20V19C2 15.134 5.13401 12 9 12V12" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z" stroke="#232323" strokeWidth="1.5"></path>
                    <path d="M15.3636 17L16.4546 18.0909L18.6364 15.9091" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <p>어드민 페이지</p>
                </div>
              }
              
              <div className={styles['sidebar-item']} onClick={handleLogout}>
                <svg width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p>로그아웃</p>
              </div>
            </>
          )
          : (<>
            <div className={styles['sidebar-item']} onClick={handleMoveToSignIn}>
              <svg width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <p>로그인</p>
            </div>
          </>)
        }
      </div>
    </div>
  )
}