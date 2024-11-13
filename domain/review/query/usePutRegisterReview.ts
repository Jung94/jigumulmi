import { useMutation } from "@tanstack/react-query";
import { putAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

export default function usePutRegisterReview () {
  const response = useMutation(
    [APIreview.review],
    (formData: FormData) => 
    putAPI({apiURL: APIreview.review, body: formData}))
  return response
}

