import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { StartScreen } from '../StartScreen'

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

describe('StartScreen', () => {
  it('renders "Click to Play" when pointer is not locked', () => {
    render(<StartScreen />)
    expect(screen.getByText('Click to Play')).toBeDefined()
  })

  it('renders title and subtitle', () => {
    render(<StartScreen />)
    expect(screen.getByText('World')).toBeDefined()
    expect(screen.getByText('3D Exploration')).toBeDefined()
  })

  it('shows content initially before any interaction', () => {
    render(<StartScreen />)
    expect(screen.getByText('Click to Play')).toBeDefined()
    expect(screen.getByText('World')).toBeDefined()
  })
})
