'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface NPCConfig {
  id: number
  startX: number
  startZ: number
  pathType: 'linear' | 'circular'
  // linear: oscillates along axis
  axis?: 'x' | 'z'
  amplitude?: number
  speed?: number
  // circular
  radius?: number
  phaseOffset?: number
}

interface NPCProps {
  config: NPCConfig
  playerRef: React.RefObject<THREE.Group | null>
}

const PROXIMITY_THRESHOLD = 4
const DEFAULT_BODY_COLOR = new THREE.Color('#c47a2e')
const HIGHLIGHT_COLOR = new THREE.Color('#ff9944')

const _playerPos = new THREE.Vector3()
const _npcPos = new THREE.Vector3()

export function NPC({ config, playerRef }: NPCProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(null)

  const {
    startX,
    startZ,
    pathType,
    axis = 'x',
    amplitude = 5,
    speed = 1,
    radius = 5,
    phaseOffset = 0,
  } = config

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime * speed + phaseOffset

    let x = startX
    let z = startZ

    if (pathType === 'linear') {
      if (axis === 'x') x = startX + Math.sin(t) * amplitude
      else z = startZ + Math.sin(t) * amplitude
    } else {
      x = startX + Math.cos(t) * radius
      z = startZ + Math.sin(t) * radius
    }

    // Rotation to face movement direction
    const prevX = groupRef.current.position.x
    const prevZ = groupRef.current.position.z
    const dx = x - prevX
    const dz = z - prevZ
    if (dx * dx + dz * dz > 0.00001) {
      groupRef.current.rotation.y = Math.atan2(dx, dz)
    }

    groupRef.current.position.set(x, 0, z)

    // Proximity highlight — mutate color directly, no re-render
    if (bodyMatRef.current && playerRef.current) {
      playerRef.current.getWorldPosition(_playerPos)
      groupRef.current.getWorldPosition(_npcPos)
      const dist = _playerPos.distanceTo(_npcPos)
      bodyMatRef.current.color.lerpColors(
        DEFAULT_BODY_COLOR,
        HIGHLIGHT_COLOR,
        dist < PROXIMITY_THRESHOLD ? 1 - dist / PROXIMITY_THRESHOLD : 0
      )
    }
  })

  return (
    <group ref={groupRef} position={[startX, 0, startZ]}>
      {/* Legs */}
      <mesh position={[-0.1, 0.22, 0]} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0.1, 0.22, 0]} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.85} metalness={0} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.42, 0.52, 0.28]} />
        <meshStandardMaterial
          ref={bodyMatRef}
          color={DEFAULT_BODY_COLOR.getStyle()}
          roughness={0.78}
          metalness={0}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#e8c09a" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  )
}
