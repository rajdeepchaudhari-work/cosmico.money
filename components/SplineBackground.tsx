'use client'

import Spline from '@splinetool/react-spline/next'
import { useState, useEffect } from 'react'

export default function SplineBackground({ scene }: { scene: string }) {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Defer WebGL init until browser is idle — avoids competing with hydration
  useEffect(() => {
    const init = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(init, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const id = setTimeout(init, 300) // Safari fallback
      return () => clearTimeout(id)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      {/* Static image — visible instantly, fades out once Spline loads */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: loaded ? 0 : 1 }}>
        <img
          src="/icons/galaxy-hero.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
      </div>

      {/* Spline — only initialised after browser idle */}
      {ready && (
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
