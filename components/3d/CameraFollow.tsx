'use client'

import { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(0, 4, 8)
const LERP_FACTOR = 0.1

const _targetPosition = new THREE.Vector3()
const _lookAtPosition = new THREE.Vector3()

interface CameraFollowProps {
  target: RefObject<THREE.Mesh | null>
}

export function CameraFollow({ target }: CameraFollowProps) {
  const { camera } = useThree()

  useFrame(() => {
    if (!target.current) return

    _targetPosition.copy(target.current.position).add(OFFSET)
    camera.position.lerp(_targetPosition, LERP_FACTOR)

    _lookAtPosition.copy(target.current.position)
    camera.lookAt(_lookAtPosition)
  })

  return null
}
