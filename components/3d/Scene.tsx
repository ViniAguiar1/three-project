'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { Player } from './Player'
import { CameraFollow } from './CameraFollow'
import { Environment } from './Environment'
import { NPCSystem } from './NPCSystem'
import { useMouseOrbit } from '@/hooks/useMouseOrbit'

export function Scene() {
  const playerRef = useRef<THREE.Group>(null)
  const orbit = useMouseOrbit()

  return (
    <>
      {/* Atmosphere */}
      <color attach="background" args={['#a8d4e8']} />
      <fog attach="fog" args={['#a8d4e8', 45, 160]} />

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#c0dff5', '#4a7c3f', 1.1]} />
      <directionalLight
        position={[40, 60, 25]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={180}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.0005}
      />

      <Environment />
      <Player meshRef={playerRef} orbit={orbit} />
      <NPCSystem playerRef={playerRef} />
      <CameraFollow target={playerRef} orbit={orbit} />
    </>
  )
}
