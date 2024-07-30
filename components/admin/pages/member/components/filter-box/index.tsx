"use client"

import styles from './filter-box.module.scss'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/admin/button'
import { SelectBox } from '@/components/admin/form'

const sortOptions = [
  {value: 1, name: '최신 순'},
  {value: 2, name: '오래된 순'},
]

const FilterBox = ({
  filters,
  handleSelect,
}: {
  filters: any
  handleSelect: (v: any, name: string)=>void
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/admin/place/creation')
  }

  return (
    <div className={styles.container} style={{alignItems: 'flex-end'}}>
      <Button type='normal' onClick={handleClick} style={{height: '2.5rem', fontSize: '13px'}}>등록하기</Button>
      {/* <SelectBox.HiddenOption
        name="sort" 
        label='정렬'
        options={sortOptions}
        selected={filters.sort}
        onClick={(v)=>handleSelect(v, "sort")}
        style={{
          width: '8rem'
        }}
      ></SelectBox.HiddenOption> */}
    </div>
  )
}

export default FilterBox