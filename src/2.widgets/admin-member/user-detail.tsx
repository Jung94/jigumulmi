'use client'

import { Form, Input } from '@/src/shared/ui/admin'
import type { Member } from '@/src/4.entities/member-admin/model/types'

export default function UserDetail({ member }: { member: Member | null }) {
  const leftPad = (value: number): string => {
    if (value >= 10) return String(value)
    return `0${value}`
  }

  const getDate = (date: Date) => {
    const year = date.getFullYear()
    const month = leftPad(date.getMonth() + 1)
    const day = leftPad(date.getDate())

    return [year, month, day].join('-')
  }
  
  return (
    <Form>
      <Form.Item name='ID'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='ID'
            style={{ color: '#333' }}
            value={member?.id ?? ''} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='카카오 ID'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='kakao-id'
            style={{ color: '#333' }}
            value={member?.kakaoUserId ?? ''} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='닉네임'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='nickname'
            style={{ color: '#333' }}
            value={member?.nickname ?? ''} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='이메일'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='email'
            style={{ color: '#333' }}
            value={member?.email ?? ''} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='생성일'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='createdAt'
            style={{ color: '#333' }}
            value={member?.createdAt ? getDate(new Date(member.createdAt)) : ''} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='수정일'>
        <Form.Control>
          <Input 
            disabled
            type='text' 
            name='modifiedAt'
            style={{ color: '#333' }}
            value={member?.modifiedAt ? getDate(new Date(member.modifiedAt)) : ''} 
          />
        </Form.Control>
      </Form.Item>
    </Form>
  )
}
