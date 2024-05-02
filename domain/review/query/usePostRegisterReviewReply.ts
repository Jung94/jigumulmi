import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

type MutateProps = {
  reviewId: number
  content: string
}

export default function usePostRegisterReviewReply () {
  const response = useMutation(
    [APIreview.reply],
    ({ reviewId, content }: MutateProps) => 
      postAPI({apiURL: APIreview.reply, body: { reviewId, content }}))
  return response
}

