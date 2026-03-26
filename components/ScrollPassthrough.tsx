'use client'

import { useRef } from 'react'

// Sits on top of the Spline viewer and forwards touch scroll to the page,
// bypassing the viewer's internal touch listeners that block iOS scroll.
export default function ScrollPassthrough() {
  const startY = useRef(0)

  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'transparent' }}
      onTouchStart={(e) => {
        startY.current = e.touches[0].clientY
      }}
      onTouchMove={(e) => {
        const delta = startY.current - e.touches[0].clientY
        window.scrollBy({ top: delta, behavior: 'instant' as ScrollBehavior })
        startY.current = e.touches[0].clientY
      }}
    />
  )
}
