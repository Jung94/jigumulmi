import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

export default function usePostRegisterReview () {
  const response = useMutation(
    [APIreview.review],
    (formData: FormData) => 
      postAPI({apiURL: APIreview.review, body: formData}))
  return response
}

