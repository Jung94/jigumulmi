import { useMutation, UseMutationResult } from '@tanstack/react-query'
import updateBanner from '../../api/updateBanner'
import type { UpdateBannerVariables } from '../types'

type UseUpdateBannerResult = UseMutationResult<
  void,                  // 반환값 타입 (response body를 다루지 않으므로 void)
  unknown,               // 에러 타입
  UpdateBannerVariables  // 요청 데이터 타입
>;

export default function useUpdateBanner(): UseUpdateBannerResult {
  return useMutation(updateBanner)
}
