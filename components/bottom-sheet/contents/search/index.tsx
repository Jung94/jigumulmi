import styles from './search.module.scss';
import BakeryCard from '@/components/card/Bakery';
import type { PlaceSummary } from '@/types/place';

type Props = {
  placeList: PlaceSummary[]
  handleClickPlaceCard: (place: PlaceSummary)=>void
};

const SearchContent = ({
  placeList,
  handleClickPlaceCard
}: Props) => {
  return (
    <div className={styles.bakery_cards_wrapper}>
      {placeList.length > 0 
        ? (
          <div className={styles.bakery_cards}>
            {placeList.map((place: PlaceSummary) => (
              <BakeryCard key={place.id} place={place} onClick={handleClickPlaceCard} />
            ))}
          </div>
        )
        : (
          <div className={styles.empty_msg}>
            <div>등록된 장소가 없습니다. </div>
            <div>새로운 장소를 등록해 주세요.</div>
          </div>
        )
      }
    </div>
  );
};

export default SearchContent;