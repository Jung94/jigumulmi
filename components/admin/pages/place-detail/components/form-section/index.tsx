"use client"

import Image from 'next/image'
import styles from './form-section.module.scss'
import { SetStateAction, useState } from 'react'
import { Input } from '@/components/admin/form'
import { Button } from '@/components/admin/button'
import { SelectBox } from '@/components/admin/form'
import { useQueryClient } from '@tanstack/react-query';
import { placeDetailQueryKey } from '@/domain/admin/query/useGetPlaceDetail';
import { useGetPlaceSubway } from '@/domain/search/query'
import { usePatchPlace } from '@/domain/admin/query';
import XMarkIcon from '@/public/icons/XMark'
import { DndContext, closestCorners, useSensor, useSensors, MouseSensor, KeyboardSensor } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import type { PlaceDetail, Position, SubwayStation, OpeningHourDay, Menu } from '../../types'

const DndItem = ({ id, name, isMain, handleDelete}: { id: number, name: string, isMain?: boolean, handleDelete: (id: number)=>void}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transition, transform: CSS.Transform.toString(transform)}

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles['form-section-multi-select-box-tag']}
    >
      <div className={styles['form-section-multi-select-box-tag-name']}>
        {name}
        {isMain && 
          <span className={styles['form-section-multi-select-box-tag-main']}>main</span>
        }
      </div>
      <button className={styles['form-section-multi-select-box-tag-x-mark']} onClick={()=>handleDelete(id)}>
        <XMarkIcon size='16px' />
      </button>
    </div>
  )
}

const DndImageItem = ({ id, url, isMain, handleDelete}: { id: string, url: string, isMain?: boolean, handleDelete: (id: string)=>void}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transition, transform: CSS.Transform.toString(transform)}

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles['form-section-multi-select-box-preview']}
    >
      <div className={styles['form-section-multi-select-box-preview-image-wrapper']}>
        <div className={styles['form-section-multi-select-box-preview-image']}>
          <Image fill src={url} alt={url} style={{objectFit: 'cover', borderRadius: '5px'}} />
        </div>
        {isMain && 
          <span className={styles['form-section-multi-select-box-preview-main']}>main</span>
        }
      </div>
      <button className={styles['form-section-multi-select-box-preview-x-mark']} onClick={()=>handleDelete(id)}>
        <XMarkIcon size='16px' />
      </button>
    </div>
  )
}

export default function FormSection ({ 
  data, 
  setData 
}: { 
  data: PlaceDetail, 
  setData: React.Dispatch<SetStateAction<PlaceDetail>> 
}) {
  const queryClient = useQueryClient()
  
  const [ stationName, setStationName ] = useState<string>('')
  const [ menuName, setMenuName ] = useState<string>('')
  const [ imageUrl, setImageUrl ] = useState<string>('')
  
  const { data: subwayStationList } = useGetPlaceSubway(stationName)
  // console.log(data)

  const handleChange = (propName: string, value: string) => setData(prev => {return {...prev, [propName]: value}})
  const handlePosition = (propName: Position, value: string) => {
    setData((prev: PlaceDetail) => {
      let position = {...prev.position}
      position[propName] = value
      return {...prev, position}
    })
  }
  const handleOpeningHour = (day: OpeningHourDay, hour: string) => {
    setData((prev: PlaceDetail) => {
      let openingHour = {...prev.openingHour}
      openingHour[day] = hour
      return {...prev, openingHour}
    })
  }
  const handleSubwayStation = (station: SubwayStation) => {
    setData(prev => {
      const hasStation = prev.subwayStationList.some(v => v.id === station.id)
      
      if (prev.subwayStationList && hasStation) return {...prev, subwayStationList: [...prev.subwayStationList.filter(v => v.id !== station.id)]}
        return {...prev, subwayStationList: !!prev.subwayStationList.length ? [...prev.subwayStationList, station] : [station]}
    })
    setStationName('')
  }
  const handleDeleteSelectedStation = (stationId: number) => {
    setData(prev => {return {...prev, subwayStationList: prev.subwayStationList!.filter(v => v.id !== stationId)}})
  }
  const getItemPos = (id: any, items: any[]) => items.findIndex(item => item.id === id)
  const handleDragEndForStation = (activeId: number, overId: number) => {
    setData(prev => {
      const items = prev.subwayStationList
      const originalPos = getItemPos(activeId, items)
      const newPos = getItemPos(overId, items)
      const newList = arrayMove(items, originalPos, newPos)
      
      return {...prev, subwayStationList: newList}
    })
  }

  const handleDragEndForMenu = (activeId: number, overId: number) => {
    setData(prev => {
      const items = prev.menuList!
      const originalPos = getItemPos(activeId, items)
      const newPos = getItemPos(overId, items)
      const newList = arrayMove(items, originalPos, newPos)
      
      return {...prev, menuList: newList}
    })
  }
  const handleDeleteSelectedMenu = (menuId: number) => {
    setData(prev => {return {...prev, menuList: prev.menuList!.filter(v => v.id !== menuId)}})
  }
  const handleKeydownForMenu = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    if (nativeEvent.isComposing || !menuName) return 

    if (key === 'Enter') {
      setData(prev => {
        const newId = !!prev.menuList.length 
          ? (Math.min(...prev.menuList.map(menu => menu.id)) < 0
              ? Math.min(...prev.menuList.map(menu => menu.id)) - 1
              : -1
            )
          : -1
        return {...prev, menuList: [...prev.menuList, {id: newId, name: menuName}]}
      })
      setMenuName('')
    }
  }

  const getImageItemPos = (id: any, items: any[]) => items.findIndex(item => item === id)
  const handleDragEndForImage = (activeId: number, overId: number) => {
    setData(prev => {
      const items = prev.imageList!
      const originalPos = getImageItemPos(activeId, items)
      const newPos = getImageItemPos(overId, items)
      const newList = arrayMove(items, originalPos, newPos)
      
      return {...prev, imageList: newList}
    })
  }
  const handleDeleteSelectedImage = (url: string) => {
    setData(prev => {return {...prev, imageList: prev.imageList!.filter(v => v !== url)}})
  }
  const handleKeydownForImage = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    if (nativeEvent.isComposing || !imageUrl) return 

    if (key === 'Enter') {
      // setData(prev => {
      //   const newId = !!prev.imageList.length 
      //     ? (Math.min(...prev.imageList.map(v => v)) < 0
      //         ? Math.min(...prev.imageList.map(menu => menu.id)) - 1
      //         : -1
      //       )
      //     : -1
      //   return {...prev, imageList: [...prev.imageList, {id: newId, name: imageUrl}]}
      // })
      setData(prev => {
        if (prev.imageList.some(url => url === imageUrl)) {
          alert('이미 등록된 이미지입니다.')
          return prev
        } else {
          return {...prev, imageList: [...prev.imageList, imageUrl]}
        }
      })
      setImageUrl('')
    }
  }

  const handleDragEnd = (event: any, callback: (activeId: number, overId: number)=>void) => {
    const { active, over } = event
    console.log(active, over)

    if (active.id === over.id) return
    callback(active.id, over.id)
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 }
  })
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  const handleIsApproved = (e: any) => {
    setData(prev => {return {...prev, isApproved: e.target.value === '1' ? true : false}})
  }


  const patchPlace = usePatchPlace()
  const handleGetData = (e: any) => {
    const placeId = data.id!
    patchPlace.mutate({ placeId, googlePlaceId: data.googlePlaceId! }, { 
      onSuccess(data, variables, context) {
        // console.log(data)
        if (data.status === 204) {
          alert('데이터 불러오기에 성공하였습니다.')
          queryClient.refetchQueries({queryKey: [placeDetailQueryKey(placeId)]})
        } else if (data.status === 500) alert('서버에 문제가 있습니다. 학준님께 문의해 주세요^^;;')
      },
      onError(error, variables, context) {
          console.log(error)
      },
    })
  }

  return (
    <div className={styles['form-section']}>
      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='이름' 
          value={data.name} 
          onChange={(v)=>handleChange('name', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='카테고리' 
          value={data.category ?? ''} 
          onChange={(v)=>handleChange('category', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='주소' 
          value={data.address ?? ''} 
          onChange={(v)=>handleChange('address', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='연락처' 
          value={data.contact ?? ''} 
          onChange={(v)=>handleChange('contact', v)} 
          style={{fontSize: '0.875rem'}} 
        />
      </div>
      
      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='위도' 
          value={data.position.latitude ?? ''} 
          onChange={(v)=>handlePosition('latitude', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='경도' 
          value={data.position.longitude ?? ''} 
          onChange={(v)=>handlePosition('longitude', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        {/* <Input 
          type='text' 
          name='대표 이미지' 
          value={data.mainImageUrl ?? ''} 
          onChange={(v)=>handleChange('mainImageUrl', v)} 
          style={{fontSize: '0.875rem'}} 
        /> */}
        <Input 
          type='text' 
          name='추가 정보' 
          value={data.additionalInfo ?? ''} 
          onChange={(v)=>handleChange('additionalInfo', v)} 
          style={{fontSize: '0.875rem'}} 
        />
      </div>

      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='일' 
          value={data.openingHour.openingHourSun ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourSun', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='월' 
          value={data.openingHour.openingHourMon ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourMon', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='화' 
          value={data.openingHour.openingHourTue ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourTue', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='수' 
          value={data.openingHour.openingHourWed ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourWed', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='목' 
          value={data.openingHour.openingHourThu ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourThu', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='금' 
          value={data.openingHour.openingHourFri ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourFri', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='토' 
          value={data.openingHour.openingHourSat ?? ''} 
          onChange={(v)=>handleOpeningHour('openingHourSat', v)} 
          style={{fontSize: '0.875rem'}} 
        />
      </div>

      <div className={styles['form-section-inputs-wrapper']}>
        <div className={styles['form-section-multi-select-box-wrapper']}>
          {!!subwayStationList?.data?.length && stationName &&
            <div className={styles['form-section-multi-select-box-option-list']}>
              {subwayStationList.data.map((v: SubwayStation) =>
                <div 
                  key={v.id} 
                  className={`
                    ${styles['form-section-multi-select-box-option']} 
                    ${data.subwayStationList.find(s => s.id === v.id) && styles['form-section-multi-select-box-option-active']}
                  `} 
                    onClick={()=>handleSubwayStation(v)}>
                  {v.stationName}
                </div>
              )}
            </div>
          }
          <Input 
            type='text' 
            name='지하철역' 
            value={stationName} 
            placeholder='지하철역명 검색'
            onChange={(v)=>setStationName(v)} 
            style={{fontSize: '0.875rem', width: '14rem'}} 
          />
          <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForStation)} collisionDetection={closestCorners}>
            {!!data.subwayStationList.length &&
              <div className={styles['form-section-multi-select-box-dnd-context']}>
                <SortableContext items={data.subwayStationList} strategy={verticalListSortingStrategy}>
                  {data.subwayStationList.map((v: SubwayStation, index: number) => 
                    <DndItem key={v.id} id={v.id} name={v.stationName} isMain={index === 0} handleDelete={handleDeleteSelectedStation} />
                  )}
                </SortableContext>
              </div>
            }
          </DndContext>
        </div>

        <div className={styles['form-section-multi-select-box-wrapper']}>
          <Input 
            type='text' 
            name='메뉴' 
            value={menuName} 
            placeholder='메뉴명 입력'
            onChange={(v)=>setMenuName(v)} 
            onKeyDown={handleKeydownForMenu}
            style={{fontSize: '0.875rem', width: '14rem'}} 
          />
          <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForMenu)} collisionDetection={closestCorners}>
            {!!data.menuList?.length &&
              <div className={styles['form-section-multi-select-box-dnd-context']}>
                <SortableContext items={data.menuList} strategy={verticalListSortingStrategy}>
                  {data.menuList?.map((v: Menu) => 
                    <DndItem key={v.id} id={v.id} name={v.name} handleDelete={handleDeleteSelectedMenu} />
                  )}
                </SortableContext>
              </div>
            }
          </DndContext>
        </div>

        <SelectBox.HiddenOption
          name="sort" 
          label='승인 여부'
          options={[{name: '승인', value: 1}, {name: '미승인', value: 2}]}
          selected={data.isApproved ? 1 : 2}
          onClick={(v)=>handleIsApproved(v)}
          style={{minWidth: '8rem', maxWidth: '8rem'}}
          styleLabel={{fontSize: '0.8rem'}} 
        ></SelectBox.HiddenOption>

        <div className={styles['form-section-textarea']}>
          <div className={styles['form-section-textarea-label']}>하고 싶은 말</div>
          <textarea readOnly id='registrantComment' name='registrantComment' value={data.registrantComment ?? ''} />
        </div>
      </div>

      <div className={styles['form-section-inputs-wrapper']}>
        <div className={styles['form-section-multi-select-box-wrapper']}>
          <Input 
            type='text' 
            name='이미지' 
            value={imageUrl} 
            placeholder='이미지 URL'
            onChange={(v)=>setImageUrl(v)} 
            onKeyDown={handleKeydownForImage}
            style={{fontSize: '0.875rem'}} 
          />
          <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForImage)} collisionDetection={closestCorners}>
            {!!data.imageList.length &&
              <div className={styles['form-section-multi-select-box-dnd-context-preview']}>
                <SortableContext items={data.imageList} strategy={horizontalListSortingStrategy}>
                  {data.imageList.map((url: string, index: number) => 
                    <DndImageItem key={url} id={url} url={url} isMain={index === 0} handleDelete={handleDeleteSelectedImage} />
                  )}
                </SortableContext>
              </div>
            }
          </DndContext>
        </div>
      </div>

      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='구글 장소 ID' 
          value={data.googlePlaceId} 
          onChange={(v)=>handleChange('googlePlaceId', v)} 
          style={{fontSize: '0.875rem'}} 
        />
        <Button type={data.googlePlaceId ? 'normal' : 'disabled'} onClick={handleGetData} style={{ alignSelf: 'flex-end', height: '40px' }}>데이터 불러오기</Button>
      </div>
    </div>
  )
}