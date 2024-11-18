"use client"

import { useRef, useState, useEffect } from 'react'
import ImagePreview from '@/components/image-preview'

type Options = {
  disabledBackdropClosing?: boolean
  disabledEscKey?: boolean
  style?: any
}

export default function useImagePreview (
  pathList: any[],
  { disabledBackdropClosing, disabledEscKey, style }: Options={}
) {
  const imagePreviewRef = useRef<HTMLDialogElement | null>(null)
  const [startIndex, setStartIndex] = useState(0)

  const open = (startIndex: number) => {
    setStartIndex(startIndex)
    imagePreviewRef.current?.showModal()
  }

  const close = () => {
    imagePreviewRef.current?.close()
  }

  const create = () => <ImagePreview ref={imagePreviewRef} handleClose={close} startIndex={startIndex} pathList={pathList} style={style} />

  useEffect(()=>{
    imagePreviewRef.current?.addEventListener("click", (e: any) => {
      if (!!(imagePreviewRef.current === e.target) && !disabledBackdropClosing) close()
    });

    if (disabledEscKey) {
      imagePreviewRef.current?.addEventListener('cancel', (event) => {
        event.preventDefault()
      })
    }
  }, [])

  return { create, open, close }
}
