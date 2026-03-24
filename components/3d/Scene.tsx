'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { Player } from './Player'
import { CameraFollow } from './CameraFollow'
import { Environment } from './Environment'
import { useMouseOrbit } from '@/hooks/useMouseOrbit'

export function Scene() {
  const playerRef = useRef<THREE.Mesh>(null)
  const orbit = useMouseOrbit()

  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 50, 150]} />

      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#87CEEB', '#4a7c59', 0.8]} />
      <directionalLight position={[30, 50, 20]} intensity={1.8} castShadow />

      <Environment />
      <Player meshRef={playerRef} />
      <CameraFollow target={playerRef} orbit={orbit} />
    </>
  )
}
