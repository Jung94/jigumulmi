import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

export default function useGetReview (placeId: number) {
  const response = useQuery(
    [APIreview.review, placeId],
    () => getAPI(APIreview.review, { placeId }), {
      enabled: placeId !== 0
    })
  return response
}

