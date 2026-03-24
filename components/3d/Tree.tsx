'use client'

const ROUND_COLORS = ['#2e6b28', '#3a7a1e'] as const

interface TreeProps {
  position: [number, number, number]
  scale?: number
  variant?: number
}

export function Tree({ position, scale = 1, variant = 0 }: TreeProps) {
  // Variant 2 — pine / conifer
  if (variant === 2) {
    return (
      <group position={position} scale={scale}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.22, 1.5, 6]} />
          <meshStandardMaterial color="#3d2008" roughness={0.95} metalness={0} />
        </mesh>
        <mesh position={[0, 2.1, 0]} castShadow>
          <coneGeometry args={[1.2, 2.2, 7]} />
          <meshStandardMaterial color="#1a4d1a" roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <coneGeometry args={[0.75, 1.6, 7]} />
          <meshStandardMaterial color="#1e5a1e" roughness={0.85} metalness={0} />
        </mesh>
      </group>
    )
  }

  // Variant 0 — simple round | Variant 1 — layered round
  const leafColor = ROUND_COLORS[variant % ROUND_COLORS.length]

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 1.5, 6]} />
        <meshStandardMaterial color="#4a2f14" roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[0, 2.4, 0]} castShadow>
        <sphereGeometry args={[1.1, 7, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.9} metalness={0} />
      </mesh>
      {variant === 1 && (
        <mesh position={[0, 3.2, 0]} castShadow>
          <sphereGeometry args={[0.6, 6, 6]} />
          <meshStandardMaterial color="#2a6020" roughness={0.9} metalness={0} />
        </mesh>
      )}
    </group>
  )
}
