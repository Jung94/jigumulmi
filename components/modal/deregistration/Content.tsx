"use client"

import styles from './deregistration.module.scss';
import { useState } from 'react';
import Button from '@/components/button';
import { usePostDeregister } from '@/domain/account/query';

const RequestLoginContent = ({
  onClose
}: {
  onClose?: ()=>void
}) => {
  const deregister = usePostDeregister();
  const [ loading, setLoading ] = useState<boolean>(false);

  const handleDeregister = () => {
    setLoading(true)
    deregister.mutate()
  };

  return (
    <div className={styles.container}>
      <button className={styles.close_button} onClick={onClose}>
        <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <div className={styles.title}>
        회원 탈퇴
      </div>
      {/* <div className={styles.desc}>
        <div className={styles.text}>회원 탈퇴를 원하신다면</div>
      </div> */}
      <Button loading={loading} type='button' variant='contained' color='primary' onClick={handleDeregister}>회원 탈퇴</Button>
    </div>
  );
};

export default RequestLoginContent;