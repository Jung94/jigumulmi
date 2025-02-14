import styles from './star.module.scss'
import { Star as StarIcon } from '@/src/shared/assets/icons'

export default function Star({
  rating,
  onStarClick
}: {
  rating: number
  onStarClick: (rating: number) => void
}) {
  return (
    <div className={styles['star']}>
      <div className={styles['star-header-title']}>
        별점
      </div>
      <div className={styles['star-list']}>
        {Array.from({length: 5}, (_, index) => 
          <button key={String(index)} type='button' className={styles["star-button"]} onClick={() => onStarClick(index + 1)}>
            <StarIcon
              width={34}
              height={34}
              fill={rating >= index + 1 ? '#0060AE' : '#e5e8eb'}
            />
          </button>
        )}
      </div>
    </div>
  )
}