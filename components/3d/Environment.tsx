'use client'

import { Tree } from './Tree'

const TREE_COUNT = 50
const SPREAD = 180
const MIN_DIST_FROM_CENTER = 8

interface TreeData {
  position: [number, number, number]
  scale: number
}

// Deterministic LCG — computed once at module level, no re-renders
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
    trees.push({ position: [x, 0, z], scale: 0.7 + rand() * 0.6 })
  }
  return trees
}

const TREES = generateTrees()

export function Environment() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#5a8a5a" />
      </mesh>

      {/* Trees */}
      {TREES.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale} />
      ))}
    </group>
  )
}
