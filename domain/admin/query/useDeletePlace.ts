import { useMutation } from "@tanstack/react-query";
import { deleteAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";

export default function useDeletePlace () {
  const response = useMutation(
    [APIadmin.place],
    (placeId: number) => deleteAPI({apiURL: APIadmin.place, data: { placeId }}))
  return response
}

