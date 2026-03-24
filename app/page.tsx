'use client'

import { Canvas } from '@react-three/fiber'
import { Scene } from '@/components/3d/Scene'
import { HUD } from '@/components/ui/HUD'

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 5, 10], fov: 60 }}
      >
        <Scene />
      </Canvas>
      <HUD />
    </div>
  )
}
