import { useMutation, UseMutationResult } from '@tanstack/react-query'
import createBanner from '../../api/createBanner'
import type { CreateBannerResponse, CreateBannerInput } from '../types'

type UseCreatePlaceResult = UseMutationResult<
  CreateBannerResponse, // 성공 응답 타입
  Error,                // 에러 타입
  CreateBannerInput     // 요청 데이터 타입
>;

export default function useCreateBanner(): UseCreatePlaceResult {
  return useMutation(createBanner)
}
