'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL = 20
const FRAMES = Array.from({ length: TOTAL }, (_, i) =>
  `/card-frames/frame${String(i + 1).padStart(4, '0')}.jpg`
)

export default function CardSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const progressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let loadedCount = 0
    const imgs = FRAMES.map((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedCount++
        if (loadedCount === TOTAL) setLoaded(true)
      }
      imagesRef.current[i] = img
      return img
    })
    return () => { imgs.forEach(img => { img.onload = null }) }
  }, [])

  // Draw with sub-frame interpolation — blends adjacent frames for smoothness
  const drawInterpolated = (progress: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const exact = progress * (TOTAL - 1)
    const lo = Math.floor(exact)
    const hi = Math.min(TOTAL - 1, lo + 1)
    const blend = exact - lo

    const imgLo = imagesRef.current[lo]
    const imgHi = imagesRef.current[hi]
    if (!imgLo?.complete) return

    ctx.globalAlpha = 1
    ctx.drawImage(imgLo, 0, 0, canvas.width, canvas.height)

    if (blend > 0 && imgHi?.complete) {
      ctx.globalAlpha = blend
      ctx.drawImage(imgHi, 0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
    }
  }

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionH = sectionRef.current.offsetHeight
      const vh = window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / (sectionH - vh)))

      if (p !== progressRef.current) {
        progressRef.current = p
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawInterpolated(p))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [loaded])

  useEffect(() => {
    if (loaded) drawInterpolated(0)
  }, [loaded])

  return (
    <div ref={sectionRef} style={{ height: '220vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <canvas
          ref={canvasRef}
          width={1440}
          height={900}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            aspectRatio: '1440 / 900',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Solid bottom bar — fully covers Spline watermark */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 64,
          background: '#09090f',
          pointerEvents: 'none',
        }} />

        {/* Gradient above the bar to blend naturally */}
        <div style={{
          position: 'absolute',
          bottom: 64, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, transparent, #09090f)',
          pointerEvents: 'none',
        }} />

        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, #09090f, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Side fades */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, #09090f 0%, transparent 8%, transparent 92%, #09090f 100%)',
        }} />

        {/* Label */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.15)',
        }}>
          Cosmico · Black Card
        </div>

        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.1)',
              borderTopColor: 'rgba(54,141,255,0.6)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>
    </div>
  )
}
