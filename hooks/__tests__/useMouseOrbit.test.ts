import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useMouseOrbit } from '../useMouseOrbit'

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

function moveMouseLocked(movementX: number, movementY: number) {
  document.dispatchEvent(
    Object.assign(new Event('mousemove'), { movementX, movementY }),
  )
}

afterEach(() => {
  unlockPointer()
})

describe('useMouseOrbit', () => {
  it('initializes with yaw 0 and pitch 1.1', () => {
    const { result } = renderHook(() => useMouseOrbit())
    expect(result.current.current.yaw).toBe(0)
    expect(result.current.current.pitch).toBe(1.1)
  })

  it('does not update when pointer is not locked', () => {
    const { result } = renderHook(() => useMouseOrbit())
    act(() => { moveMouseLocked(100, 100) })
    expect(result.current.current.yaw).toBe(0)
    expect(result.current.current.pitch).toBe(1.1)
  })

  it('updates yaw on horizontal mouse move when locked', () => {
    lockPointer()
    const { result } = renderHook(() => useMouseOrbit())
    act(() => { moveMouseLocked(100, 0) })
    expect(result.current.current.yaw).toBeLessThan(0)
  })

  it('updates pitch on vertical mouse move when locked', () => {
    lockPointer()
    const { result } = renderHook(() => useMouseOrbit())
    act(() => { moveMouseLocked(0, 100) })
    expect(result.current.current.pitch).toBeGreaterThan(1.1)
  })

  it('clamps pitch to minimum 0.2 on upward mouse move', () => {
    lockPointer()
    const { result } = renderHook(() => useMouseOrbit())
    act(() => { moveMouseLocked(0, -99999) })
    expect(result.current.current.pitch).toBe(0.2)
  })

  it('clamps pitch to maximum 1.4 on downward mouse move', () => {
    lockPointer()
    const { result } = renderHook(() => useMouseOrbit())
    act(() => { moveMouseLocked(0, 99999) })
    expect(result.current.current.pitch).toBe(1.4)
  })

  it('cleans up event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => useMouseOrbit())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function))
    removeSpy.mockRestore()
  })
})
