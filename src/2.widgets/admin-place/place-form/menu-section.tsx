'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import MenuForm from './menu-form'
import { useParams } from 'next/navigation'
import styles from './place-form.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Button } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import uploadImageToS3 from '@/src/4.entities/place-admin/api/uploadImageToS3'
import deleteImageInS3 from '@/src/4.entities/place-admin/api/deleteImageInS3'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { DndContext, closestCorners, useSensor, useSensors, MouseSensor, KeyboardSensor } from '@dnd-kit/core'
import { 
  useUpdatePlaceMenu, 
  usePutPresignedUrl, 
  useDeletePresignedUrl 
} from '@/src/4.entities/place-admin/model/queries'
import type {
  MenuImage,
  PlaceMenuInput, 
  UpdatePlaceMenu, 
} from '@/src/4.entities/place-admin/model/types'

const DndMenuItem = ({ menu, isSelected, handleSelect }: { menu: PlaceMenuInput; isSelected: boolean; handleSelect: (menu: PlaceMenuInput) => void; }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id })
  const style = { transition, transform: CSS.Transform.toString(transform) }
  const url: string | null = menu.tempImage 
    ? (menu.tempImage?.urlFromBlob ?? '')
    : (menu.imageS3Key ? `${process.env.NEXT_PUBLIC_CDN}${menu.imageS3Key}` : null)

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`
        ${styles[`place-form-menu-card`]}
        ${isSelected ? styles[`place-form-menu-card-active`] : ''}
      `}
      onClick={() => handleSelect(menu)}
    >
      <div className={styles['place-form-menu-card-image']}>
        {url
          ? <Image fill src={url} alt={url} style={{ objectFit: 'cover' }} />
          : <span>사진 없음</span>
        }
      </div>
      <div className={styles['place-form-menu-card-name']}>
        {menu.name}
      </div>
      <div className={styles['place-form-menu-card-price']}>
        {menu.price
          ? menu.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'
          : '가격 변동'
        }
      </div>
    </div>
  )
}

const initialMenu = {
  id: crypto.randomUUID(),
  name: '',
  price: '',
  isNew: true,
  isMain: false,
  description: '',
  tempImage: undefined,
}

export default function MenuSection({
  menuData,
  setMenuData
}: {
  menuData: PlaceMenuInput[]
  setMenuData: Dispatch<SetStateAction<PlaceMenuInput[]>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const updatePlaceMenu = useUpdatePlaceMenu()
  const putPresignedUrl = usePutPresignedUrl()
  const deletePresignedUrl = useDeletePresignedUrl()

  const placeId = params?.placeId ? Number(params.placeId) : null
  
  const [isModifying, setIsModifying] = useState<boolean>(false)
  const [deletedMenuList, setDeleteMenuList] = useState<PlaceMenuInput[]>([])
  const [menu, setMenu] = useState<PlaceMenuInput>(initialMenu)

  const handleSelectMenu = (selectedMenu: PlaceMenuInput) => {
    if (selectedMenu.id === menu.id) {
      setIsModifying(false)
      setMenu(initialMenu)
    } else {
      setIsModifying(true)
      setMenu(selectedMenu)
    }
  }

  const getItemPos = (id: string, items: PlaceMenuInput[]) => items.findIndex(item => item.id === id)

  const handleDragEndForPlaceImage = (activeId: string, overId: string) => {
    const originalPos = getItemPos(activeId, menuData)
    const newPos = getItemPos(overId, menuData)
    const newPlaceMenuList = arrayMove(menuData, originalPos, newPos)
    setMenuData(newPlaceMenuList)
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

  const handleDeleteMenu = (menu: PlaceMenuInput) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    setDeleteMenuList((prev: PlaceMenuInput[]) => ([...prev, menu]))
    setMenuData((prev) => prev.filter(m => m.id !== menu.id))
    setIsModifying(false)
    setMenu(initialMenu)
  }

  const handlePutPresignedUrl = async (tempImage: MenuImage) => {
    const file = tempImage.file

    if (!placeId) return
    try {
      const presignedResponse = await putPresignedUrl.mutateAsync({ placeId })

      if (presignedResponse.status === 201) {
        const { url, filename } = presignedResponse.data // url: aws s3 url, filename: uuid(s3 업로드 시 필요)
        const uploadResponse = await uploadImageToS3(url, file)
        
        if (uploadResponse.status === 200) {
          return filename // uuid
        }
      }
    } catch (error) {
      console.error('putPresignedUrl 요청 실패', error)
      return null
    }
  }

  const handleDeletePresignedUrl = async (s3Key: string) => {
    try {
      const presignedResponse = await deletePresignedUrl.mutateAsync({ s3Key })

      if (presignedResponse.status === 201) {
        const { url } = presignedResponse.data // url: aws s3 url
        const uploadResponse = await deleteImageInS3(url)
        if (uploadResponse.status !== 204) return null
      }
    } catch (error) {
      console.error('deletePresignedUrl 요청 실패', error)
      return null
    }
  }

  const handleSaveMenu = async () => {
    let newMenuList: UpdatePlaceMenu[] = []
    let hasError = false

    // 새롭게 저장할 메뉴들
    for (let i = 0; i < menuData.length; i++) {
      const menu = menuData[i]
      let imageFilename = null

      if (!menu.isNew) { // 기존 메뉴
        // 기존 메뉴 이미지는 s3에서 삭제하고 새롭게 변경할 이미지는 s3에 저장한다.
        if (menu.tempImage) { // 사진이 변경된 메뉴
          try { // s3에 저장된 이미지 삭제
            await handleDeletePresignedUrl(menu.imageS3Key!)
          } catch (error) {
            console.error(error)
            return
          }
          
          try { // s3에 이미지 저장
            const newFilename = await handlePutPresignedUrl(menu.tempImage)
            if (newFilename) imageFilename = newFilename
              else return hasError = true
          } catch (error) {
            console.error(error)
            return hasError = true
          }
        } else {
          if (menu.imageFilename) imageFilename = menu.imageFilename
        }
      } else if (menu.tempImage) { // 새롭게 추가된 메뉴 + 사진 포함
        // 새로운 메뉴 이미지를 s3에 저장한다.
        try {
          const newFilename = await handlePutPresignedUrl(menu.tempImage)
          if (newFilename) imageFilename = newFilename
            else return hasError = true
        } catch (error) {
          console.error(error)
          return hasError = true
        }
      } else { // 새롭게 추가된 메뉴 + 사진 포함 X
        imageFilename = null
      }

      newMenuList.push({
        name: menu.name,
        price: menu.price,
        isMain: menu.isMain,
        description: menu.description,
        imageFilename
      })
    }

    // 메뉴 이미지 삭제: 삭제한 메뉴들 중 s3에 저장된 메뉴 이미지를 삭제한다.
    for (let i = 0; i < deletedMenuList.length; i++) {
      const menu = deletedMenuList[i]
      
      if (menu.imageS3Key) {
        try {
          await handleDeletePresignedUrl(menu.imageS3Key!)
        } catch (error) {
          console.error(error)
          return
        }
      }
    }

    if (!placeId || hasError) return alert('에러 발생! 개발자 문의가 필요합니다.')
    try {
      await updatePlaceMenu.mutateAsync({ placeId, data: newMenuList })
      await queryClient.refetchQueries(placeQueryKey.menu(placeId))
      alert('메뉴 정보가 저장되었습니다.')
    } catch (error) {
      alert("메뉴 정보 저장에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update menu:", error)
    }
  }

  return (
    <Form>
      <MenuForm 
        menu={menu}
        setMenu={setMenu}
        menuList={menuData}
        setMenuList={setMenuData}
        isModifying={isModifying}
        setIsModifying={setIsModifying}
        handleDeleteMenu={handleDeleteMenu}
      />
      <Form.Divider />
      <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForPlaceImage)} collisionDetection={closestCorners}>
        <div className={styles[`place-form-menu-dnd-context${!!menuData.length ? '' : '-empty'}`]}>
          <SortableContext items={menuData.map(i => ({ ...i, id: i.id }))} strategy={horizontalListSortingStrategy}>
            {menuData.map((m: PlaceMenuInput) => 
              <DndMenuItem 
                key={m.id} 
                menu={m} 
                isSelected={isModifying && menu.id === m.id} 
                handleSelect={handleSelectMenu} 
              />
            )}
          </SortableContext>
        </div>
        {!menuData.length && <div className={styles['place-form-menu-empty']}>메뉴 없음</div>}
      </DndContext>
      <Form.Divider />
      <Button onClick={handleSaveMenu}>저장하기</Button>
    </Form>
  )
}