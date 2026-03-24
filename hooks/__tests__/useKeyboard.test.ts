import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useKeyboard } from '../useKeyboard'

describe('useKeyboard', () => {
  it('initializes with all keys false', () => {
    const { result } = renderHook(() => useKeyboard())
    expect(result.current.current).toEqual({
      forward: false,
      backward: false,
      left: false,
      right: false,
    })
  })

  it('sets forward true on KeyW down', () => {
    const { result } = renderHook(() => useKeyboard())
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))
    })
    expect(result.current.current.forward).toBe(true)
  })

  it('sets forward false on KeyW up', () => {
    const { result } = renderHook(() => useKeyboard())
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }))
    })
    expect(result.current.current.forward).toBe(false)
  })

  it('handles all WASD keys correctly', () => {
    const { result } = renderHook(() => useKeyboard())
    const keys = [
      { code: 'KeyW', field: 'forward' },
      { code: 'KeyS', field: 'backward' },
      { code: 'KeyA', field: 'left' },
      { code: 'KeyD', field: 'right' },
    ] as const

    for (const { code, field } of keys) {
      act(() => { window.dispatchEvent(new KeyboardEvent('keydown', { code })) })
      expect(result.current.current[field]).toBe(true)

      act(() => { window.dispatchEvent(new KeyboardEvent('keyup', { code })) })
      expect(result.current.current[field]).toBe(false)
    }
  })

  it('ignores unknown keys', () => {
    const { result } = renderHook(() => useKeyboard())
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))
    })
    expect(result.current.current).toEqual({
      forward: false,
      backward: false,
      left: false,
      right: false,
    })
  })

  it('cleans up event listeners on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useKeyboard())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('keyup', expect.any(Function))
    removeSpy.mockRestore()
  })
})
