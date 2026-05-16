import { useEffect, useRef, useState } from 'react'

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
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setIsComplete(false)

    const timeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))

        if (indexRef.current >= text.length) {
          clearInterval(timerRef.current!)
          setIsComplete(true)
          onCompleteRef.current?.()
        }
      }, charSpeed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [text, charSpeed, startDelay])

  return { displayed, isComplete }
}
