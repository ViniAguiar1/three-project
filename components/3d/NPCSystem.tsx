'use client'

import * as THREE from 'three'
import { NPC, NPCConfig } from './NPC'

interface NPCSystemProps {
  playerRef: React.RefObject<THREE.Group | null>
}

const NPC_CONFIGS: NPCConfig[] = [
  {
    id: 0,
    startX: 0,
    startZ: 8,
    pathType: 'linear',
    axis: 'x',
    amplitude: 12,
    speed: 0.6,
    phaseOffset: 0,
  },
  {
    id: 1,
    startX: 0,
    startZ: -8,
    pathType: 'linear',
    axis: 'x',
    amplitude: 10,
    speed: 0.9,
    phaseOffset: Math.PI,
  },
  {
    id: 2,
    startX: 0,
    startZ: 0,
    pathType: 'circular',
    radius: 14,
    speed: 0.35,
    phaseOffset: Math.PI / 2,
  },
  {
    id: 3,
    startX: 10,
    startZ: 0,
    pathType: 'linear',
    axis: 'z',
    amplitude: 9,
    speed: 0.7,
    phaseOffset: Math.PI / 4,
  },
]

export function NPCSystem({ playerRef }: NPCSystemProps) {
  return (
    <>
      {NPC_CONFIGS.map((cfg) => (
        <NPC key={cfg.id} config={cfg} playerRef={playerRef} />
      ))}
    </>
  )
}
