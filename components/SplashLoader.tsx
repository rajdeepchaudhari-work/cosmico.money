'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setFading(true)
        setTimeout(() => setVisible(false), 600)
      }, 400)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, { once: true })
      // Fallback — hide after 3s regardless
      const fallback = setTimeout(handleLoad, 3000)
      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(fallback)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#09090f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>

      {/* Logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Image src="/icons/logo.svg" alt="Cosmico" width={36} height={36} />
        <span style={{
          fontSize: 22,
          fontWeight: 700,
          color: 'white',
          fontFamily: 'var(--font-ibm-plex-serif)',
          letterSpacing: '-0.02em',
        }}>Cosmico</span>
      </div>

      {/* Animated bar */}
      <div style={{
        width: 160,
        height: 2,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          borderRadius: 999,
          background: 'linear-gradient(90deg, #FC5C3A, #368DFF)',
          animation: 'loadbar 1.8s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes loadbar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
