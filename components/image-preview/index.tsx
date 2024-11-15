"use client"

import React from 'react';
import Image from 'next/image';
import { forwardRef } from 'react';
import styles from './image-preview.module.scss';

type DialogProps = {
  handleClose: () => void
  path: string
  style?: any
}

const ImagePreview = forwardRef<HTMLDialogElement, DialogProps>((function Dialog(props, ref) {
  return (
    <dialog ref={ref} className={styles['image-preview']} style={props.style}>
      <button type='button' className={styles['image-preview-close']} onClick={() => props.handleClose()}>
        <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <div className={styles['image-preview-content']}>
        <Image 
          fill
          src={process.env.NEXT_PUBLIC_CDN + props.path}
          alt='preview-image'
          className={styles['image-preview-content-image']}
        />
      </div>
    </dialog>
  );
}));

export default React.memo(ImagePreview);