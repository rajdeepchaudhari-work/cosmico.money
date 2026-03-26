'use client'

import { useEffect } from 'react'

// Minimum width the viewer is rendered at — keeps the Spline camera
// seeing the full card regardless of how narrow the viewport is.
const MIN_VIEWER_WIDTH = 960

export default function SplineCard() {
  useEffect(() => {
    if (!document.querySelector('script[data-spline-viewer]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.72/build/spline-viewer.js'
      script.setAttribute('data-spline-viewer', '1')
      document.head.appendChild(script)
    }

    // Hide watermark via shadow DOM
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      const viewer = document.querySelector('spline-viewer')
      const logo = viewer?.shadowRoot?.querySelector('#logo') as HTMLElement | null
      if (logo) { logo.style.display = 'none'; clearInterval(interval) }
      if (attempts > 40) clearInterval(interval)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    // Outer: fills the section, clips overflow
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Inner: always at least MIN_VIEWER_WIDTH wide, centred horizontally */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        width: `max(100%, ${MIN_VIEWER_WIDTH}px)`,
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        {/* @ts-ignore */}
        <spline-viewer
          url="https://prod.spline.design/reQJc5Rs5sxhh99Y/scene.splinecode"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* Watermark — always at bottom-right of the canvas */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 260, height: 64,
          background: '#09090f',
          zIndex: 10,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 360, height: 120,
          background: 'linear-gradient(to top left, #09090f 50%, transparent)',
          zIndex: 9,
        }} />
      </div>
    </div>
  )
}
