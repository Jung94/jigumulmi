"use client"

import { useEffect, useState } from 'react';
import styles from './registration-nickname.module.scss';
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import Button from '@/components/button';
import { useModal } from '@/lib/hooks';
import SuccessContent from '@/components/modal/success/Content';
import { usePutNickname } from '@/domain/account/query';
import { useQueryClient } from '@tanstack/react-query';
import { APIaccount } from "@/lib/api/account";

const RegistrationNicknameContent = ({
  defaultNickname="",
}: {
  defaultNickname: string
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const modifyNickname = usePutNickname();
  const [ nickname, setNickname ] = useState(defaultNickname);

  useEffect(()=>{
    if (!!defaultNickname) setNickname(defaultNickname)
  }, [defaultNickname])

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setNickname(value)
  }

  const [ loading, setLoading ] = useState(false);

  const SuccessModal = useModal(
    <SuccessContent 
      title='등록이 완료되었어요!' 
      onClose={handleCloseSuccessModal} 
    />,
    { disabledBackdropClosing: true }
  )
  function handleOpenSuccessModal() { SuccessModal.open() }

  // 로그인 페이지 이전 경로 기록 유무에 따른 페이지 이동
  function handleCloseSuccessModal() {
    const prevPath: string | undefined = getCookie("ji-prev-path")
    
    if (prevPath) router.push(prevPath)
      else router.push('/search')
  }

  const updateNickname = async () => {
    setLoading(true)

    modifyNickname.mutate(
      { nickname },
      {
        onSuccess: async (data) => {
          console.log('updateNickname, success', data)
          setLoading(false)

          if (data.status === 201) {
            await queryClient.refetchQueries([APIaccount.getUserDetail])
            handleOpenSuccessModal()
          }
        },
        onError(error, variables, context) {
          console.log('updateNickname', error)
          setLoading(false)
          alert('닉네임 등록에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  return (
    <div className={styles.container}>
      <form className={styles.content}>
        <div className={styles.desc}>
          <div>여정에 합류하신 것을 환영합니다.</div>
          <div>사용하실 닉네임을 입력해 주세요.</div>
        </div>
        <div className={styles.input_wrapper}>
          <input type='text' id='bakery_name' name='bakery_name' placeholder={nickname} value={nickname} onChange={handleName} />
        </div>
        <div className={styles.input_wrapper}>
          <Button loading={loading} type='submit' variant='contained' color='primary' disabled={!nickname} formAction={updateNickname}>등록하기</Button>
        </div>
      </form>
      {SuccessModal.Dialog}
    </div>
  )
}

export default RegistrationNicknameContent;