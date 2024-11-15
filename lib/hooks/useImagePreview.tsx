"use client"

import { useRef, useState, useEffect } from 'react';
import ImagePreview from '@/components/image-preview';

type Options = {
  disabledBackdropClosing?: boolean
  disabledEscKey?: boolean
  style?: any
}

export default function useImagePreview (
  { disabledBackdropClosing, disabledEscKey, style }: Options={}
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [path, setPath] = useState("")

  const open = (path: string) => {
    setPath(path)
    dialogRef.current?.showModal();
  }

  const close = () => {
    dialogRef.current?.close();
  }

  const create = () => <ImagePreview ref={dialogRef} handleClose={close} path={path} style={style} />;

  useEffect(()=>{
    dialogRef.current?.addEventListener("click", (e: any) => {
      if (!!(dialogRef.current === e.target) && !disabledBackdropClosing) close();
    });

    if (disabledEscKey) {
      dialogRef.current?.addEventListener('cancel', (event) => {
        event.preventDefault();
      });
    }
  }, [])

  return { create, open, close };
};
