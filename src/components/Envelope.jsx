import { motion } from 'framer-motion'
import hkCarta from '../assets/hellokittycarta.png'

const INTERIOR_COLOR = '#DCC8CB'
const TEAR_EDGE_COLOR = '#C4A8AC'

function EnvelopeInterior() {
  return (
    <g>
      <rect x={55} y={125} width={290} height={315} rx={12} fill={INTERIOR_COLOR} />
      <rect x={55} y={125} width={290} height={315} rx={12} fill="url(#envShadow)" opacity="0.4" />
      <path d="M55 125 L200 240 L345 125 Z" fill="#C9B3B6" opacity="0.5" />
      <rect x={60} y={380} width={280} height={60} rx={8} fill="#C9B3B6" opacity="0.3" />
    </g>
  )
}

function TornHole({ path }) {
  return (
    <g>
      <path d={path} fill={INTERIOR_COLOR} />
      <path d={path} fill="#C9B3B6" opacity="0.25" />
      <path d={path} fill="none" stroke={TEAR_EDGE_COLOR} strokeWidth={1.5} strokeLinejoin="round" opacity={0.9} strokeDasharray="3 2" />
    </g>
  )
}

function PaperStrip({ path, index }) {
  return (
    <motion.path
      d={path}
      fill="#FFF8FA"
      stroke="#FFB6C1"
      strokeWidth={1}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, index % 2 === 0 ? 3 : -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
    />
  )
}

const tearDefs = {
  1: {
    holes: [
      'M 345 410 L 338 395 L 325 402 L 330 418 L 315 425 L 310 435 L 345 435 Z',
      'M 290 435 L 285 428 L 275 432 L 270 425 L 260 435 Z',
    ],
  },
  2: {
    holes: [
      'M 345 410 L 338 395 L 325 402 L 330 418 L 315 425 L 310 435 L 345 435 Z',
      'M 290 435 L 285 428 L 275 432 L 270 425 L 260 435 Z',
      'M 55 430 L 62 415 L 75 420 L 68 405 L 82 398 L 78 385 L 55 385 Z',
      'M 95 435 L 100 428 L 108 432 L 115 425 L 125 435 Z',
      'M 345 320 L 334 315 L 338 300 L 328 295 L 345 290 Z',
    ],
  },
  3: {
    holes: [
      'M 345 410 L 338 395 L 325 402 L 330 418 L 315 425 L 310 435 L 345 435 Z',
      'M 290 435 L 285 428 L 275 432 L 270 425 L 260 435 Z',
      'M 55 430 L 62 415 L 75 420 L 68 405 L 82 398 L 78 385 L 55 385 Z',
      'M 95 435 L 100 428 L 108 432 L 115 425 L 125 435 Z',
      'M 345 320 L 334 315 L 338 300 L 328 295 L 345 290 Z',
      'M 55 280 L 65 272 L 60 258 L 72 250 L 55 242 Z',
      'M 200 435 L 195 425 L 185 430 L 180 418 L 170 425 L 165 435 Z',
      'M 345 240 L 335 235 L 338 222 L 328 218 L 340 210 L 345 215 Z',
      'M 55 160 L 68 152 L 63 140 L 78 135 L 55 130 Z',
    ],
  },
  4: {
    holes: [
      'M 345 410 L 338 395 L 325 402 L 330 418 L 315 425 L 310 435 L 345 435 Z',
      'M 290 435 L 285 428 L 275 432 L 270 425 L 260 435 Z',
      'M 55 430 L 62 415 L 75 420 L 68 405 L 82 398 L 78 385 L 55 385 Z',
      'M 95 435 L 100 428 L 108 432 L 115 425 L 125 435 Z',
      'M 345 320 L 334 315 L 338 300 L 328 295 L 345 290 Z',
      'M 55 280 L 65 272 L 60 258 L 72 250 L 55 242 Z',
      'M 200 435 L 195 425 L 185 430 L 180 418 L 170 425 L 165 435 Z',
      'M 345 240 L 335 235 L 338 222 L 328 218 L 340 210 L 345 215 Z',
      'M 55 160 L 68 152 L 63 140 L 78 135 L 55 130 Z',
      'M 200 280 L 195 268 L 210 262 L 205 248 L 220 242 L 215 230 L 235 238 L 230 252 L 245 260 L 230 270 L 240 280 Z',
      'M 100 200 L 108 188 L 120 195 L 128 180 L 140 190 L 135 205 L 145 215 L 130 222 L 120 215 L 108 212 Z',
      'M 280 330 L 290 320 L 300 328 L 310 318 L 315 330 L 305 340 L 295 338 Z',
      'M 345 160 L 332 155 L 336 140 L 324 138 L 340 125 L 345 130 Z',
      'M 55 340 L 68 335 L 62 320 L 78 318 L 72 305 L 88 308 L 82 325 L 55 330 Z',
    ],
  },
}

function EnvelopeDamage({ level }) {
  if (level === 0 || level > 4) return null
  const def = tearDefs[level]
  if (!def) return null

  return (
    <g>
      {def.holes.map((path, i) => (
        <TornHole key={`hole-${i}`} path={path} />
      ))}
    </g>
  )
}

function EnvelopeFlap({ level }) {
  if (level >= 5) return null

  const rotations = [0, -1.5, -4, -10, -22]
  const translateY = [0, 1, 3, 7, 14]
  const translateX = [0, 0.5, 1.5, 3, 7]
  const rotate = rotations[level] || 0
  const tY = translateY[level] || 0
  const tX = translateX[level] || 0

  return (
    <motion.g
      animate={{ rotate, x: tX, y: tY }}
      transition={{ type: 'spring', stiffness: 60, damping: 10 }}
      style={{ transformOrigin: '200px 125px' }}
    >
      <path
        d="M 58 128 L 200 248 C 210 258, 190 258, 200 248 L 342 128 Z"
        fill="url(#flapGrad)"
        stroke="#FFB6C1"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {level >= 3 && (
        <path
          d="M 120 160 L 118 155 L 125 148 L 122 142 L 130 140"
          fill="none"
          stroke={TEAR_EDGE_COLOR}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
      )}
      {level >= 4 && (
        <PaperStrip path="M 280 180 L 285 170 L 278 165 L 282 155 L 275 150 L 270 160 Z" index={0} />
      )}
    </motion.g>
  )
}

function ExplosionPieces() {
  const pieces = [
    { d: 'M 55 125 L 200 240 L 145 300 L 55 250 Z', x: -90, y: -70, r: -30 },
    { d: 'M 200 240 L 345 125 L 300 180 L 240 150 Z', x: 100, y: -90, r: 35 },
    { d: 'M 55 250 L 145 300 L 100 380 L 55 320 Z', x: -70, y: 60, r: 20 },
    { d: 'M 145 300 L 240 300 L 300 380 L 100 380 Z', x: 40, y: 90, r: -15 },
    { d: 'M 240 300 L 345 250 L 345 380 L 300 380 Z', x: 80, y: 50, r: -40 },
    { d: 'M 200 240 L 240 150 L 300 180 L 240 300 Z', x: -60, y: -110, r: 50 },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 5,
    }}>
      <svg viewBox="0 0 400 500" style={{ width: 'min(80%, 350px)', height: 'auto' }}>
        {pieces.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            fill="#FFFFFF"
            stroke="#FFB6C1"
            strokeWidth={1.5}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.r }}
            transition={{ duration: 1, ease: 'easeOut', delay: i * 0.06 }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Envelope({ damageLevel, exploded }) {
  if (exploded) return <ExplosionPieces />

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 14 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px, 3vw, 30px)',
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 'min(92%, 480px)', maxHeight: '80vh' }}
      >
        <svg
          viewBox="0 0 400 500"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '75vh',
            filter: 'drop-shadow(0 10px 30px rgba(255,105,180,0.25))',
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF8FA" />
              <stop offset="100%" stopColor="#FFF0F5" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFF8FA" />
            </linearGradient>
            <radialGradient id="envShadow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#00000000" />
              <stop offset="100%" stopColor="#00000015" />
            </radialGradient>
            <filter id="holeShadow">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000020" />
            </filter>
          </defs>

          <EnvelopeInterior />
          <rect x={55} y={125} width={290} height={315} rx={12} fill="url(#bodyGrad)" stroke="#FFB6C1" strokeWidth={2.5} />
          <EnvelopeDamage level={damageLevel} />

          <image href={hkCarta} x="110" y="210" width="180" height="180" />

          <EnvelopeFlap level={damageLevel} />
          <path d="M 55 125 L 55 440 L 345 440 L 345 125" fill="none" stroke="#FFB6C1" strokeWidth={2.5} opacity={damageLevel >= 3 ? 0.4 : 0.8} />
        </svg>
      </motion.div>
    </motion.div>
  )
}
