'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { Player } from './Player'
import { CameraFollow } from './CameraFollow'

export function Scene() {
  const playerRef = useRef<THREE.Mesh>(null)

  return (
    <>
      {/* Sky background */}
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 40, 120]} />

      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <hemisphereLight args={['#87CEEB', '#4a7c59', 0.8]} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

      <Player meshRef={playerRef} />
      <CameraFollow target={playerRef} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5a8a5a" />
      </mesh>
    </>
  )
}
