'use client'

import { useEffect, useRef } from 'react'

export default function ScrollCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !cardRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionH = sectionRef.current.offsetHeight
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionH - vh)))
      const rotateY = progress * 360 - 15
      const rotateX = Math.sin(progress * Math.PI) * 6
      cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Portrait card: width × height ratio matches standard card in portrait orientation
  const W = 'min(260px, 70vw)'
  const H = 'min(412px, calc(70vw * 412 / 260))'

  return (
    <div ref={sectionRef} style={{ height: '160vh' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#09090f', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(54,141,255,0.12), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Perspective wrapper */}
        <div style={{ perspective: 1200 }}>
          <div
            ref={cardRef}
            style={{
              position: 'relative',
              width: W,
              height: H,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.08s linear',
              borderRadius: 20,
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8))',
            }}
          >
            {/* Front — card 1 */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 20,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 0 60px rgba(54,141,255,0.15)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cards/1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
              }} />
            </div>

            {/* Back — card 2 */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 20,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)', overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 0 60px rgba(252,92,58,0.1)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cards/2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
              }} />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 36,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          pointerEvents: 'none',
        }}>
          <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
            Scroll to explore
          </p>
          <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)' }} />
        </div>

        {/* Top / bottom fades */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, #09090f, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #09090f, transparent)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}
