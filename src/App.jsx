import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Envelope from './components/Envelope.jsx'
import KissAnimation from './components/KissAnimation.jsx'
import PhotoAnimation from './components/PhotoAnimation.jsx'
import Letter from './components/Letter.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import hkCarta from './assets/hellokittycarta.png'
import './App.css'

const TOTAL_CLICKS = 5

const hintLabels = [
  'Toca el sobre 💌',
  'Otro más 💕',
  'Uno más ❤️',
  'Sigue 🌟',
  'El último 🎀',
]

function StageIndicator({ current, total }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 'clamp(80px, 12vh, 110px)',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 'clamp(6px, 1.5vw, 10px)',
      zIndex: 20,
    }}>
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{
            scale: i <= current ? 1 : 0.6,
            backgroundColor: i <= current ? '#FF69B4' : '#FFDDE1',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: i <= current ? 'clamp(12px, 2.5vw, 16px)' : 'clamp(8px, 1.8vw, 11px)',
            height: i <= current ? 'clamp(12px, 2.5vw, 16px)' : 'clamp(8px, 1.8vw, 11px)',
            borderRadius: '50%',
            border: i <= current ? '2px solid #FF1493' : '2px solid #FFB6C1',
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('envelope')
  const [clickCount, setClickCount] = useState(0)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showKiss, setShowKiss] = useState(false)
  const [exploding, setExploding] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [songTime, setSongTime] = useState(0)
  const stopConfetti = useRef(false)

  const triggerConfetti = useCallback(() => {
    stopConfetti.current = false
    const duration = 4500
    const end = Date.now() + duration

    const frame = () => {
      if (stopConfetti.current) return
      confetti({
        particleCount: 5, angle: 60, spread: 80,
        origin: { x: 0, y: 0.6 },
        colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFFFFF'],
        shapes: ['heart', 'star'], startVelocity: 20 + Math.random() * 25, ticks: 100,
      })
      confetti({
        particleCount: 5, angle: 120, spread: 80,
        origin: { x: 1, y: 0.6 },
        colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFFFFF'],
        shapes: ['heart', 'star'], startVelocity: 20 + Math.random() * 25, ticks: 100,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    confetti({
      particleCount: 100, spread: 140, origin: { x: 0.5, y: 0.3 },
      colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFFFFF'],
      shapes: ['heart', 'star'], startVelocity: 50, scalar: 1.8,
    })
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 110, origin: { x: 0.3, y: 0.4 }, colors: ['#FFB6C1', '#FFD700', '#FF69B4'], shapes: ['heart'], scalar: 2.2 })
      confetti({ particleCount: 60, spread: 110, origin: { x: 0.7, y: 0.4 }, colors: ['#FFB6C1', '#FFD700', '#FF69B4'], shapes: ['heart'], scalar: 2.2 })
    }, 600)
    setTimeout(() => {
      confetti({ particleCount: 40, spread: 90, origin: { x: 0.5, y: 0.5 }, colors: ['#FF1493', '#FFD700', '#FFFFFF'], shapes: ['star'], scalar: 1.5 })
    }, 1800)
  }, [])

  const handleCompleteKiss = useCallback(() => {
    setShowKiss(false)
    const newCount = clickCount + 1

    if (newCount >= TOTAL_CLICKS) {
      setExploding(true)
      triggerConfetti()
      setTimeout(() => {
        setShowLetter(true)
        setPhase('letter')
      }, 2000)
    } else {
      setClickCount(newCount)
      setPhase('envelope')
      setTimeout(() => setCanClick(true), 300)
    }
  }, [clickCount, triggerConfetti])

  const handleCompletePhoto = useCallback(() => {
    setShowPhoto(false)
    setShowKiss(true)
  }, [])

  const handleEnvelopeClick = useCallback(() => {
    if (!canClick || showPhoto || showKiss || exploding || showLetter) return
    setCanClick(false)
    setShowPhoto(true)
  }, [canClick, showPhoto, showKiss, exploding, showLetter])

  const hint = hintLabels[clickCount] || hintLabels[0]

  return (
    <div className="app-container">
      <BackgroundDecorations />

      <AnimatePresence mode="wait">
        {showLetter && phase === 'letter' ? (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0, zIndex: 30 }}
          >
            <Letter />
          </motion.div>
        ) : (
          <motion.div
            key="envelope-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEnvelopeClick}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canClick && !showPhoto && !showKiss && !exploding ? 'pointer' : 'default',
            }}
          >
            <Envelope damageLevel={clickCount} exploded={exploding && !showLetter} />
          </motion.div>
        )}
      </AnimatePresence>

      {showPhoto && <PhotoAnimation onComplete={handleCompletePhoto} />}
      {showKiss && <KissAnimation kissNumber={clickCount} onComplete={handleCompleteKiss} />}

      {!showLetter && !exploding && (
        <StageIndicator current={clickCount} total={TOTAL_CLICKS} />
      )}

      {!showLetter && !exploding && !showPhoto && !showKiss && (
        <motion.div
          key={`hint-${clickCount}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0.7, 1, 0.7], y: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 'clamp(100px, 14vh, 130px)',
            left: '50%', transform: 'translateX(-50%)',
            zIndex: 25, textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 600,
            color: '#FF1493', fontFamily: "'Quicksand', sans-serif",
            textShadow: '0 2px 16px rgba(255,20,147,0.25)',
          }}>
            {hint}
          </span>
        </motion.div>
      )}

      {exploding && !showLetter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 35, pointerEvents: 'none',
            background: 'rgba(255,240,245,0.2)',
          }}
        >
          <motion.img
            src={hkCarta}
            alt="Hello Kitty"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              width: 'min(45vw, 180px)',
              height: 'auto',
              borderRadius: 20,
              boxShadow: '0 12px 40px rgba(255,105,180,0.3)',
              marginBottom: 16,
            }}
          />
          <motion.span
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 800,
              color: '#FF1493', fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 24px rgba(255,20,147,0.4)',
            }}
          >
            Te amo 💕
          </motion.span>
        </motion.div>
      )}

      {exploding && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <MusicPlayer onTimeUpdate={setSongTime} />
        </div>
      )}

      {!showLetter && !exploding && (
        <div style={{
          position: 'absolute', top: 'clamp(16px, 4vh, 28px)',
          left: '50%', transform: 'translateX(-50%)', zIndex: 20, textAlign: 'center',
        }}>
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: 'clamp(12px, 2.2vw, 15px)', color: '#FF69B4',
              fontWeight: 500, fontFamily: "'Quicksand', sans-serif",
            }}
          >
            {clickCount < TOTAL_CLICKS
              ? `Abriendo tu corazón 💕 (${clickCount + 1}/${TOTAL_CLICKS})`
              : '¡Un toque más y explota! 💥'}
          </motion.p>
        </div>
      )}
    </div>
  )
}

function BackgroundDecorations() {
  const sparkles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 5 + Math.random() * 90,
      delay: Math.random() * 6,
      size: 14 + Math.random() * 18,
      emoji: ['🌸', '✨', '🎀', '💖', '⭐', '🩷'][Math.floor(Math.random() * 6)],
    }))
  , [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
            animation: `floatSparkle 6s ${s.delay}s infinite ease-in-out`,
            willChange: 'transform',
          }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  )
}
