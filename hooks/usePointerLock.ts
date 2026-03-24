import { useEffect, useState } from 'react'

export function usePointerLock(): boolean {
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const onChange = () => setIsLocked(!!document.pointerLockElement)
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  return isLocked
}
