import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { HUD } from '../HUD'

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

describe('HUD', () => {
  it('renders without crashing', () => {
    render(<HUD />)
  })

  it('displays all WASD keys', () => {
    render(<HUD />)
    expect(screen.getByText('W')).toBeDefined()
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('S')).toBeDefined()
    expect(screen.getByText('D')).toBeDefined()
  })

  it('displays move label', () => {
    render(<HUD />)
    expect(screen.getByText('Move')).toBeDefined()
  })

  it('shows "Click to play" hint when pointer is not locked', () => {
    render(<HUD />)
    expect(screen.getByText('Click to play')).toBeDefined()
  })

  it('shows orbit hint when pointer is locked', () => {
    render(<HUD />)
    act(() => {
      lockPointer()
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(screen.getByText('Mouse to orbit · ESC to release')).toBeDefined()
  })

  it('activates W key on KeyW down and deactivates on up', () => {
    render(<HUD />)
    const key = screen.getByText('W')

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))
    })
    expect(key.className).toContain('bg-white/40')

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }))
    })
    expect(key.className).toContain('bg-white/10')
  })

  it('ignores unknown keys', () => {
    render(<HUD />)
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))
    })
    expect(screen.getByText('W')).toBeDefined()
  })
})
