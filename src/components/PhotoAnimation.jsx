import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import hellokittyFoto from '../assets/hellokittytomandofoto.png'

const FLASH_DURATION = 150
const PHOTO_DURATION = 1400

export default function PhotoAnimation({ onComplete }) {
  const [flash, setFlash] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const flashOn = setTimeout(() => setFlash(true), 300)
    const flashOff = setTimeout(() => setFlash(false), 300 + FLASH_DURATION)
    const end = setTimeout(() => {
      setVisible(false)
      if (onComplete) setTimeout(onComplete, 300)
    }, PHOTO_DURATION)
    return () => {
      clearTimeout(flashOn)
      clearTimeout(flashOff)
      clearTimeout(end)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 55,
            background: 'rgba(255,240,245,0.3)',
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: 'min(60vw, 220px)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(255,105,180,0.3)',
              border: '3px solid white',
            }}
          >
            <img
              src={hellokittyFoto}
              alt="Hello Kitty tomando foto"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              marginTop: 12,
              fontSize: 'clamp(18px, 3.5vw, 24px)',
              fontWeight: 600,
              color: '#FF1493',
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            📸 Sonríe...
          </motion.div>

          {/* Camera flash */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: FLASH_DURATION / 1000, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'white',
                  zIndex: 60,
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
