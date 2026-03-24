'use client'

interface TreeProps {
  position: [number, number, number]
  scale?: number
}

export function Tree({ position, scale = 1 }: TreeProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.5, 6]} />
        <meshStandardMaterial color="#5c3d1e" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 2.4, 0]}>
        <sphereGeometry args={[1.1, 7, 7]} />
        <meshStandardMaterial color="#2d6a2d" />
      </mesh>
    </group>
  )
}
