import styles from './rating.module.scss';
import type { OverallReview } from '@/types/place';

type RatioItemProps = {
  name: string
  count: number
  maxCount: number
  isMost?: boolean
}

const RatioItem = ({
  name,
  count,
  maxCount,
  isMost,
}: RatioItemProps) => {
  return (
    <div className={styles.ratio_wrapper}>
      <div className={`${styles.count} ${isMost && styles.is_most}`}>{count}</div>
      <div className={styles.progress_bar}>
        <div className={styles.progress_value} style={{height: `${count / maxCount * 100}%`}}></div>
      </div>
      <label>{name}</label>
    </div>
  );
};

const RatingStar = ({ order, rating }: { order: number, rating: number }) => {
  return (
    <span className={styles["rating-star"]}>
      <svg width="27px" height="27px" strokeWidth="1.5" viewBox="0 0 24 24" fill="hsl(0,0%,85%)" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <clipPath id={`star-clip-${order}`}>
          <rect width={24 * rating / 100} height={27} />
        </clipPath>
        <path id={`star-${order}`} d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#000000" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" />
        <use clipPath={`url(#star-clip-${order})`} href={`#star-${order}`} fill='#E8674D' />
      </svg>
    </span>
  );
};

export default function Rating ({ data }: { data: OverallReview }) {
  const getRating = (averageRating: number, index: number): number => {
    const onesPlace = Math.floor(averageRating)
    const rest = Math.floor((averageRating - onesPlace) * 100)

    if (onesPlace > index) return 100
    if (onesPlace < index) return 0
    if (onesPlace === index) {
      if (rest === 0) return 100
        else return rest
    }
    return 0
  }

  const statistics = Object.entries(data.statistics)
  const maxAndCount = statistics.reduce((acc, cur, idx) => {
    if (acc[0] < cur[1]) {
      return [cur[1], 1]
    } else if (acc[0] === cur[1]) {
      return [acc[0], acc[1] + 1]
    } else {
      return [acc[0], acc[1]]
    }
  }, [0, 0]); // [가장 큰 수, 개수]

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.title}>사용자 총 평점</div>
        <div className={styles.content_total_rating}>
          <div className={styles.rating_number}>{data.averageRating}</div>
          <div className={styles.rating_stars}>
            {Array.from({length: 5}, (_, idx)=>
              <RatingStar 
                key={String(idx)} 
                order={idx + 1} 
                rating={getRating(data.averageRating, idx + 1)} 
              />)}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>평점 비율</div>
        <div className={styles.content_rating_ratio}>
          {statistics.map(v => 
              <RatioItem 
                key={v[0]} 
                isMost={maxAndCount[1] === 1 && maxAndCount[0] === v[1]} 
                name={`${v[0]}점`} 
                count={v[1]} 
                maxCount={maxAndCount[0]} 
              />
            ).reverse()}
        </div>
      </div>
    </div>
  );
};