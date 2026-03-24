'use client'

import { usePointerLock } from '@/hooks/usePointerLock'

export function Crosshair() {
  const isLocked = usePointerLock()
  if (!isLocked) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-5 h-5">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/70 -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/70 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white/90 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
