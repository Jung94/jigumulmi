import { useMutation } from "@tanstack/react-query";
import { putAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

type MutateProps = {
  reviewId: number
  rating: number
  content: string
}

export default function usePutRegisterReview () {
  const response = useMutation(
    [APIreview.review],
    ({ reviewId, rating, content }: MutateProps) => 
    putAPI({apiURL: APIreview.review, body: { reviewId, rating, content }}))
  return response
}

