import React from 'react'
import Image from 'next/image'
import styles from './carousel.module.scss'
import { DotButton, useDotButton } from './dot-button'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './arrow-buttons'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: string[]
  placeId: number
}

const Carousel = (props: PropType) => {
  const { slides, placeId } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  React.useEffect(() => {
    if (emblaApi && placeId) {
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, placeId]);

  return (
    <section className={styles['embla']}>
      <div className={styles['embla__viewport']} ref={emblaRef}>
        <div className={styles['embla__container']}>
          {slides.map((slide: string, index: number) => {
            return (
              <div key={slide + index} className={styles['embla__slide']}>
                <Image fill src={slide} alt='이미지 캐러셀' style={{objectFit: 'cover'}} />
              </div>
            )
          })}
        </div>
      </div>

      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      <div className={styles['embla__dots']}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`${styles['embla__dot']}`.concat(
              index === selectedIndex ? ` ${styles['embla__dot-selected']}` : ''
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel
