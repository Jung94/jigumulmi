import Link from 'next/link'
import { MouseEvent } from 'react'
import { Button } from '@/src/shared/ui/admin'

export function PreviousPage({ 
  children,
  size = 'medium',
  onClick
}: { 
  children: string 
  size?: 'small' | 'medium' | 'large'
  onClick: () => void
}) {
  return (
    <Button 
      size={size} 
      iconPos='left'
      variant='outline'
      onClick={onClick}
      icon={
        <svg strokeLinejoin="round" viewBox="0 0 16 16">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z" fill="currentColor"></path>
        </svg>
      }
    >
      {children}
    </Button>
  )
}

export function NewTab({
  href,
  children,
  size = 'medium',
  variant = 'outline',
}: { 
  href: string
  children: string 
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'outline' | 'filled' | 'filled-weak'
}) {
  return (
    <Link href={href} target='_blank' onClick={e => e.stopPropagation()}>
      <Button 
        size={size} 
        iconPos='right'
        variant={variant}
        icon={
          <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ paddingBottom: '1px'}}>
            <path d="M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        }
      >
        {children}
      </Button>
    </Link>
  )
}