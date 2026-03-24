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

  it('returns false on visibilitychange (tab switch)', () => {
    lockPointer()
    const { result } = renderHook(() => usePointerLock())
    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(result.current).toBe(true)

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(result.current).toBe(false)
  })

  it('returns false on window blur (alt+tab or focus lost)', () => {
    lockPointer()
    const { result } = renderHook(() => usePointerLock())
    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(new Event('blur'))
    })
    expect(result.current).toBe(false)
  })

  it('cleans up all event listeners on unmount', () => {
    const docSpy = vi.spyOn(document, 'removeEventListener')
    const winSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => usePointerLock())
    unmount()
    expect(docSpy).toHaveBeenCalledWith('pointerlockchange', expect.any(Function))
    expect(docSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
    expect(winSpy).toHaveBeenCalledWith('blur', expect.any(Function))
    docSpy.mockRestore()
    winSpy.mockRestore()
  })
})
