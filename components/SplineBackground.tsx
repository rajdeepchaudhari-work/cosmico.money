'use client'

import Spline from '@splinetool/react-spline'

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Spline
        scene="https://prod.spline.design/doTXysbEe3OWhXpb/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
