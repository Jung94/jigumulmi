'use client'

import Image from 'next/image'
import styles from './uploading-image.module.scss'

export default function Preview({
  url,
  size = 'medium',
  onDelete
}: {
  url: string
  size?: 'small' | 'medium' | 'large'
  onDelete?: () => void
}) {
  const handleDeleteImage = () => {
    onDelete && onDelete()
    if (url) URL.revokeObjectURL(url)
  }

  return (
    <div className={`
      ${styles['uploading-image-preview-image']}
      ${styles[`uploading-image-preview-image-${size}`]}
    `}>
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
  )
}