import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

type MutateProps = {
  placeId: number
  rating: number
  content: string
}

export default function usePostRegisterReview () {
  const response = useMutation(
    [APIreview.review],
    ({ placeId, rating, content}: MutateProps) => 
      postAPI({apiURL: APIreview.review, body: { placeId, rating, content }}))
  return response
}

