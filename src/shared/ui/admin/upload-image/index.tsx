'use client'

import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'
import styles from './uploading-image.module.scss'

export default function UploadingImage({
  name,
  url, 
  onChange,
  onDelete,
}: {
  name: string;
  url?: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileUpload = () => fileInputRef.current?.click()

  const handleDeleteImage = () => {
    onDelete && onDelete()
    if (url) URL.revokeObjectURL(url)
  }

  return (
    <div className={styles['uploading-image']}>
      <button type='button' className={styles['uploading-image-upload']} onClick={triggerFileUpload}>
        <svg width="23px" height="23px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M13 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V13" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M3 16L10 13L15.5 15.5" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M16 19H19M22 19H19M19 19V16M19 19V22" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        사진 {!!url ? '변경' : '등록'}
      </button>
      <input ref={fileInputRef} type='file' name={name} accept='image/*' onChange={onChange} />
      <div className={styles['uploading-image-preview']}>
        {url &&
          <div className={styles['uploading-image-preview-image']}>
            <Image 
              fill
              src={url}
              alt='preview-image'
              className={styles['uploading-image-preview-image-content']}
            />
            {onDelete &&
              <button type='button' className={styles['uploading-image-preview-image-deletion']} onClick={handleDeleteImage}>
                <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#f8f8f8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            }
          </div>
        }
      </div>
    </div>
  )
}
