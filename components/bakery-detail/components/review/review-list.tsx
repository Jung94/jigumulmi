"use client"

import styles from './review-list.module.scss';
import { useState, useEffect, useRef } from 'react';
import User from '@/public/icons/User';
import Check from '@/public/icons/Check';
import XMark from '@/public/icons/XMark';
import Spinner from '@/public/icons/LoadingSpinnerWhite';
import { useModal } from '@/lib/hooks';
import RequestLoginContent from '@/components/modal/request-login/Content';
import RegistrationReviewContent from '@/components/modal/registration-review/Content';
import DeletionReviewContent from '@/components/modal/deletion-review/Content';

import { useQueryClient } from '@tanstack/react-query';
import { 
  useGetReviewReply, 
  usePostRegisterReviewReply,
  usePutRegisterReviewReply,
  useDeleteReview,
  useDeleteReviewReply
} from '@/domain/review/query';
import { APIreview } from "@/lib/api/review";

type ReviewReply = {
  id: number
  content: string
  isEditable: boolean
  repliedAt: string
  member: {
    id: number
    email: string
    nickname: string
    createdAt: string
  }
}
type Review = {
  id: number
  content: string
  rating: number
  replyCount: number
  isEditable: boolean
  reviewedAt: string
  deletedAt: string
  member: {
    id: number
    email: string
    nickname: string
    createdAt: string
    deregisteredAt: string
  }
}

const ReReviewCard = ({ reviewReply }: { reviewReply: ReviewReply }) => {
  const queryClient = useQueryClient();
  const [ isModifying, setIsModifying ] = useState<boolean>(false);
  const handleModify = () => setIsModifying(false);

  const successDeletionReviewReply = async () => {
    await queryClient.refetchQueries([APIreview.review])
    await queryClient.refetchQueries([APIreview.reply])
    handleCloseDeletionReviewReplyModal()
  };

  const deleteReviewReply = useDeleteReviewReply({
    reviewReplyId: reviewReply.id,
    onSuccess: successDeletionReviewReply
  });

  const DeletionReviewReplyModal = useModal(
    <DeletionReviewContent
      title='답글을 삭제하시겠어요?'
      onClick={()=>deleteReviewReply.mutate()}
    />
  );
  function handleOpenDeletionReviewReplyModal() { DeletionReviewReplyModal.open() };
  function handleCloseDeletionReviewReplyModal() { DeletionReviewReplyModal.close()};

  return (
    <div className={styles.re_review_card}>
      <div className={styles.re_review_card_header}>
        <div className={styles.re_review_card_header_left}>
          <div className={styles.re_review_card_header_left_profile_image}></div>
          <div className={styles.re_review_card_header_left_user_nickname}>{reviewReply.member.nickname}</div>
          {reviewReply.isEditable &&
            <>
              <button className={styles.re_review_card_header_left_modification} onClick={()=>setIsModifying(prev => !prev)}>
                {isModifying ? '취소' : '수정'}
              </button>
              <button className={styles.re_review_card_header_left_deletion} onClick={handleOpenDeletionReviewReplyModal}>삭제</button>
            </>
          }
        </div>
        <div className={styles.re_review_card_header_created_at}>{reviewReply.repliedAt}</div>
      </div>
      
      {isModifying
        ? <ReviewReplyForm reviewReplyId={reviewReply.id} method='put' content={reviewReply.content} handleModify={handleModify} />
        : <div className={styles.re_review_card_content}>{reviewReply.content}</div>
      }

      {/* <div className={styles.re_review_card_footer}>
        <button className={styles.re_review_card_footer_heart}>
          <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#E8674D" strokeWidth="1.5" strokeLinejoin="round">
            </path>
          </svg>
          <span>13</span>
        </button>
      </div> */}

      {DeletionReviewReplyModal.Dialog}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const queryClient = useQueryClient();
  const [ shownReReview, setShownReReview ] = useState<boolean>(false);

  const RegistrationReviewModal = useModal(
    <RegistrationReviewContent
      type='put'
      reviewId={review.id}
      curRating={review.rating}
      curReview={review.content}
      onClose={handleCloseRegistrationReviewModal} 
    />,
    {disabledBackdropClosing: true, disabledEscKey: true}
  );
  function handleOpenRegistrationReviewModal() { RegistrationReviewModal.open() };
  function handleCloseRegistrationReviewModal() { RegistrationReviewModal.close()};

  const successDeletionReview = async () => {
    await queryClient.refetchQueries([APIreview.review])
    handleCloseDeletionReviewModal()
  };

  const deleteReview = useDeleteReview({
    reviewId: review.id,
    onSuccess: successDeletionReview
  });

  const DeletionReviewModal = useModal(
    <DeletionReviewContent
      title='댓글을 삭제하시겠어요?'
      onClick={()=>deleteReview.mutate()}
    />,
    {style: {top: '45%'}}
  );
  function handleOpenDeletionReviewModal() { DeletionReviewModal.open() };
  function handleCloseDeletionReviewModal() { DeletionReviewModal.close()};

  const { data: reviewReplyList, isLoading } = useGetReviewReply({ 
    reviewId: review.id, 
    shown: shownReReview, 
    replyCount: review.replyCount 
  });

  return (
    <div className={styles.review_card}>
      <div className={styles.review_card_header}>
        <div className={styles.review_card_header_left}>
          <div className={styles.review_card_header_left_profile_image}></div>
          <div className={styles.review_card_header_left_user_nickname}>{review.member.nickname}</div>
        </div>
        <div className={styles.review_card_header_created_at}>{review.reviewedAt}</div>
      </div>
      {!review.deletedAt &&
        <div className={styles.review_card_rating}>
          <div className={styles.review_card_rating_star}>
            <div className={styles.review_card_rating_star_icon}>
              <svg width="16px" height="16px" strokeWidth="1.5" viewBox="0 0 24 24" fill='#0060AE' xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#000000" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <span className={styles.review_card_rating_star_number}>{review.rating}</span>
          </div>
          {review.isEditable &&
            <div className={styles.review_card_rating_buttons}>
              <button className={styles.review_card_rating_buttons_modification} onClick={handleOpenRegistrationReviewModal}>수정</button>
              <button className={styles.review_card_rating_buttons_deletion} onClick={handleOpenDeletionReviewModal}>삭제</button>
            </div>
          }
        </div>
      }
      
      {review.deletedAt
        ? <div className={styles.review_card_deleted}>삭제된 리뷰입니다.</div>
        : (!!review.content &&
          <div className={styles.review_card_content}>{review.content}</div>
        )
        // (isModifying
        //   ? <textarea>{review.content}</textarea>
        //   : <div className={styles.review_card_content}>{review.content}</div>
        // )
      }
      
      <div className={styles.review_card_footer}>
        {/* <button className={styles.review_card_footer_heart}>
          <svg width="20px" height="20px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#E8674D" strokeWidth="1.5" strokeLinejoin="round">
            </path>
          </svg>
          <span>13</span>
        </button> */}
        {shownReReview
          ? (
            <button className={styles.review_card_footer_comment_button} onClick={()=>setShownReReview(false)}>
              <span>답글 접기</span>
              <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M6 15L12 9L18 15" stroke="hsl(0,0%,40%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                </path>
              </svg>
            </button>
          )
          : (
            <button className={styles.review_card_footer_comment_button} onClick={()=>setShownReReview(true)}>
              {!!(review.replyCount)
                ? <span>{review.replyCount}개의 답글</span>
                : <span>답글 작성</span>
              }
              <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M6 9L12 15L18 9" stroke="hsl(0,0%,40%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                </path>
              </svg>
            </button>
          )
        }
      </div>
      {shownReReview && (
        isLoading && review.replyCount > 0
          ? (
            <div className={styles.review_card_re_review_loading}>
              <Spinner size='23px' color='#232323' />
            </div>
          )
          : (
            <div className={styles.review_card_re_review_wrapper}>
              {reviewReplyList?.data.map((reviewReply: ReviewReply) =>
                <ReReviewCard key={reviewReply.id} reviewReply={reviewReply} />)}
              <ReviewReplyForm reviewId={review.id} method='post' />
            </div>
          )
      )
      }
      {DeletionReviewModal.Dialog}
      {RegistrationReviewModal.Dialog}
    </div>
  );
};

const ReviewReplyForm = ({ reviewId=0, reviewReplyId=0, method, content='', mutateFunc, handleModify }: { reviewId?: number, reviewReplyId?: number, method: 'post' | 'put', content?: string, mutateFunc?:()=>void, handleModify?:()=>void }) => {
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [ reply, setReply ] = useState(content);
  const [ status, setStatus ] = useState<'disabled' | 'active' | 'loading' | 'success' | 'error'>(content ? 'active' : 'disabled');

  const RequestLoginModal = useModal(
    <RequestLoginContent
      onClose={handleCloseRequestLoginModal} 
    />
  )
  function handleOpenRequestLoginModal() { RequestLoginModal.open() }
  function handleCloseRequestLoginModal() { RequestLoginModal.close()}

  // 답글 작성 및 수정
  const handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textareaRef.current.style.height = 'auto'; //height 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';

    const { value }: { value: string } = e.target as HTMLTextAreaElement
    setReply(value)
  };

  const postReviewReply = usePostRegisterReviewReply();
  const putReviewReply = usePutRegisterReviewReply();

  const mutatePostReviewReply = () => {
    postReviewReply.mutate(
      { reviewId, content: reply },
      {
        onSuccess: async (data) => {
          console.log(data)
          if (data.status === 201) {
            await queryClient.refetchQueries([APIreview.review])
            await queryClient.refetchQueries([APIreview.reply])
            setReply('')
            setStatus('success')
            return
          } else if (data.status === 403) {
            handleOpenRequestLoginModal()
            return
          }
          setStatus('error')
        },
        onError(error, variables, context) {
          setStatus('error')
          alert('등록에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  const mutatePutReviewReply = () => {
    putReviewReply.mutate(
      { reviewReplyId, content: reply },
      {
        onSuccess: async (data) => {
          console.log(data)
          if (data.status === 204) {
            await queryClient.refetchQueries([APIreview.review])
            await queryClient.refetchQueries([APIreview.reply])
            setStatus('success')
            handleModify && handleModify()
          } else {
            setStatus('error')
          }
        },
        onError(error, variables, context) {
          setStatus('error')
          alert('수정에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
        },
      }
    )
  }

  const handleClick = () => {
    setStatus('loading')
    
    if (method === 'post') mutatePostReviewReply()
    if (method === 'put') mutatePutReviewReply()
  };

  useEffect(()=>{
    if (method === 'put') {
      textareaRef.current.style.height = 'auto'; //height 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, []);

  useEffect(()=>{
    if (status === 'success') setTimeout(()=>setStatus('disabled'), 1500)
    if (status === 'error') setTimeout(()=>setStatus('active'), 1500)
  }, [status]);

  useEffect(()=>{
    if (reply) setStatus('active')
    if (!reply) setStatus('disabled')
  }, [reply]);

  return (
    <div className={styles.review_reply}>
      {method === 'post' &&
        <div className={styles.review_reply_user_icon}>
          <User size='17px' />
        </div>
      }
      <textarea ref={textareaRef} rows={1} value={reply} onChange={handleChangeReply} />
      {status === 'disabled' &&
        <button disabled className={`${styles.wrapper_status}`}>
          <svg width="18px" height="18px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      }
      {status === 'active' &&
        <button className={`${styles.wrapper_status}`} onClick={handleClick}>
          {method === 'post' ? '등록' : '수정'}
        </button>
      }
      {status === 'loading' &&
        <div className={styles.wrapper_status}>
          <Spinner size='18px' color='#232323' />
        </div>
      }
      {status === 'success' &&
        <div className={`${styles.wrapper_status}`}>
          <Check color='#E8674D' />
        </div>
      }
      {status === 'error' &&
        <div className={styles.wrapper_status}>
          <XMark color='hsl(358,75%,59%)' />
        </div>
      }
      {RequestLoginModal.Dialog}
    </div>
  );
};

export default function ReviewList({ reviewList }: { reviewList: Review[]}) {
  return (
    <div className={styles.wrapper}>
      {reviewList.map(review => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
};