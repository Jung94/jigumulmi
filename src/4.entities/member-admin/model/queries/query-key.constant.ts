import memberAPI from '@/src/4.entities/member/api/member.constant'

const memberQueryKey = {
  base: () => [memberAPI.base()],
  list: (queryParams: Record<string, any>) => [memberAPI.base, queryParams],
}

export default memberQueryKey