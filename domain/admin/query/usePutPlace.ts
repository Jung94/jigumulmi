import { useMutation } from "@tanstack/react-query";
import { putAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";
import type { OpeningHourDay, Position } from '@/components/admin/pages/place-detail/types';

export type MutationPutPlaceProps = {
  name: string,
  category: string
  address: string
  contact: string
  menuList: string[] | null
  openingHour: Record<OpeningHourDay, string>
  mainImageUrl: string
  placeUrl: string
  position: Record<Position, number>
  additionalInfo: string
  registrantComment: string
  isApproved: boolean
  subwayStationIdList: number[] | null
  placeId: number
}

export default function usePutPlace () {
  const response = useMutation(
    [APIadmin.place],
    (body: MutationPutPlaceProps) => putAPI({apiURL: APIadmin.place, body}))
  return response
}

