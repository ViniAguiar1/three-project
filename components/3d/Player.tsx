'use client'

import { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from '@/hooks/useKeyboard'

const SPEED = 5

interface PlayerProps {
  meshRef: RefObject<THREE.Mesh | null>
}

export function Player({ meshRef }: PlayerProps) {
  const keys = useKeyboard()

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const direction = new THREE.Vector3()

    if (keys.current.forward) direction.z -= 1
    if (keys.current.backward) direction.z += 1
    if (keys.current.left) direction.x -= 1
    if (keys.current.right) direction.x += 1

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(SPEED * delta)
      meshRef.current.position.add(direction)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b35" emissive="#ff3300" emissiveIntensity={0.2} />
    </mesh>
  )
}
