"use client"

import React from 'react'
import Image from 'next/image'
import { forwardRef } from 'react'
import styles from './image-preview.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import { PrevButton, NextButton, usePrevNextButtons } from './arrow-buttons'

type ImagePreviewProps = {
  handleClose: () => void
  startIndex: number
  pathList: any[]
  style?: any
}

const ImagePreview = forwardRef<HTMLDialogElement, ImagePreviewProps>((function ImagePreview(props, ref) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, startIndex: props.startIndex })
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <dialog ref={ref} className={styles['image-preview']} style={props.style}>
      <button type='button' className={styles['image-preview-close']} onClick={() => props.handleClose()}>
        <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      <div ref={emblaRef} className={styles['image-preview-carousel']}>
        <div className={styles['image-preview-carousel-container']}>
          {props.pathList.map(slide => {
            return (
              <div key={slide.id} className={styles['image-preview-carousel-content']}>
                <Image 
                  fill
                  src={process.env.NEXT_PUBLIC_CDN + slide.s3Key}
                  alt='리뷰 이미지'
                  className={styles['image-preview-carousel-content-image']}
                />
              </div>
            )
          })}
        </div>
      </div>
    </dialog>
  )
}))

export default React.memo(ImagePreview)