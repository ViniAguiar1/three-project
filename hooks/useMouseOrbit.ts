import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.003
const PITCH_MIN = 0.2
const PITCH_MAX = 1.4

export interface OrbitState {
  yaw: number
  pitch: number
}

export function useMouseOrbit() {
  const orbit = useRef<OrbitState>({ yaw: 0, pitch: 1.1 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!document.pointerLockElement) return
      orbit.current.yaw -= e.movementX * SENSITIVITY
      orbit.current.pitch = Math.max(
        PITCH_MIN,
        Math.min(PITCH_MAX, orbit.current.pitch + e.movementY * SENSITIVITY),
      )
    }

    const onClick = () => {
      document.documentElement.requestPointerLock()
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return orbit
}
