"use client"

import Image from 'next/image'
import User from '@/public/icons/User'
import React, { useState } from 'react'
import styles from './header.module.scss'
import SearchBar from '@/components/searchBar'
import Logo from '@/public/jigumulmi_logo.png'
import { useAppDispatch } from '@/lib/store/hooks'
import UserInfo from '@/components/header/user-info'
import { useRouter, usePathname } from 'next/navigation'
import { useGetUserDetail } from '@/domain/account/query'
import { update_is_shown_detail } from '@/lib/store/modules/search'

const UserButton = ({ onOpen }: { onOpen: ()=>void }) => {
  return (
    <button className={styles.button_user_space} onClick={onOpen}>
      <User size='23px' />
    </button>
  )
}

const HeaderPC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { data: userDetail } = useGetUserDetail()
  const nickname: string | undefined = userDetail?.data?.nickname
  const isAdmin: string | undefined = userDetail?.data?.isAdmin
  const [ shownUserModal, setShownUserModal ] = useState(false)

  const openUserModal = () => setShownUserModal(true)
  const closeUserModal = () => setShownUserModal(false)

  const handleClickLogo = () => {
    router.push('/')
  }

  const handleSearchAll = () => {
    dispatch(update_is_shown_detail(false))
    router.push('/search')
  }

  return (
    <header className={styles['header']}>
      <button onClick={handleClickLogo}>
        <Image src={Logo} width={115} height={21.8} alt='logo' style={{marginTop: '4px'}}></Image>
      </button>
      <div className={styles['right']}>
        {pathname === '/search' &&
          <div className={styles['right-search']}>
            <button className={styles['right-search-all']} onClick={handleSearchAll}>전체</button>
            <SearchBar />
          </div>
        }
        <UserButton onOpen={openUserModal} />
        {shownUserModal && <UserInfo isAdmin={isAdmin} userNickname={nickname} onClose={closeUserModal} />}
      </div>
    </header>
  )
}

export default HeaderPC