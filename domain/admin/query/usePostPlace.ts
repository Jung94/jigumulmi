import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIadmin } from "@/lib/api/admin";
import type { OpeningHourDay, Position } from '@/components/admin/pages/place-detail/types';

export type MutationPostPlaceProps = {
  name: string,
  category: string
  address: string
  contact: string
  menuList: string[] | null
  imageList: {url: string, isMain: boolean}[]
  openingHour: Record<OpeningHourDay, string>
  placeUrl: string
  position: Record<Position, number>
  additionalInfo: string
  registrantComment: string
  isApproved: boolean
  subwayStationIdList: number[] | null
}

export default function usePostPlace () {
  const response = useMutation(
    [APIadmin.place],
    (body: MutationPostPlaceProps) => postAPI({apiURL: APIadmin.place, body}))
  return response
}

