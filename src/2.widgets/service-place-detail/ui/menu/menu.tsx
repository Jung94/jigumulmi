'use client'

import { useRef, useEffect } from 'react'
import styles from './menu.module.scss'
import { LoadingSpinner } from '@/src/shared/assets/icons'
import { MenuCard } from '@/src/2.widgets/service-place-detail/ui'
import { 
  useFetchMenuList,
} from '@/src/4.entities/place/model/queries'

export default function Menu({
  placeId
}: {
  placeId: number
}) {
  const { 
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage } = useFetchMenuList(placeId)

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentObserverRef = observerRef.current
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    if (currentObserverRef) io.observe(currentObserverRef)

    return () => {
      currentObserverRef && io.disconnect()
    }
  }, [hasNextPage, fetchNextPage])

  if (!data) return

  return (
    <div className={styles['menu']}>
      {data?.pages.map((page, idx) =>
        page.data.map((menu, index) => (
          <div
            key={menu.name} 
            ref={
              idx === data.pages.length - 1 && 
              page.data.length === 15 
              && index === page.data.length - 5
                ? observerRef
                : null
            }
          >
            <MenuCard menu={menu} isLast={index === page.data.length - 1} />
          </div>
        ))
      )}
      {isFetchingNextPage 
        ? (
          <LoadingSpinner 
            width={24} 
            height={24} 
            style={{ margin: '2rem auto', width: '100%' }} 
          />
        )
        : null
      }

      {data.pages[0].page.totalCount === 0 &&
        <div className='padding-x-mobile'>등록된 메뉴가 없습니다.</div>
      }
    </div>
  )
}