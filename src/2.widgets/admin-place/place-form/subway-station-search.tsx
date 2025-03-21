'use client'

import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import XMarkIcon from '@/public/icons/XMark'
import styles from './place-form.module.scss'
import { Input } from '@/src/shared/ui/admin'
import { useFetchSubwayList } from '@/src/4.entities/place/model/queries'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { DndContext, closestCorners, useSensor, useSensors, MouseSensor, KeyboardSensor } from '@dnd-kit/core'
import type { SubwayStation } from '@/src/4.entities/place-admin/model/types'

const DndItem = ({ id, name, isMain, handleDelete}: { id: number, name: string, isMain?: boolean, handleDelete: (id: number)=>void}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transition, transform: CSS.Transform.toString(transform)}

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles['subway-station-tag']}
    >
      <div className={styles['subway-station-tag-name']}>
        {name}
        {isMain && 
          <span className={styles['subway-station-tag-main']}>main</span>
        }
      </div>
      <button className={styles['subway-station-tag-x-mark']} onClick={()=>handleDelete(id)}>
        <XMarkIcon size='16px' />
      </button>
    </div>
  )
}

export default function SubwayStationSearch({
  subwayStationList,
  handleSubwayStationListChange = () => {}
}: {
  subwayStationList: SubwayStation[]
  handleSubwayStationListChange: (subwayStationList: SubwayStation[]) => void
}) {
  const [subwayStationName, setSubwayStationName] = useState<string>('')

  const handleSubwayStationName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSubwayStationName(value)
  }

  const handleSubwayStationKeyDown = (e: KeyboardEvent<Element>) => {
    if (e.code === 'Enter') e.preventDefault()
  }

  const { data: searchedSubwayStationList } = useFetchSubwayList({ stationName: subwayStationName })

  const handleSubwayStationClick = (station: SubwayStation) => {
    let newSubwayStationList = [] as SubwayStation[]
    const hasStation = subwayStationList.some(v => v.id === station.id)
    
    if (hasStation) {
      newSubwayStationList = [...subwayStationList.filter(v => v.id !== station.id)]
    } else {
      newSubwayStationList = [...subwayStationList, station]
    }

    setSubwayStationName('')
    handleSubwayStationListChange(newSubwayStationList)
  }

  const handleDeleteSelectedStation = (stationId: number) => {
    const newSubwayStationList = subwayStationList.filter(v => v.id !== stationId)
    handleSubwayStationListChange(newSubwayStationList)
  }

  const getItemPos = (id: any, items: any[]) => items.findIndex(item => item.id === id)

  const handleDragEndForStation = (activeId: number, overId: number) => {
    const originalPos = getItemPos(activeId, subwayStationList)
    const newPos = getItemPos(overId, subwayStationList)
    const newSubwayStationList = arrayMove(subwayStationList, originalPos, newPos)
    handleSubwayStationListChange(newSubwayStationList)
  }

  const handleDragEnd = (event: any, callback: (activeId: number, overId: number)=>void) => {
    const { active, over } = event

    if (active.id === over.id) return
    callback(active.id, over.id)
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 }
  })

  const keyboardSensor = useSensor(KeyboardSensor)
  
  const sensors = useSensors(mouseSensor, keyboardSensor)

  return (
    <div className={styles['subway-station']}>
      {!!searchedSubwayStationList?.length && subwayStationName &&
        <div className={styles['subway-station-option-list']}>
          {searchedSubwayStationList.map((v: SubwayStation) =>
            <div 
              key={v.id} 
              className={`
                ${styles['subway-station-option']} 
                ${subwayStationList.find(s => s.id === v.id) && styles['subway-station-option-active']}
              `} 
              onClick={() => handleSubwayStationClick(v)}
            >
              {v.stationName}
            </div>
          )}
        </div>
      }
      <Input 
        type='text' 
        name='지하철역' 
        value={subwayStationName} 
        placeholder='지하철역 입력'
        onChange={handleSubwayStationName} 
        onKeyDown={handleSubwayStationKeyDown}
        style={{ fontSize: '0.875rem' }} 
      />
      <DndContext sensors={sensors} onDragEnd={e => handleDragEnd(e, handleDragEndForStation)} collisionDetection={closestCorners}>
        <div className={styles[`subway-station-dnd-context${!!subwayStationList.length ? '' : '-empty'}`]}>
          <SortableContext items={subwayStationList} strategy={verticalListSortingStrategy}>
            {subwayStationList.map((v: SubwayStation, index: number) => 
              <DndItem key={v.id} id={v.id} name={v.stationName} isMain={index === 0} handleDelete={handleDeleteSelectedStation} />
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  )
}