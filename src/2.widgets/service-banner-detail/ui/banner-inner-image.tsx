import Image from 'next/image'
import styles from './banner-inner-image.module.scss'

export default function BannerInnerImage({
  innerImageS3Key
}: {
  innerImageS3Key: string
}) {
  return (
    <div className={styles['banner-inner-image']}>
      <Image 
        fill
        priority
        quality={95}
        sizes='600px'
        alt='banner-inner-image'
        style={{ objectFit: 'cover' }}
        src={process.env.NEXT_PUBLIC_CDN + innerImageS3Key}
      />
    </div>
  )
}