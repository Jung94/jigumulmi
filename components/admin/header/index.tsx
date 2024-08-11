"use client"

import styles from './header.module.scss';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/admin/button';

const Header = () => {
  const router = useRouter()

  const handleMoveToSearchPage = () => {
    router.push('/search')
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Button type="empty" onClick={handleMoveToSearchPage} style={{ padding: '0 12px 0 6px', height: '36px' }}>
          <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M15 6L9 12L15 18" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          &nbsp;Search
        </Button>
      </div>
    </div>
  );
};

export default Header;