import styles from './search.module.scss';
import BakeryCard from '@/components/card/Bakery';

type Props = {
  bakeries: any
  handleClickBakeryCard: (bakeryId: number)=>void
};

const SearchContent = ({
  bakeries,
  handleClickBakeryCard
}: Props) => {
  return (
    <div className={styles.bakery_cards_wrapper}>
      {bakeries.length > 0 
        ? (
          <div className={styles.bakery_cards}>
            {bakeries.map((bakery: any) => (
              <BakeryCard key={bakery.id} bakery={bakery} onClick={handleClickBakeryCard} />
            ))}
          </div>
        )
        : (
          <div className={styles.empty_msg}>
            <div>등록된 베이커리가 없어요.. </div>
            <div>직접 베이커리를 등록해 주세요!</div>
          </div>
        )
      }
    </div>
  );
};

export default SearchContent;