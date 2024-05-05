"use client"

import styles from './request-login.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';

const RequestLoginContent = ({
  onClose
}: {
  onClose: ()=>void
}) => {
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(false);

  const handleMoveToLoginPage = () => {
    setLoading(true);
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <button className={styles.close_button} onClick={onClose}>
        <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <div className={styles.title}>
        로그인
      </div>
      <div className={styles.desc}>
        <div className={styles.text}>3초 만에 간편 소셜 로그인 후</div>
        <div className={styles.text}>채식에 관심있는 많은 분들과 의견을 나눠보세요.</div>
      </div>
      <Button loading={loading} type='button' variant='contained' color='primary' onClick={handleMoveToLoginPage}>3초 만에 로그인하기</Button>
    </div>
  );
};

export default RequestLoginContent;