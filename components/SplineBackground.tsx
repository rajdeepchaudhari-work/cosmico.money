'use client'

import Spline from '@splinetool/react-spline/next'
import { useState, useEffect } from 'react'

export default function SplineBackground({ scene }: { scene: string }) {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Defer WebGL init until browser is idle — avoids competing with hydration
  useEffect(() => {
    if (isMobile) return // mobile uses video, no Spline needed
    const init = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(init, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const id = setTimeout(init, 300)
      return () => clearTimeout(id)
    }
  }, [isMobile])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(0)' }}>

      {/* Static image — visible instantly on all devices */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: loaded ? 0 : 1 }}>
        <img
          src="/icons/galaxy-hero.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
      </div>

      {/* Mobile — looping MP4, zero WebGL overhead */}
      {isMobile && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>
      )}

      {/* Desktop — Spline WebGL, deferred until idle */}
      {!isMobile && ready && (
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: loaded ? 1 : 0 }}>
          <Spline
            scene={scene}
            onLoad={() => setLoaded(true)}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  )
}
