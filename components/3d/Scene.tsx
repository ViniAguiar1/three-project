'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { Player } from './Player'
import { CameraFollow } from './CameraFollow'
import { Environment } from './Environment'
import { useMouseOrbit } from '@/hooks/useMouseOrbit'

export function Scene() {
  const playerRef = useRef<THREE.Group>(null)
  const orbit = useMouseOrbit()

  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 50, 150]} />

      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#b0d8f0', '#4a7c3f', 1.0]} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={120}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Environment />
      <Player meshRef={playerRef} />
      <CameraFollow target={playerRef} orbit={orbit} />
    </>
  )
}
