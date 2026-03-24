'use client'

import { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from '@/hooks/useKeyboard'
import { OrbitState } from '@/hooks/useMouseOrbit'

const SPEED = 5
const ROTATION_LERP = 0.15

const _direction = new THREE.Vector3()
const _targetQuaternion = new THREE.Quaternion()
const _upAxis = new THREE.Vector3(0, 1, 0)
const _euler = new THREE.Euler(0, 0, 0, 'YXZ')

interface PlayerProps {
  meshRef: RefObject<THREE.Group | null>
  orbit: RefObject<OrbitState>
}

export function Player({ meshRef, orbit }: PlayerProps) {
  const keys = useKeyboard()

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return

    _direction.set(0, 0, 0)
    if (keys.current.forward) _direction.z -= 1
    if (keys.current.backward) _direction.z += 1
    if (keys.current.left) _direction.x -= 1
    if (keys.current.right) _direction.x += 1

    const isMoving = _direction.lengthSq() > 0

    if (isMoving) {
      _euler.set(0, orbit.current.yaw, 0)
      _direction.applyEuler(_euler)

      const angle = Math.atan2(_direction.x, _direction.z)
      _targetQuaternion.setFromAxisAngle(_upAxis, angle)
      meshRef.current.quaternion.slerp(_targetQuaternion, ROTATION_LERP)

      _direction.normalize().multiplyScalar(SPEED * delta)
      meshRef.current.position.add(_direction)
    }

    // Idle breathing / walk bob — overrides Y every frame
    const t = clock.elapsedTime
    meshRef.current.position.y = isMoving
      ? Math.sin(t * 10) * 0.04
      : Math.sin(t * 1.5) * 0.015
  })

  return (
    <group ref={meshRef}>
      {/* Legs */}
      <mesh position={[-0.19, 0.28, 0]} castShadow>
        <boxGeometry args={[0.22, 0.55, 0.24]} />
        <meshStandardMaterial color="#1c2a3e" roughness={0.82} metalness={0} />
      </mesh>
      <mesh position={[0.19, 0.28, 0]} castShadow>
        <boxGeometry args={[0.22, 0.55, 0.24]} />
        <meshStandardMaterial color="#1c2a3e" roughness={0.82} metalness={0} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.68, 0.75, 0.42]} />
        <meshStandardMaterial
          color="#2c4a8a"
          roughness={0.75}
          metalness={0.05}
          emissive="#1a2d5a"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.47, 0.88, 0]} castShadow>
        <boxGeometry args={[0.2, 0.62, 0.2]} />
        <meshStandardMaterial color="#243d78" roughness={0.78} metalness={0.04} />
      </mesh>
      <mesh position={[0.47, 0.88, 0]} castShadow>
        <boxGeometry args={[0.2, 0.62, 0.2]} />
        <meshStandardMaterial color="#243d78" roughness={0.78} metalness={0.04} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.52, 0]} castShadow>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#e8c09a" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  )
}
