'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, KeyboardEvent, ChangeEvent, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import XMarkIcon from '@/public/icons/XMark'
import styles from './place-form.module.scss'
import { Form, Input, Button } from '@/src/shared/ui/admin'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { DndContext, closestCorners, useSensor, useSensors, MouseSensor, KeyboardSensor } from '@dnd-kit/core'
import { useUpdatePlaceImageList } from '@/src/4.entities/place-admin/model/queries'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import type { PlaceImage } from '@/src/4.entities/place-admin/model/types'

const DndImageItem = ({ url, isMain, handleDelete}: { url: string, isMain?: boolean, handleDelete: (url: string) => void}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: url })
  const style = { transition, transform: CSS.Transform.toString(transform)}

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles['place-image-preview']}
    >
      <div className={styles['place-image-preview-image-wrapper']}>
        <div className={styles['place-image-preview-image']}>
          <Image fill src={url} alt={url} style={{ objectFit: 'cover', borderRadius: '5px' }} />
        </div>
        {isMain && 
          <span className={styles['place-image-preview-main']}>main</span>
        }
      </div>
      <button className={styles['place-image-preview-x-mark']} onClick={() => handleDelete(url)}>
        <XMarkIcon size='16px' />
      </button>
    </div>
  )
}

export default function ImageSection({
  placeImageList,
  setPlaceImageList
}: {
  placeImageList: PlaceImage[]
  setPlaceImageList: Dispatch<SetStateAction<PlaceImage[]>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const updateImageListMutation = useUpdatePlaceImageList()

  const [imageUrl, setImageUrl] = useState<string>('')

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setImageUrl(value)
  }

  const handleImageUrlKeyDown = (e: KeyboardEvent<Element>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      
      setPlaceImageList((prev: PlaceImage[]) => {
        if (prev.some(img => img.url === imageUrl)) {
          alert('이미 등록된 사진입니다.')
          return prev
        } else {
          return [...prev, { url: imageUrl, isMain: !!prev.length ? false : true }]
        }
      })
      setImageUrl('')
    }
  }

  const handleDeleteImage = (url: string) => {
    setPlaceImageList((prev: PlaceImage[]) => [...prev.filter(i => i.url !== url)])
  }

  const getItemPos = (id: string, items: PlaceImage[]) => items.findIndex(item => item.url === id)

  const handleDragEndForPlaceImage = (activeId: string, overId: string) => {
    const originalPos = getItemPos(activeId, placeImageList)
    const newPos = getItemPos(overId, placeImageList)
    const newPlaceImageList = arrayMove(placeImageList, originalPos, newPos)
    setPlaceImageList(newPlaceImageList)
  }

  const handleDragEnd = (event: any, callback: (activeId: string, overId: string) => void) => {
    const { active, over } = event

    if (active.id === over.id) return
    callback(active.id, over.id)
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 }
  })

  const keyboardSensor = useSensor(KeyboardSensor)
  
  const sensors = useSensors(mouseSensor, keyboardSensor)

  const handleUpdatePlaceImageList = async () => {
    const placeId = params?.placeId ? Number(params.placeId) : null
    if (!placeId) return
    try {
      await updateImageListMutation.mutateAsync({ placeId, data: placeImageList })
      await queryClient.refetchQueries(placeQueryKey.image(placeId))
      alert('수정이 완료되었습니다.')
    } catch (error) {
      alert("장소 이미지 수정을 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update place image list:", error)
    }
  }

  return (
    <Form>
      <Form.Item name='사진'>
        <Form.Control>
          <div className={styles['place-image']}>
            <Input 
              type='text' 
              name='place-image-list'
              value={imageUrl} 
              placeholder='사진 URL'
              onChange={handleImageUrlChange} 
              onKeyDown={handleImageUrlKeyDown}
              style={{ fontSize: '0.875rem' }} 
            />
            <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForPlaceImage)} collisionDetection={closestCorners}>
              <div className={styles[`place-image-dnd-context${!!placeImageList.length ? '' : '-empty'}`]}>
                <SortableContext items={placeImageList.map(i => ({ ...i, id: i.url }))} strategy={horizontalListSortingStrategy}>
                  {placeImageList.map((img: PlaceImage, index: number) => 
                    <DndImageItem key={img.url} url={img.url} isMain={index === 0} handleDelete={handleDeleteImage} />
                  )}
                </SortableContext>
              </div>
            </DndContext>
          </div>
        </Form.Control>
      </Form.Item>
      <Button onClick={handleUpdatePlaceImageList}>저장하기</Button>
    </Form>
  )
}