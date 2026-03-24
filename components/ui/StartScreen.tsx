'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePointerLock } from '@/hooks/usePointerLock'

export function StartScreen() {
  const isLocked = usePointerLock()

  return (
    <AnimatePresence>
      {!isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-10 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-white select-none"
          >
            <h1 className="text-4xl font-bold mb-2 tracking-widest uppercase">World</h1>
            <p className="text-sm text-white/50 mb-8">3D Exploration</p>
            <div className="font-mono text-sm border border-white/20 rounded-lg px-6 py-3 bg-white/10 text-white/80">
              Click to Play
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
