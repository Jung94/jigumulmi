'use client'

import { useState, useEffect } from 'react'
import { useIsSSR } from '@/src/shared/hooks'

const useWindowSize = () => {
  const isSSR = useIsSSR()
  const [ windowSize, setWindowSize ] = useState<{
    width: number
    height: number
  }>({
    width: isSSR ? 0 : window.innerWidth,
    height: isSSR ? 0 : window.innerHeight
  })

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    
    return () => {
      window.removeEventListener("resize", updateWindowSize)
    }
  }, [])

  return windowSize
}

export default useWindowSize