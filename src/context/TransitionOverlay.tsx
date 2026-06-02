import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { DRAIN_DURATION, FLOOD_DURATION } from '@/hooks/usePageTransition'
import type { TransitionState } from '@/hooks/usePageTransition'

interface TransitionOverlayProps {
  state: TransitionState
}

export function TransitionOverlay({ state }: TransitionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const fillRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let phase = 0

    const drawWater = (fillAmount: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (fillAmount <= 0) return

      const waterHeight = canvas.height * fillAmount
      const waveAmp = 18
      const waveFreq = 0.008

      // Main water body
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          canvas.height -
          waterHeight +
          Math.sin(x * waveFreq + phase) * waveAmp +
          Math.sin(x * waveFreq * 1.7 + phase * 1.3) * (waveAmp * 0.5) +
          Math.sin(x * waveFreq * 0.4 + phase * 0.7) * (waveAmp * 0.8)
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(
        0,
        canvas.height - waterHeight,
        0,
        canvas.height,
      )
      gradient.addColorStop(0, 'rgba(122, 154, 170, 0.55)')
      gradient.addColorStop(0.3, 'rgba(100, 135, 155, 0.65)')
      gradient.addColorStop(1, 'rgba(80, 115, 135, 0.75)')
      ctx.fillStyle = gradient
      ctx.fill()

      // Surface shimmer
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          canvas.height -
          waterHeight +
          Math.sin(x * waveFreq + phase) * waveAmp +
          Math.sin(x * waveFreq * 1.7 + phase * 1.3) * (waveAmp * 0.5) +
          Math.sin(x * waveFreq * 0.4 + phase * 0.7) * (waveAmp * 0.8)
        ctx.lineTo(x, y)
      }

      for (let x = canvas.width; x >= 0; x -= 2) {
        const y =
          canvas.height -
          waterHeight +
          Math.sin(x * waveFreq + phase) * waveAmp +
          Math.sin(x * waveFreq * 1.7 + phase * 1.3) * (waveAmp * 0.5) +
          Math.sin(x * waveFreq * 0.4 + phase * 0.7) * (waveAmp * 0.8) +
          12
        ctx.lineTo(x, y)
      }

      ctx.closePath()
      ctx.fillStyle = 'rgba(180, 210, 225, 0.2)'
      ctx.fill()

      // Ripple lines
      for (let r = 0; r < 25; r++) {
        const rippleY =
          canvas.height -
          waterHeight * (0.1 + r * 0.036) +
          Math.sin(phase * 1.2 + r * 1.8) * 12

        const rippleWidth =
          canvas.width * (0.08 + Math.sin(r * 1.3 + phase * 0.6) * 0.06)

        const rippleX =
          (canvas.width - rippleWidth) *
          (0.5 + Math.sin(r * 0.9 + phase * 0.4) * 0.35)

        ctx.beginPath()
        ctx.moveTo(rippleX, rippleY)
        ctx.bezierCurveTo(
          rippleX + rippleWidth * 0.25,
          rippleY - 6,
          rippleX + rippleWidth * 0.75,
          rippleY + 6,
          rippleX + rippleWidth,
          rippleY,
        )
        ctx.strokeStyle = `rgba(220, 240, 248, ${0.35 + Math.sin(phase * 1.5 + r) * 0.15})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      phase += 0.04
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current

      if (state === 'flooding') {
        fillRef.current = Math.min(elapsed / FLOOD_DURATION, 1)
      } else if (state === 'draining') {
        fillRef.current = Math.max(1 - elapsed / DRAIN_DURATION, 0)
      } else if (state === 'holding') {
        fillRef.current = 1
      } else {
        fillRef.current = 0
      }

      drawWater(fillRef.current)
      animRef.current = requestAnimationFrame(animate)
    }

    startTimeRef.current = 0
    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [state])

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (state === 'idle' || prefersReducedMotion) return null

  return createPortal(
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ backdropFilter: 'blur(2px)' }}
    />,
    document.body,
  )
}
