'use client'

import { useState, useEffect } from 'react'

const useIsSSR = () => {
  const [ isSSR, setIsSSR ] = useState(true)

  useEffect(()=>{
    setIsSSR(false)
  }, [])

  return isSSR
}

export default useIsSSR