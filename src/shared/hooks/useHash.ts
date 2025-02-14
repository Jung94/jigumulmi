import { useState, useEffect } from 'react'

export default function useHash() {
  const [hash, setHash] = useState<string>("")

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash.substring(1))
    }

    window.addEventListener("hashchange", updateHash)
    updateHash() // 초기 값 설정

    return () => {
      window.removeEventListener("hashchange", updateHash)
    }
  }, [])

  const setNewHash = (newHash: string) => {
    window.location.hash = newHash
  };

  return { hash, setNewHash }
}
