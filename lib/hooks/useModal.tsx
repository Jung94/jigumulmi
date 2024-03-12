"use client"

import { useRef, useEffect } from 'react';
import Dialog from '@/components/modal/Dialog';

const useModal = (component: React.ReactNode, style?: any) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // forwardRef로 컴포넌트 분리 필요
  const create = () => <Dialog ref={dialogRef} component={component} style={style} />;

  const open = () => {
    dialogRef.current?.showModal();
  }

  const close = () => {
    dialogRef.current?.close();
  }

  useEffect(()=>{
    dialogRef.current?.addEventListener("click", (e: any) => {
      if (!!(dialogRef.current === e.target)) close();
    })
  }, [])

  return { Dialog: create(), open, close };
};

export default useModal;
