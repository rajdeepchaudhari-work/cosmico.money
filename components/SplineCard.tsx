'use client'

import { useEffect, useRef, useState } from 'react'

const MIN_VIEWER_WIDTH = 960

export default function SplineCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // Only load when section scrolls near viewport
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '150px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    // Load self-hosted viewer script — served from our CDN, cached by Cloudflare
    if (!document.querySelector('script[data-spline-viewer]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = '/spline-viewer.js'   // self-hosted, no unpkg roundtrip
      script.setAttribute('data-spline-viewer', '1')
      document.head.appendChild(script)
    }

    // Hide watermark
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      const viewer = document.querySelector('spline-viewer')
      const logo = viewer?.shadowRoot?.querySelector('#logo') as HTMLElement | null
      if (logo) { logo.style.display = 'none'; clearInterval(interval) }
      if (attempts > 40) clearInterval(interval)
    }, 300)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={sectionRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {inView && (
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          width: `max(100%, ${MIN_VIEWER_WIDTH}px)`,
          left: '50%', transform: 'translateX(-50%)',
          willChange: 'transform',
        }}>
          {/* @ts-ignore */}
          <spline-viewer
            url="/card-scene.splinecode"
            loading-anim-type="none"
            style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
          />
          {/* Watermark cover */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 260, height: 64, background: '#09090f', zIndex: 10 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 360, height: 120, background: 'linear-gradient(to top left, #09090f 50%, transparent)', zIndex: 9 }} />
        </div>
      )}
    </div>
  )
}
