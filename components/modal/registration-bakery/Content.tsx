"use client"

import { useEffect, useState } from 'react';
import styles from './registration-bakery.module.scss';
import { supabase } from '@/lib/api/supabase/client';
import { isMobile, checkOS } from '@/lib/utils/checkUserAgent';
import Button from '@/components/button';

const RegistrationBakeryContent = ({
  onSubmit
}: {
  onSubmit: (formData: FormData)=>void
}) => {
  const [ name, setName ] = useState('');
  const [ subway, setSubway ] = useState('');
  const [ desc, setDesc ] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setName(value)
  }

  const handleSubway = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target as HTMLInputElement;
    setSubway(value)
  }

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value }: { value: string } = e.target as HTMLTextAreaElement;
    setDesc(value)
  }

  const [ loading, setLoading ] = useState(false);

  const updateBakery = async () => {
    setLoading(true)

    try {
      const { error } = await supabase.from('test_bakery').insert({
        bakery_name: name,
        subway,
        desc: desc || null,
        is_mobile: isMobile() ? checkOS() : null,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString(),
      })
      if (error) throw error
      console.log('success!')
    } catch (error) {
      console.log('failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>베이커리를 등록해 주세요</div>
      <form className={styles.content}>
        <div className={styles.input_wrapper}>
          <label htmlFor='bakery_name'>베이커리명</label>
          <input type='text' id='bakery_name' name='bakery_name' value={name} onChange={handleName} />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='subway'>가까운 지하철역</label>
          <input type='text' id='subway' name='subway' value={subway} onChange={handleSubway} />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='desc'>하고픈 말</label>
          <textarea id='desc' name='desc' value={desc} onChange={handleDesc} />
        </div>
        <Button loading={loading} type='submit' variant='contained' color='primary' disabled={!name || !subway} formAction={updateBakery}>등록하기</Button>
      </form>
    </div>
  )
}

export default RegistrationBakeryContent;