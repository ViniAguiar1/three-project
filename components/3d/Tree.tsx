'use client'

const LEAF_COLORS = ['#2e6b28', '#3a7a1e', '#1d5c1d'] as const

interface TreeProps {
  position: [number, number, number]
  scale?: number
  variant?: number
}

export function Tree({ position, scale = 1, variant = 0 }: TreeProps) {
  const leafColor = LEAF_COLORS[variant % LEAF_COLORS.length]

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 1.5, 6]} />
        <meshStandardMaterial color="#4a2f14" roughness={0.95} metalness={0} />
      </mesh>

      {/* Leaves */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <sphereGeometry args={[1.1, 7, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}
