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
      {/* Static orb fallback — always visible, fades out once Spline is ready */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <div className="absolute rounded-full blur-3xl opacity-20"
          style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'radial-gradient(circle, #FC5C3A, transparent)' }} />
        <div className="absolute rounded-full blur-3xl opacity-15"
          style={{ width: 500, height: 500, bottom: '-5%', right: '5%', background: 'radial-gradient(circle, #368DFF, transparent)' }} />
        <div className="absolute rounded-full blur-3xl opacity-10"
          style={{ width: 400, height: 400, top: '40%', left: '40%', background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Spline — fades in once loaded */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
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
