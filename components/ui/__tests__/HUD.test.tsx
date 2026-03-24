import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HUD } from '../HUD'

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
})
