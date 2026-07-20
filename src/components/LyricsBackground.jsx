import { useMemo } from 'react'
import lyrics from '../utils/lyricsData.js'

const sideStyles = {
  left: { justifyContent: 'flex-start', paddingLeft: 'clamp(16px, 4vw, 48px)', textAlign: 'left' },
  right: { justifyContent: 'flex-end', paddingRight: 'clamp(16px, 4vw, 48px)', textAlign: 'right' },
  center: { justifyContent: 'center', textAlign: 'center' },
}

export default function LyricsBackground({ currentTime }) {
  const activeIndex = useMemo(() => {
    let idx = -1
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) idx = i
    }
    return idx
  }, [currentTime])

  if (activeIndex < 0) return null

  const start = Math.max(0, activeIndex - 1)
  const end = Math.min(lyrics.length - 1, activeIndex + 1)

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 5,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        gap: 'clamp(8px, 1.5vh, 16px)',
      }}>
        {lyrics.slice(start, end + 1).map((line, i) => {
          const realIndex = start + i
          const isActive = realIndex === activeIndex
          const isPast = realIndex < activeIndex
          const side = sideStyles[line.side] || sideStyles.center
          const opacity = isActive ? 1 : isPast ? 0.2 : 0.1
          const fontSize = isActive ? 'clamp(24px, 5vw, 42px)' : 'clamp(14px, 2.5vw, 22px)'
          const fontWeight = isActive ? 700 : 400

          return (
            <div
              key={`${line.time}-${i}`}
              style={{
                display: 'flex',
                width: '100%',
                ...side,
                opacity,
                transform: `translateY(${isActive ? 0 : isPast ? -12 : 12}px) scale(${isActive ? 1 : 0.93})`,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                willChange: 'transform, opacity',
              }}
            >
              <span style={{
                display: 'inline-block',
                maxWidth: 'min(80%, 600px)',
                fontSize,
                fontWeight,
                color: isActive ? '#FF1493' : '#D4879C',
                textShadow: isActive
                  ? '0 2px 24px rgba(255,20,147,0.3), 0 0 48px rgba(255,105,180,0.15)'
                  : 'none',
                fontFamily: "'Quicksand', sans-serif",
                lineHeight: 1.4,
                padding: 'clamp(4px, 1vh, 8px) 0',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {line.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
