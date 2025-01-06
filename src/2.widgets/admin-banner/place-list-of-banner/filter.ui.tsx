import { Dispatch, SetStateAction } from 'react'
import { useParams } from 'next/navigation'
import styles from './place-list.module.scss'
import { Button } from '@/src/shared/ui/admin'
import { useQueryClient } from '@tanstack/react-query'
import { bannerAmdinAPI } from '@/src/4.entities/banner-admin/api/banner.constant'
import { useDeletePlaceList } from '@/src/4.entities/banner-admin/model/queries'

export default function PlaceFilter({ 
  selectedIdList,
  setSelectedIdList
}: { 
  selectedIdList: number[] 
  setSelectedIdList: Dispatch<SetStateAction<number[]>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const mutation = useDeletePlaceList()

  const handlePlaceListDelete = async () => {
    const bannerId = Number(params?.bannerId)
    if (!bannerId) return
    try {
      await mutation.mutateAsync({
        bannerId, 
        data: { placeIdList: selectedIdList }
      })
      await queryClient.refetchQueries({ queryKey: [bannerAmdinAPI.placeList(bannerId)], type: 'active' }) // 할당된 장소 리스트
      await queryClient.refetchQueries({ queryKey: [bannerAmdinAPI.parmittedPlaceList] }) // 할당 가능한 장소 리스트
      setSelectedIdList([])
      alert('회수가 완료되었습니다.')
    } catch (error) {
      alert("장소 회수에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update place list:", error)
    }
  }

  return (
    <div className={styles['filter']}>
      <div className={styles['filter-bottom']}>
        <Button 
          size='small' 
          color='red' 
          disabled={!selectedIdList.length}
          // style={{ width: '6rem' }}
          onClick={handlePlaceListDelete}
        >회수하기</Button>
      </div>
      {/* <Button 
        size='small' 
        color='red' 
        disabled={!selectedIdList.length}
        onClick={handlePlaceListDelete}
      >회수하기</Button> */}
    </div>
  )
}