'use client'

import { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from '@/hooks/useKeyboard'

const SPEED = 5
const ROTATION_LERP = 0.15

const _direction = new THREE.Vector3()
const _targetQuaternion = new THREE.Quaternion()
const _upAxis = new THREE.Vector3(0, 1, 0)

interface PlayerProps {
  meshRef: RefObject<THREE.Group | null>
}

export function Player({ meshRef }: PlayerProps) {
  const keys = useKeyboard()

  useFrame((_, delta) => {
    if (!meshRef.current) return

    _direction.set(0, 0, 0)

    if (keys.current.forward) _direction.z -= 1
    if (keys.current.backward) _direction.z += 1
    if (keys.current.left) _direction.x -= 1
    if (keys.current.right) _direction.x += 1

    if (_direction.lengthSq() > 0) {
      const angle = Math.atan2(_direction.x, _direction.z)
      _targetQuaternion.setFromAxisAngle(_upAxis, angle)
      meshRef.current.quaternion.slerp(_targetQuaternion, ROTATION_LERP)

      _direction.normalize().multiplyScalar(SPEED * delta)
      meshRef.current.position.add(_direction)
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.7, 1.1, 0.45]} />
        <meshStandardMaterial
          color="#2c4a8a"
          roughness={0.75}
          metalness={0.05}
          emissive="#1a2d5a"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial
          color="#e8c09a"
          roughness={0.85}
          metalness={0}
        />
      </mesh>
    </group>
  )
}
