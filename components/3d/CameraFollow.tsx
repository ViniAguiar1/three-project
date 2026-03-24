'use client'

import { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitState } from '@/hooks/useMouseOrbit'

const RADIUS = 9
const LERP_FACTOR = 0.08

const _spherical = new THREE.Spherical()
const _targetPosition = new THREE.Vector3()
const _lookAtPosition = new THREE.Vector3()

interface CameraFollowProps {
  target: RefObject<THREE.Group | null>
  orbit: RefObject<OrbitState>
}

export function CameraFollow({ target, orbit }: CameraFollowProps) {
  const { camera } = useThree()

  useFrame(() => {
    if (!target.current) return

    _spherical.set(RADIUS, orbit.current.pitch, orbit.current.yaw)
    _spherical.makeSafe()

    _targetPosition.setFromSpherical(_spherical).add(target.current.position)
    camera.position.lerp(_targetPosition, LERP_FACTOR)

    _lookAtPosition.copy(target.current.position)
    camera.lookAt(_lookAtPosition)
  })

  return null
}
