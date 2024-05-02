"use client"

import { useState } from 'react';
import styles from './registration-review.module.scss';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/button';
import { useModal } from '@/lib/hooks';
import SuccessContent from '@/components/modal/success/Content';
import { usePostRegisterReview } from '@/domain/review/query';

import { useQueryClient } from '@tanstack/react-query';
import { placeDetailQueryKey } from '@/domain/search/query/useGetPlaceDetail';
import { usePutRegisterReview } from '@/domain/review/query';
import { APIreview } from "@/lib/api/review";

const Star = ({ active, onClick }: { active: boolean, onClick: ()=>void }) => {
  return (
    <button type='button' className={styles["star-button"]} onClick={onClick}>
      <svg width="40px" height="40px" strokeWidth="1.5" viewBox="0 0 24 24" fill={active ? '#E8674D' : 'hsl(0,0%,85%)'} xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#000000" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

const RegistrationReviewContent = ({
  type='post',
  reviewId,
  curRating,
  curReview,
  onClose
}: {
  type: 'post' | 'put'
  reviewId: number
  curRating?: number
  curReview?: string
  onClose: ()=>void
}) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const selectedPlace = searchParams?.get("place"); // string | null
  const registerReview = usePostRegisterReview();
  const putReview = usePutRegisterReview();
  const [ placeholder ] = useState("소중한 리뷰를 남겨주세요");
  const [ rating, setRating ] = useState<number>(curRating ?? 0);
  const [ review, setReview ] = useState<string>(curReview ?? "");
  const [ loading, setLoading ] = useState(false);

  const handleRating = (order: number) => setRating(order);

  const getStarLabel = (rating: number) => {
    if (rating === 0) return '';
    if (rating === 1 || rating === 2) return '아쉬워요';
    if (rating === 3) return '그저그래요';
    if (rating === 4) return '괜찮아요';
    if (rating === 5) return '최고예요';
    return '';
  }

  const handleReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value }: { value: string } = e.target as HTMLTextAreaElement;
    setReview(value);
  };

  const handleClose = () => {
    setRating(curRating ?? 0)
    setReview(curReview ?? "")
    onClose()
  }

  const SuccessModal = useModal(
    <SuccessContent 
      title='등록이 완료되었어요!' 
      onClose={handleCloseSuccessModal} 
    />,
    {disabledBackdropClosing: true, style: {top: '30%'}}
  )
  function handleOpenSuccessModal() { SuccessModal.open() }
  async function handleCloseSuccessModal() {
    await queryClient.refetchQueries([placeDetailQueryKey(Number(selectedPlace))])
    await queryClient.refetchQueries([APIreview.review])
    await queryClient.refetchQueries([APIreview.reply, reviewId])

    if (type === 'post') {
      setReview('')
      setRating(0)
    }
    
    SuccessModal.close()
    onClose()
  }

  const mutatePostReview = async () => {
    setLoading(true)

    registerReview.mutate(
      { placeId: Number(selectedPlace), rating, content: review },
      {
        onSuccess: async (data) => {
          console.log(data)
          setLoading(false)

          if (data.status === 201) {
            handleOpenSuccessModal()
          }
        },
        onError(error, variables, context) {
          setLoading(false)
          alert('리뷰 등록에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  const mutatePutReview = () => {
    setLoading(true)

    putReview.mutate(
      { reviewId, rating, content: review },
      {
        onSuccess: async (data) => {
          console.log(data)
          setLoading(false)

          if (data.status === 204) {
            handleOpenSuccessModal()
          }
        },
        onError(error, variables, context) {
          setLoading(false)
          alert('수정에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  const handleSaveReview = () => {
    if (type === 'post') mutatePostReview()
    if (type === 'put') mutatePutReview()
  }

  return (
    <div className={styles.container}>
      <button className={styles.close_button} onClick={handleClose}>
        <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <div className={styles.title}>
        리뷰 {curRating ? '수정' : '작성'}
      </div>
      <form className={styles.content}>
        <div className={styles.section}>
          <div className={styles.title}>
            {!curRating && <span>*</span>}
            &nbsp;별점
          </div>
          <div className={styles.rating}>
            {Array.from({length: 5}, (_, idx) => 
              <Star 
                key={String(idx)} 
                active={rating >= idx + 1} 
                onClick={()=>handleRating(idx + 1)} 
              />)}
          </div>
          <div className={styles['rating-label']}>
            {rating === 0
              ? '별을 눌러주세요'
              : (
                <>
                  <span>{rating}점</span>
                  ({getStarLabel(rating)})
                </>
              )
            }
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            리뷰
          </div>
          <textarea id='review' name='review' maxLength={400} placeholder={placeholder} value={review} onChange={handleReview} />
        </div>

        <Button loading={loading} type='submit' variant='contained' color='primary' disabled={curRating ? (rating === 0 && !!review) : (rating === 0)} formAction={handleSaveReview}>제출하기</Button>
      </form>
      {SuccessModal.Dialog}
    </div>
  )
}

export default RegistrationReviewContent

{/* <label htmlFor='rating_5'>
      <input type='radio' id='rating_5' name='rating' value={5} checked={rating === 5} onChange={handleRating} />
      <span>5점</span>
    </label>
    <label htmlFor='rating_4'>
      <input type='radio' id='rating_4' name='rating' value={4} checked={rating === 4} onChange={handleRating} />
      <span>4점</span>
    </label>
    <label htmlFor='rating_3'>
      <input type='radio' id='rating_3' name='rating' value={3} checked={rating === 3} onChange={handleRating} />
      <span>3점</span>
    </label>
    <label htmlFor='rating_2'>
      <input type='radio' id='rating_2' name='rating' value={2} checked={rating === 2} onChange={handleRating} />
      <span>2점</span>
    </label>
    <label htmlFor='rating_1'>
      <input type='radio' id='rating_1' name='rating' value={1} checked={rating === 1} onChange={handleRating} />
      <span>1점</span>
    </label> */}