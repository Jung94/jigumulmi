'use client'

import { useState } from 'react'
import Layout from '@/src/shared/ui/admin/layout/main'
import { 
  MemberListTable,
  UserDetailSection
} from '@/src/2.widgets/admin-member'
import { 
  MainSectionLayout,
  AsideSectionLayout,
  HeaderSectionLayout
} from '@/src/shared/ui/admin'
import type { Member } from '@/src/4.entities/member-admin/model/types'

export default function MemberPage() {
  const [member, setMember] = useState<Member | null>(null)

  const handleMemberListTableRowClick = (member: Member) => {
    setMember(member)
  }

  return (
    <Layout row>
      <MainSectionLayout>
        <HeaderSectionLayout title='유저 관리' />
        <MemberListTable
          handleMemberListTableRowClick={handleMemberListTableRowClick}
        />
      </MainSectionLayout>
      <AsideSectionLayout style={{ width: '20rem' }}>
        <UserDetailSection
          member={member}
        />
      </AsideSectionLayout>
    </Layout>
  )
}
