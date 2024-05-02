export const APIreview = {
  /**
   * @description 리뷰
   * @method get/post/put
   */
  review: "/place/review",
  /**
   * @description 리뷰 삭제
   * @method delete
   */
  deleteReview: (reviewId: number) => `/place/review/${reviewId}`,
  /**
   * @description 리뷰 답글
   * @method get/post/put/delete
   */
  reply: "/place/review/reply",
  /**
   * @description 리뷰 답글 삭제
   * @method delete
   */
  deleteReply: (reviewReplyId: number) => `/place/review/reply/${reviewReplyId}`,
}
