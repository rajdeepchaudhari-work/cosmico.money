'use client'

import Spline from '@splinetool/react-spline'
import { useState, useEffect } from 'react'

interface Props {
  scene: string
}

export default function SplineBackground({ scene }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only load heavy Spline scene on desktop — mobile gets static image only
    setIsDesktop(window.innerWidth >= 768)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Static image — always shown, fades out on desktop once Spline loads */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isDesktop && loaded ? 0 : 1 }}
      >
        <img
          src="/icons/Galaxy rollercoaster@1-1710x867.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
      </div>

      {/* Spline — desktop only, fades in once loaded */}
      {isDesktop && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0, willChange: 'opacity' }}
        >
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
