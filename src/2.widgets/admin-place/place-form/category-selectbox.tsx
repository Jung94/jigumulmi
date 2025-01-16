'use client'

import { SelectBox } from '@/src/shared/ui/admin'
import type { MainCategory, SubCategory } from '@/src/4.entities/place-admin/model/types'

type Category = {
  categoryGroup: MainCategory
  category: SubCategory
}

const categoryOptions = [
  {name: "음식점 - 한식", value: 1},
  {name: "음식점 - 일식", value: 2},
  {name: "음식점 - 중식", value: 3},
  {name: "음식점 - 양식", value: 4},
  {name: "음식점 - 샐러드", value: 5},
  {name: "음식점 - 샌드위치", value: 6},
  {name: "음식점 - 아시안", value: 7},
  {name: "카페 - 음료", value: 8},
  {name: "카페 - 간식", value: 9},
  {name: "제로웨이스트샵", value: 10},
  {name: "재활용센터", value: 11},
]

export default function CategorySelectbox ({
  categoryList,
  handleCategoryListChange,
}: {
  categoryList: Category[]
  handleCategoryListChange: (categoryList: Category[]) => void
}) {
  const getCategoryValue = (subCategory: SubCategory) => {
    switch (subCategory) {
      case '한식': return 1
      case '일식': return 2
      case '중식': return 3
      case '양식': return 4
      case '샐러드': return 5
      case '샌드위치': return 6
      case '아시안': return 7
      case '음료': return 8
      case '간식': return 9
      case '제로웨이스트샵':  return 10
      case '재활용센터':  return 11
    }
  }

  const getCategory = (value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11): Category => {
    switch (value) {
      case 1: 
        return { categoryGroup: '음식점', category: '한식' }
      case 2: 
        return { categoryGroup: '음식점', category: '일식' }
      case 3: 
        return { categoryGroup: '음식점', category: '중식' }
      case 4: 
        return { categoryGroup: '음식점', category: '양식' }
      case 5: 
        return { categoryGroup: '음식점', category: '샐러드' }
      case 6: 
        return { categoryGroup: '음식점', category: '샌드위치' }
      case 7: 
        return { categoryGroup: '음식점', category: '아시안' }
      case 8: 
        return { categoryGroup: '카페', category: '음료' }
      case 9: 
        return { categoryGroup: '카페', category: '간식' }
      case 10: 
        return { categoryGroup: '제로웨이스트샵', category: '제로웨이스트샵' }
      case 11: 
        return { categoryGroup: '재활용센터', category: '재활용센터' }
    }
  }

  const convertCategoryToValue = (categoryList: any[]) => {
    if (categoryList.length === 0) return []
    return categoryList.map(category => getCategoryValue(category.category)).sort()
  }

  const handleCategoryChange = (valueList: number[]) => {
    handleCategoryListChange(valueList.map(v => getCategory(v)))
  }

  return (
    <SelectBox.Multi
      placeholder='선택 안 함'
      options={categoryOptions}
      valueList={convertCategoryToValue(categoryList)}
      onClick={handleCategoryChange}
    ></SelectBox.Multi>
  )
}