import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { usePointerLock } from '../usePointerLock'

function lockPointer() {
  Object.defineProperty(document, 'pointerLockElement', {
    value: document.documentElement,
    configurable: true,
  })
}

function unlockPointer() {
  Object.defineProperty(document, 'pointerLockElement', {
    value: null,
    configurable: true,
  })
}

afterEach(() => {
  unlockPointer()
})

describe('usePointerLock', () => {
  it('initializes as false', () => {
    const { result } = renderHook(() => usePointerLock())
    expect(result.current).toBe(false)
  })

  it('returns true when pointer lock is acquired', () => {
    const { result } = renderHook(() => usePointerLock())
    act(() => {
      lockPointer()
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(result.current).toBe(true)
  })

  it('returns false when pointer lock is released', () => {
    lockPointer()
    const { result } = renderHook(() => usePointerLock())
    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(result.current).toBe(true)

    act(() => {
      unlockPointer()
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(result.current).toBe(false)
  })

  it('cleans up event listener on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => usePointerLock())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('pointerlockchange', expect.any(Function))
    removeSpy.mockRestore()
  })
})
