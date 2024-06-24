import styles from './search.module.scss';
import Button from '@/components/button';
import BakeryCard from '@/components/card/Bakery';
import { useModal } from '@/lib/hooks'
import RegistrationBakeryContent from '@/components/modal/registration-bakery/Content'
import type { PlaceSummary } from '@/types/place';


type Props = {
  placeList: PlaceSummary[]
  handleClickPlaceCard: (place: PlaceSummary)=>void
};

const SearchContent = ({
  placeList,
  handleClickPlaceCard
}: Props) => {
  const RegistrationBakeryModal = useModal(
    <RegistrationBakeryContent onClose={handleCloseRegistrationBakeryModal} /> 
  )
  function handleOpenRegistrationBakeryModal() { RegistrationBakeryModal.open() }
  function handleCloseRegistrationBakeryModal() { RegistrationBakeryModal.close() }

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
            <Button type='button' variant='contained' color='primary' onClick={handleOpenRegistrationBakeryModal} style={{ marginTop: '0.5rem', width: '13rem', height: '2.5rem' }}>장소 등록하기</Button>
          </div>
        )
      }
      {RegistrationBakeryModal.Dialog}
    </div>
  );
};

export default SearchContent;