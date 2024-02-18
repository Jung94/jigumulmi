import styles from './search.module.scss';
import SearchBar from '@/components/searchBar';
import BakeryCard from '@/components/card/Bakery';

type Props = {
  bakeries: any
  setUrlSearchQuery: (bakeryId: number)=>void
};

const SearchContent = ({
  bakeries,
  setUrlSearchQuery
}: Props) => {
  return (
    <>
      <div className={styles.search}>
        <SearchBar type='station' />
      </div>
      <div className={styles.bakery_cards_wrapper}>
        <div className={styles.bakery_cards}>
          {bakeries.map((bakery: any) => (
            <BakeryCard key={bakery.id} bakery={bakery} onClick={setUrlSearchQuery} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchContent;