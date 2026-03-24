import { useEffect, useState } from 'react'

export function usePointerLock(): boolean {
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const onChange = () => setIsLocked(!!document.pointerLockElement)
    const onRelease = () => setIsLocked(false)

    document.addEventListener('pointerlockchange', onChange)
    document.addEventListener('visibilitychange', onRelease)
    window.addEventListener('blur', onRelease)

    return () => {
      document.removeEventListener('pointerlockchange', onChange)
      document.removeEventListener('visibilitychange', onRelease)
      window.removeEventListener('blur', onRelease)
    }
  }, [])

  return isLocked
}
