import { useEffect, useRef } from 'react'

const START_SEC = 26

export default function MusicPlayer({ onTimeUpdate, onPlayStateChange }) {
  const playerRef = useRef(null)

  useEffect(() => {
    let cleanup = false

    function createPlayer() {
      try {
        if (!window.YT || !window.YT.Player) return
        if (cleanup) return

        const p = new window.YT.Player('youtube-player', {
          videoId: '98Akpf1ph2o',
          playerVars: {
            start: START_SEC,
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              if (cleanup) return
              playerRef.current = e.target
              if (onPlayStateChange) onPlayStateChange(true)
            },
            onStateChange: (e) => {
              if (cleanup) return
              if (onPlayStateChange) onPlayStateChange(e.data === window.YT.PlayerState.PLAYING)
            },
            onError: () => {},
          },
        })
      } catch (e) {}
    }

    window.onYouTubeIframeAPIReady = createPlayer

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const interval = setInterval(() => {
      try {
        const p = playerRef.current
        if (p && p.getCurrentTime) {
          const t = p.getCurrentTime()
          if (onTimeUpdate) onTimeUpdate(t)
        }
      } catch (e) {}
    }, 400)

    return () => {
      cleanup = true
      clearInterval(interval)
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy()
        }
      } catch (e) {}
    }
  }, [])

  return (
    <div id="youtube-player" style={{ position: 'fixed', width: 0, height: 0, border: 'none', zIndex: 100 }} />
  )
}
