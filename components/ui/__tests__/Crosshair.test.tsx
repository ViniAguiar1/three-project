import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { Crosshair } from '../Crosshair'

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

describe('Crosshair', () => {
  it('renders nothing when pointer is not locked', () => {
    const { container } = render(<Crosshair />)
    expect(container.firstChild).toBeNull()
  })

  it('renders crosshair when pointer is locked', () => {
    const { container } = render(<Crosshair />)
    act(() => {
      lockPointer()
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    expect(container.firstChild).not.toBeNull()
  })

  it('has pointer-events-none to not block interaction', () => {
    const { container } = render(<Crosshair />)
    act(() => {
      lockPointer()
      document.dispatchEvent(new Event('pointerlockchange'))
    })
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('pointer-events-none')
  })
})
