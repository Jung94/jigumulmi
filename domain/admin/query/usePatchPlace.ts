import { useMutation } from "@tanstack/react-query";
import { patchAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export type MutationPatchPlaceProps = {
  placeId: number | null
  googlePlaceId: string
}

export default function usePatchPlace () {
  const response = useMutation(
    [APIadmin.place],
    (body: MutationPatchPlaceProps) => patchAPI({apiURL: APIadmin.place, body}))
  return response
}

