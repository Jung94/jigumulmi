"use client"

import { useState } from 'react';
import styles from './registration-bakery.module.scss';
import Button from '@/components/button';
import { useModal } from '@/lib/hooks';
import SearchSubwayBar from '@/components/searchSubwayBar';
import SuccessContent from '@/components/modal/success/Content';
import { usePostPlace } from '@/domain/place/query';

const RegistrationBakeryContent = ({
  onClose
}: {
  onClose: ()=>void
}) => {
  const registerPlace = usePostPlace();

  const [ name, setName ] = useState('');
  const [ subway, setSubway ] = useState<{id: number | null, name: string}>({id: null, name: ''});
  const [ menus, setMenus ] = useState<string[]>(['']);
  const [ desc, setDesc ] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setName(value)
  }

  const handleSubway = (id: number) => {
    setSubway(prev => { return {...prev, id}})
  }

  const handleSubwayStationName = (name: string) => {
    setSubway({id: null, name})
  }

  const handleMenus = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setMenus((prev: string[]) => {
      prev[index] = value
      return [...prev]
    })
  }

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value }: { value: string } = e.target as HTMLTextAreaElement;
    setDesc(value)
  }

  const handleAddMenuInput = () => {
    setMenus((prev: string[]) => [...prev, ''])
  }

  const handleDeleteMenuInput = (index: number) => {
    setMenus((prev: string[]) => {
      prev.splice(index, 1)
      return [...prev]
    })
  }

  const [ loading, setLoading ] = useState(false);

  const SuccessModal = useModal(
    <SuccessContent 
      title='등록 요청이 완료되었어요!' 
      content={
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3px'}}>
        <div>좋은 베이커리 공유 감사합니다.</div>
        <div>빠른 시일 내에 확인 후 업데이트하겠습니다.</div>
      </div>}
      onClose={handleCloseSuccessModal} 
    />,
    {disabledBackdropClosing: true, style: {top: '45%'}}
  )
  function handleOpenSuccessModal() { SuccessModal.open() }
  function handleCloseSuccessModal() {
    setName("")
    setSubway({id: null, name: ''})
    setMenus([""])
    setDesc("")
    SuccessModal.close()
    onClose()
  }

  const updateBakery = async () => {
    handleOpenSuccessModal()
    setLoading(true)

    registerPlace.mutate(
      {
        name: name,
        subwayStationId: subway.id!,
        menuList: menus,
        registrantComment: desc
      },
      {
        onSuccess: async (data) => {
          console.log(data)
          if (data.status === 201) {
            handleOpenSuccessModal()
          } 
          setLoading(false)
        },
        onError(error, variables, context) {
          setLoading(false)
          alert('등록에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  return (
    <div className={styles.container}>
      <button className={styles.close_button} onClick={onClose}>
        <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <div className={styles.title}>베이커리를 등록해 주세요</div>
      <form className={styles.content}>
        <div className={styles.input_wrapper}>
          <label htmlFor='bakery_name'>
            <span className={styles.mark__must_do}>*&nbsp;</span>
            베이커리명
          </label>
          <input type='text' id='bakery_name' name='bakery_name' value={name} onChange={handleName} />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='subway'>
            <span className={styles.mark__must_do}>*&nbsp;</span>
            가까운 지하철역
          </label>
          <SearchSubwayBar value={subway.name} handleValue={handleSubwayStationName} handleSelect={handleSubway} />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='menu'>메뉴</label>
          {menus.map((menu: string, index: number) => {
            if (index === 0) return <input key={String(index)} type='text' id='menu' name={`menu-${index}`} value={menu} onChange={e => handleMenus(e, index)} />
              else {
                return (
                  <div key={String(index)} className={styles.extra_menu_input_wrapper}>
                    <input type='text' id='menu' name={`menu-${index}`} value={menu} onChange={e => handleMenus(e, index)} />
                    <button type='button' className={`${styles.button_menu} ${styles.delete_menu_input}`} onClick={() => handleDeleteMenuInput(index)}>
                      <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M6 12H18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                )
              }
          })}
          <button type='button' disabled={menus.length >= 5} className={`${styles.button_menu} ${styles.add_menu_input}`} onClick={handleAddMenuInput}>메뉴 추가하기</button>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='desc'>하고 싶은 말</label>
          <textarea id='desc' name='desc' value={desc} onChange={handleDesc} />
        </div>
        <div className={styles.input_wrapper}>
          <Button loading={loading} type='submit' variant='contained' color='primary' disabled={!name || !(!!subway.id)} formAction={updateBakery}>등록하기</Button>
          {/* {(!name || !subway) &&
            <div className={styles.noti}>*&nbsp;표시의 항목을 모두 입력해 주시면 등록하기 버튼이 활성화 됩니다.</div>
          } */}
          {!name
            ? <div className={styles.noti}>베이커리명을 입력해주세요.</div>
            : (!(!!subway.id)
              ? <div className={styles.noti}>가까운 지하철역을 등록해주세요.</div>
              : ''
            )
          }
        </div>
      </form>
      {SuccessModal.Dialog}
    </div>
  )
}

export default RegistrationBakeryContent;