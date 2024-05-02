import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/lib/api";
import { APIreview } from "@/lib/api/review";

export default function useGetReviewReply ({ reviewId, shown, replyCount }: { reviewId: number, shown: boolean, replyCount: number }) {
  const response = useQuery(
    [APIreview.reply, reviewId],
    () => getAPI(APIreview.reply, { reviewId }), {
      enabled: !!(reviewId !== 0 && shown && replyCount !== 0)
    })
  return response
}

