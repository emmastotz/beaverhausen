import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/deps/gsap'

interface TypewriterOptions {
  text: string
  charSpeed?: number
  startDelay?: number
  onComplete?: () => void
}

export const useTypewriter = ({
  text,
  charSpeed = 28,
  startDelay = 400,
  onComplete,
}: TypewriterOptions) => {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useGSAP(() => {
    setDisplayed('')
    setIsComplete(false)

    if (!text.length) return

    const obj = { index: 0 }

    gsap.to(obj, {
      index: text.length,
      duration: (text.length * charSpeed) / 1000,
      delay: startDelay / 1000,
      ease: `steps(${text.length})`,
      onUpdate() {
        setDisplayed(text.slice(0, Math.round(obj.index)))
      },
      onComplete() {
        setIsComplete(true)
        onCompleteRef.current?.()
      },
    })
  }, [text, charSpeed, startDelay])

  return { displayed, isComplete }
}
