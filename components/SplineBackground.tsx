'use client'

import Spline from '@splinetool/react-spline/next'
import { useRef, useState } from 'react'

export default function SplineBackground({ scene }: { scene: string }) {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLoad = () => {
    setLoaded(true)
    // Hide Spline watermark — it's rendered as an <a> linking to spline.design
    setTimeout(() => {
      const container = containerRef.current
      if (!container) return
      // Target all anchors/divs inside that reference spline branding
      container.querySelectorAll('a[href*="spline.design"], [class*="logo"], [class*="watermark"]').forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
      // Also check shadow roots
      container.querySelectorAll('*').forEach(el => {
        const shadow = (el as HTMLElement).shadowRoot
        if (!shadow) return
        shadow.querySelectorAll('a[href*="spline.design"], [class*="logo"], [class*="watermark"]').forEach(w => {
          (w as HTMLElement).style.display = 'none'
        })
      })
    }, 500)
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">

      {/* Static image while loading */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: loaded ? 0 : 1 }}>
        <img
          src="/icons/galaxy-hero.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
      </div>

      {/* Spline */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: loaded ? 1 : 0 }}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
