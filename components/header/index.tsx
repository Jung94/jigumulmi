"use client"

import HeaderPC from './pc'
import HeaderMobile from './mobile'
import { useWindowSize } from '@/lib/hooks'

const Header = () => {
  const windowSize = useWindowSize()

  return (
    <>
      {1100 < windowSize.width &&
        <HeaderPC />
      }
      {windowSize.width <= 1100 &&
        <HeaderMobile />
      }
    </>
  )
}

export default Header