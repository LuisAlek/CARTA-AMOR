import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import hkRosas from '../assets/hellokittyconrosas.png'
import snoopy from '../assets/snoopyabrazandouncorazon.png'
import kuromiCorazones from '../assets/kuromiconcorazonesalrededor.png'
import kuromiOjos from '../assets/kuromiconcorazonesenlosojos.png'

function FloatingHeart({ index }) {
  const left = 5 + Math.random() * 90
  const duration = 5 + Math.random() * 5
  const delay = Math.random() * 4
  const size = 16 + Math.random() * 20
  const emojis = ['💕', '💖', '💗', '💝', '🩷', '❤️', '🌸', '🎀']

  return (
    <motion.div
      initial={{ opacity: 0, y: '110vh', x: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0],
        y: ['110vh', '-10vh'],
        x: [0, (Math.random() - 0.5) * 140],
        rotate: [0, 360],
      }}
      transition={{ duration, delay: delay + index * 0.15, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'fixed', left: `${left}%`, fontSize: size, pointerEvents: 'none', zIndex: 1 }}
    >
      {emojis[index % emojis.length]}
    </motion.div>
  )
}

function AnimatedImg({ src, alt, style, initialX = -30 }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, x: initialX, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.08, filter: 'drop-shadow(0 8px 24px rgba(255,105,180,0.35))' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ ...style, display: 'block', borderRadius: 12, transition: 'filter 0.3s' }}
    />
  )
}

export default function Letter() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 24px)', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 18 }, (_, i) => <FloatingHeart key={i} index={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', stiffness: 80, damping: 15 }}
        className="letter-card"
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: 580, width: '100%',
          maxHeight: '85vh', overflowY: 'auto',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)',
          borderRadius: 24, padding: 'clamp(20px, 5vw, 40px)',
          boxShadow: '0 20px 60px rgba(255,105,180,0.25), 0 8px 24px rgba(255,20,147,0.1)',
          border: '2px solid #FFDDE1',
          scrollbarWidth: 'thin', scrollbarColor: '#FFB6C1 transparent',
        }}
      >
        {/* Header image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          <motion.img
            src={hkRosas}
            alt="Hello Kitty con rosas"
            whileHover={{ scale: 1.06, filter: 'drop-shadow(0 8px 24px rgba(255,105,180,0.3))' }}
            style={{ width: 'min(60%, 200px)', height: 'auto', margin: '0 auto', borderRadius: 12, display: 'block' }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700,
            color: '#FF1493', textAlign: 'center', marginBottom: 20,
            fontFamily: "'Quicksand', sans-serif", letterSpacing: '0.5px',
          }}
        >
          Para mi cuchurrumin 💌
        </motion.h1>

        {/* Text + side images layout */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2.5vw, 20px)',
          fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.9, color: '#5a3d4a',
        }}>
          <p style={{ marginBottom: 4 }}>Mi amor,</p>

          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 20px)', alignItems: 'flex-start' }}>
            <AnimatedImg
              src={snoopy}
              alt="Snoopy abrazando un corazón"
              initialX={-30}
              style={{ width: 'clamp(100px, 20vw, 160px)', height: 'auto', flexShrink: 0 }}
            />
            <p>
              Hoy no solo celebramos <strong style={{ color: '#FF1493' }}>4 años juntos</strong>, sino que celebramos a la persona increíble que eres. <strong style={{ color: '#FF1493' }}>¡Felicidades por entrar a la universidad!</strong> 🎓 Estoy tan orgulloso de ti, de todo lo que has logrado y de la mujer tan fuerte y brillante en la que te has convertido.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 20px)', alignItems: 'flex-start' }}>
            <p>
              Eres un <strong style={{ color: '#FF1493' }}>pilar de mi felicidad</strong>, la luz que ilumina mis días grises y la razón de mis sonrisas más sinceras. Eres la persona más increíble que ha llenado mi vida de amor, y no hay un solo día en que no agradezca tenerte a mi lado.
            </p>
            <AnimatedImg
              src={kuromiCorazones}
              alt="Kuromi con corazones alrededor"
              initialX={30}
              style={{ width: 'clamp(100px, 20vw, 160px)', height: 'auto', flexShrink: 0 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 20px)', alignItems: 'flex-start' }}>
            <AnimatedImg
              src={kuromiOjos}
              alt="Kuromi con corazones en los ojos"
              initialX={-30}
              style={{ width: 'clamp(100px, 20vw, 160px)', height: 'auto', flexShrink: 0 }}
            />
            <p>
              Estos 4 años han sido el capítulo más hermoso de mi historia. Cada momento a tu lado ha sido un regalo, desde nuestras risas hasta nuestras conversaciones profundas. Has hecho que mi mundo sea más brillante, más dulce y más lleno de amor del que jamás imaginé posible.
            </p>
          </div>

          <p>
            Quiero que sepas que cada beso, cada abrazo, y cada "te amo" es tan real como el primer día. Eres y siempre serás mi persona favorita en todo el universo. 🌸
          </p>
          <p>
            Te amo con todo mi corazón, hoy, mañana y siempre. 💕
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, type: 'spring', stiffness: 150, damping: 12 }}
          style={{
            textAlign: 'right', fontSize: 'clamp(16px, 2.5vw, 18px)',
            fontWeight: 600, color: '#FF1493',
            borderTop: '2px solid #FFDDE1', paddingTop: 16, marginTop: 12,
          }}
        >
          Con todo mi amor,<br />
          <span style={{ fontSize: 'clamp(18px, 3vw, 22px)' }}>Tu Mananito 🎀</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 16, fontSize: 'clamp(22px, 4vw, 28px)', letterSpacing: 4 }}
        >
          💕 💖 💗 💕
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
