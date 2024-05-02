import { useMutation } from "@tanstack/react-query";
import { deleteAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

export default function useDeleteReviewReply ({reviewReplyId, onSuccess}: { reviewReplyId: number, onSuccess: ()=>void}) {
  const response = useMutation(
    [APIreview.deleteReply(reviewReplyId)],
    () => 
    deleteAPI({apiURL: APIreview.deleteReply(reviewReplyId), data: { reviewReplyId }}),
    {
      onSuccess: async (data) => {
        console.log(data)
        if (data.status === 204) onSuccess()
      },
      onError(error, variables, context) {
        alert('삭제에 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.')
      },
    }
  )
  return response
}

