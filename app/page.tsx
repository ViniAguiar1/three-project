'use client'

import { Canvas } from '@react-three/fiber'
import { Scene } from '@/components/3d/Scene'

export default function Home() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', display: 'block' }}
      camera={{ position: [0, 5, 10], fov: 60 }}
    >
      <Scene />
    </Canvas>
  )
}