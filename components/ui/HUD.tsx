'use client'

import { useEffect, useState } from 'react'
import { usePointerLock } from '@/hooks/usePointerLock'

const KEY_MAP: Record<string, keyof KeyState> = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
}

interface KeyState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

function Key({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold border transition-colors duration-75 ${
        active
          ? 'bg-white/40 border-white/70 text-white'
          : 'bg-white/10 border-white/25 text-white/70'
      }`}
    >
      {label}
    </div>
  )
}

export function HUD() {
  const isLocked = usePointerLock()
  const [keys, setKeys] = useState<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code]
      if (action) setKeys((prev) => ({ ...prev, [action]: true }))
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code]
      if (action) setKeys((prev) => ({ ...prev, [action]: false }))
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <div className="absolute bottom-6 left-6 text-white font-mono select-none pointer-events-none">
      <div className="bg-black/35 rounded-lg px-4 py-3">
        <div
          className="grid gap-1 mb-2"
          style={{ gridTemplateColumns: 'repeat(3, 28px)' }}
        >
          <span />
          <Key label="W" active={keys.forward} />
          <span />
          <Key label="A" active={keys.left} />
          <Key label="S" active={keys.backward} />
          <Key label="D" active={keys.right} />
        </div>
        <div className="text-white/60 text-xs">Move</div>
        <div className="text-white/35 text-[10px] mt-1">
          {isLocked ? 'Mouse to orbit · ESC to release' : 'Click to play'}
        </div>
      </div>
    </div>
  )
}
