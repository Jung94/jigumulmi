import { useQuery } from '@tanstack/react-query'
import fetchBanners from '../api/fetchBanners'
import { Banner } from '../types/bannerTypes'

export default function useFetchBanners() {
  return useQuery<Banner[], Error>({
    queryKey: ['banners-admin'],
    queryFn: fetchBanners,
  })
}
