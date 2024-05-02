import { useMutation } from "@tanstack/react-query";
import { putAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

type MutateProps = {
  reviewReplyId: number
  content: string
}

export default function usePutRegisterReviewReply () {
  const response = useMutation(
    [APIreview.reply],
    ({ reviewReplyId, content }: MutateProps) => 
    putAPI({apiURL: APIreview.reply, body: { reviewReplyId, content }}))
  return response
}

