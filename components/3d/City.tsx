'use client'

// ── Building configs ──────────────────────────────────────────────────────────

const BUILDING_COLORS = ['#8a8a9a', '#7a7a8a', '#6a6a7a', '#9a9aaa'] as const

interface BuildingConfig {
  x: number
  z: number
  width: number
  depth: number
  height: number
  colorIndex: number
}

function generateBuildings(): BuildingConfig[] {
  let seed = 17
  const rand = () => {
    seed = Math.imul(seed, 1664525) + 1013904223
    return (seed >>> 0) / 0xffffffff
  }

  const buildings: BuildingConfig[] = []

  // 4 quadrants around origin, each with 4 buildings
  const quadrants: [number, number][] = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ]

  for (const [qx, qz] of quadrants) {
    for (let i = 0; i < 4; i++) {
      const offsetX = (rand() * 8 + 4) * qx
      const offsetZ = (rand() * 8 + 4) * qz
      buildings.push({
        x: offsetX,
        z: offsetZ,
        width: 1.5 + rand() * 1.5,
        depth: 1.5 + rand() * 1.5,
        height: 2 + rand() * 5,
        colorIndex: Math.floor(rand() * BUILDING_COLORS.length),
      })
    }
  }

  return buildings
}

const BUILDINGS = generateBuildings()

// ── Road configs ──────────────────────────────────────────────────────────────

const ROADS = [
  { x: 0, z: 0, w: 80, d: 3.2 },  // east-west main road
  { x: 0, z: 0, w: 3.2, d: 80 },  // north-south main road
]

// ── Components ────────────────────────────────────────────────────────────────

function Roads() {
  return (
    <>
      {ROADS.map((r, i) => (
        <mesh key={i} position={[r.x, 0.01, r.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[r.w, r.d]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.95} metalness={0} />
        </mesh>
      ))}
    </>
  )
}

function Buildings() {
  return (
    <>
      {BUILDINGS.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, b.height / 2, b.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[b.width, b.height, b.depth]} />
          <meshStandardMaterial
            color={BUILDING_COLORS[b.colorIndex]}
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
      ))}
    </>
  )
}

export function City() {
  return (
    <group>
      <Roads />
      <Buildings />
    </group>
  )
}
