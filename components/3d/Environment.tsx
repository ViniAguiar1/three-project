'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Tree } from './Tree'

// ── Procedural ground noise ──────────────────────────────────────────────────

function hash(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const ux = fx * fx * (3 - 2 * fx)
  const uz = fz * fz * (3 - 2 * fz)
  return (
    hash(ix, iz) * (1 - ux) * (1 - uz) +
    hash(ix + 1, iz) * ux * (1 - uz) +
    hash(ix, iz + 1) * (1 - ux) * uz +
    hash(ix + 1, iz + 1) * ux * uz
  )
}

function buildGroundGeometry(): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(400, 400, 60, 60)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) * 0.04
    const z = pos.getY(i) * 0.04
    // Two octaves of value noise for subtle patch variation
    const n =
      valueNoise(x, z) * 0.65 +
      valueNoise(x * 3.2 + 7.3, z * 3.2 + 13.7) * 0.35

    colors[i * 3] = 0.29 + n * 0.09      // R
    colors[i * 3 + 1] = 0.52 + n * 0.15  // G
    colors[i * 3 + 2] = 0.21 + n * 0.06  // B
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geo
}

// ── Tree placement ───────────────────────────────────────────────────────────

const TREE_COUNT = 50
const SPREAD = 180
const MIN_DIST_FROM_CENTER = 8

interface TreeData {
  position: [number, number, number]
  scale: number
  variant: number
}

function generateTrees(): TreeData[] {
  let seed = 42
  const rand = () => {
    seed = Math.imul(seed, 1664525) + 1013904223
    return (seed >>> 0) / 0xffffffff
  }

  const trees: TreeData[] = []
  while (trees.length < TREE_COUNT) {
    const x = (rand() - 0.5) * SPREAD
    const z = (rand() - 0.5) * SPREAD
    if (Math.sqrt(x * x + z * z) < MIN_DIST_FROM_CENTER) continue
    trees.push({
      position: [x, 0, z],
      scale: 0.7 + rand() * 0.65,
      variant: Math.floor(rand() * 3),
    })
  }
  return trees
}

const TREES = generateTrees()

// ── Components ───────────────────────────────────────────────────────────────

function Ground() {
  const geo = useMemo(() => buildGroundGeometry(), [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow geometry={geo}>
      <meshStandardMaterial vertexColors roughness={0.95} metalness={0} />
    </mesh>
  )
}

export function Environment() {
  return (
    <group>
      <Ground />
      {TREES.map((tree, i) => (
        <Tree
          key={i}
          position={tree.position}
          scale={tree.scale}
          variant={tree.variant}
        />
      ))}
    </group>
  )
}
