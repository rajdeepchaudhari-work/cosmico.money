'use client'

import Spline from '@splinetool/react-spline'
import { useState } from 'react'

interface Props {
  scene: string
}

export default function SplineBackground({ scene }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Static image — shows instantly, fades out once Spline is ready */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <img
          src="/icons/galaxy-hero.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
      </div>

      {/* Spline — all devices, only 13KB scene */}
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
    </div>
  )
}
