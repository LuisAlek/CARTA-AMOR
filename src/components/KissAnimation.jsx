import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import conejoAnim from '../assets/conejoanimacion.png'

function Particle({ delay, angle, distance, emoji }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 1, 0],
        x: [0, x, x * 1.3],
        y: [0, y, y * 1.3],
      }}
      transition={{ duration: 2.5, delay, ease: 'easeOut' }}
      style={{ position: 'absolute', fontSize: 'clamp(18px, 4vw, 28px)', pointerEvents: 'none', zIndex: 60 }}
    >
      {emoji}
    </motion.div>
  )
}

const backdropColors = [
  ['#FFF0F5', '#FFE4E1', '#FFDDE1'],
  ['#FFE4E1', '#FFDDE1', '#FFF0F5'],
  ['#FFDDE1', '#FFF0F5', '#FFE4E1'],
  ['#FFF5F0', '#FFE4E1', '#FFD0D8'],
  ['#FFE8F0', '#FFD4DC', '#FFC0C8'],
]

const messageData = {
  0: { text: 'Muak 💋', emojis: ['💋', '💕', '💖', '✨', '🌸'] },
  1: { text: 'Te amo 💕', emojis: ['💕', '💖', '❤️', '✨', '🩷'] },
  2: { text: 'Mi corazón ❤️', emojis: ['❤️', '💖', '💗', '✨', '🌸'] },
  3: { text: 'Mi cuchurrumin 🌟', emojis: ['🌟', '💕', '💖', '✨', '⭐'] },
  4: { text: 'Esto es para ti 🎀', emojis: ['🎀', '💖', '💕', '✨', '🌸'] },
}

export default function KissAnimation({ kissNumber, onComplete }) {
  const msg = messageData[kissNumber] || messageData[0]
  const colors = backdropColors[kissNumber] || backdropColors[0]
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (360 / 20) * i + Math.random() * 15,
    distance: 120 + Math.random() * 100,
    delay: Math.random() * 0.3,
    emoji: msg.emojis[Math.floor(Math.random() * msg.emojis.length)],
  }))

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50,
          background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        }}
      >
        {particles.map((p) => (
          <Particle key={p.id} delay={p.delay} angle={p.angle} distance={p.distance} emoji={p.emoji} />
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            width: 'clamp(100px, 25vw, 180px)',
            height: 'auto',
            borderRadius: 20,
            filter: 'drop-shadow(0 6px 24px rgba(255,105,180,0.4))',
            zIndex: 61,
          }}
        >
          <img src={conejoAnim} alt="Conejito animación" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 1], y: [30, -5, 0, 0], scale: [0.5, 1.2, 1, 1] }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 'clamp(80px, 15vh, 140px)',
            fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 800,
            color: '#FF1493',
            textShadow: '0 2px 20px rgba(255,20,147,0.3), 0 0 40px rgba(255,105,180,0.15)',
            fontFamily: "'Quicksand', sans-serif", zIndex: 61,
            textAlign: 'center', lineHeight: 1.3,
          }}
        >
          {msg.text}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
