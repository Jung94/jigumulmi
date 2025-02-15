import Image from 'next/image'
import styles from './menu.module.scss'
import { useImagePreview } from '@/src/shared/hooks'
import { ImageEmpty } from '@/src/shared/assets/icons'
import type { Menu } from '@/src/4.entities/place/model/types'

export default function MenuCard({ menu, isLast }: { 
  menu: Menu 
  isLast: boolean
}) {
  const previewList = [{
    id: menu.name,
    s3Key: menu.imageS3Key,
  }]
  const ImagePreview = useImagePreview(previewList, { disabledBackdropClosing: true })
  const handlePreviewImageClick = (startIndex: number) => ImagePreview.open(startIndex)

  return (
    <>
      <div className={styles['menu-card']}>
        <div className={styles['menu-card-left']}>
          {menu.isMain &&
            <div className={styles['menu-card-left-main']}>
              대표
            </div>
          }
          <div className={styles['menu-card-left-name']}>
            {menu.name}
          </div>
          {menu.description &&
            <div className={styles['menu-card-left-desc']}>
              {menu.description}
            </div>
          }
          <div className={styles['menu-card-left-price']}>
            {menu.price
              ? <>{Number(menu.price).toLocaleString()}원</>
              : '가격 변동'
            }
          </div>
        </div>
        <div className={styles['menu-card-right']}>
          <div 
            className={styles['menu-card-right-image']}
            onClick={() => handlePreviewImageClick(0)}
          >
            {menu.imageS3Key
              ? <Image 
                  fill
                  alt='menu-image-preview'
                  src={process.env.NEXT_PUBLIC_CDN + menu.imageS3Key}
                  style={{ objectFit: 'cover' }}
                />
              : <div className={styles['menu-card-right-image-empty']}>
                  <ImageEmpty width={24} height={24} />
                </div>
            }
          </div>
        </div>
      </div>

      {!isLast &&
        <div className='padding-x-mobile'>
          <div className='divider' />
        </div>
      }
      {ImagePreview.create()}
    </>
  )
}
