import { useLayoutEffect, useRef, useState } from 'react'

import { gsap, useGSAP } from '../../deps/gsap'
import { BaseT1 } from '../primitives/BaseT1'
import { BaseT6 } from '../primitives/BaseT6'

export interface Chapter {
  id: string
  tab: string
  title: string
  subtitle: string
}

interface Props {
  chapters: Chapter[]
  children: (id: string) => React.ReactNode
  wordmark?: React.ReactNode
}

function CoverPage({ wordmark }: { wordmark?: React.ReactNode }) {
  return (
    <div className="relative size-full overflow-hidden rounded-r-lg bg-beaver-dark">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-12">
        <BaseT6 className="text-iron-orange uppercase">Field Notes</BaseT6>
        {wordmark}
      </div>
    </div>
  )
}

function PageChrome({
  chapter,
  children,
}: {
  chapter: Chapter
  children: React.ReactNode
}) {
  return (
    <div className="relative size-full overflow-hidden rounded-r-lg bg-[#fdf6e3]">
      <div className="pointer-events-none absolute top-0 bottom-0 left-5 w-px bg-iron-orange/30 sm:left-8" />

      <div
        className="relative z-10 h-full overflow-y-auto px-9 py-10 sm:px-12"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 27px, #c5946a22 27px, #c5946a22 28px)',
          backgroundAttachment: 'local',
        }}
      >
        <div className="mb-10 flex flex-col">
          <h1 className="text-beaver-dark">
            <BaseT1>{chapter.title}</BaseT1>
          </h1>
          <div className="mt-1 flex flex-col gap-1 sm:ml-3 sm:flex-row sm:items-center">
            <BaseT6 className="leading-[5%] text-iron-orange uppercase">
              Chapter {chapter.tab}:
            </BaseT6>
            <p className="leading-[5%] text-iron-orange uppercase">
              <BaseT6>{chapter.subtitle}</BaseT6>
            </p>
          </div>
        </div>

        {/* Chapter content */}
        <div className="max-w-prose">{children}</div>
      </div>
    </div>
  )
}

export function Flipbook({ chapters, children, wordmark }: Props) {
  const [current, setCurrent] = useState<number | null>(null)
  const [pending, setPending] = useState<number | null>(null)
  const [next, setNext] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [showCover, setShowCover] = useState(true)

  const bookRef = useRef<HTMLDivElement>(null)
  const currentPageRef = useRef<HTMLDivElement>(null)
  const nextPageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (currentPageRef.current) {
      gsap.set(currentPageRef.current, { rotateY: 0 })
    }
  }, [current])

  useGSAP(
    () => {
      gsap.set(bookRef.current, { perspective: 1200 })
    },
    { scope: bookRef },
  )

  const goTo = (index: number) => {
    if (animating) return
    if (!showCover && index === current) return

    setAnimating(true)
    setNext(index)
    setPending(index)

    gsap.delayedCall(0.05, () => {
      if (!currentPageRef.current) return

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(index)
          setPending(null)
          setNext(null)
          setShowCover(false)
          setAnimating(false)
        },
      })

      const forward = showCover || current === null || index > current

      if (forward) {
        tl.to(currentPageRef.current, {
          rotateY: -90,
          duration: 0.3,
          ease: 'power2.in',
          transformOrigin: 'left center',
        })
      } else {
        tl.set(currentPageRef.current, { rotateY: -90 }).fromTo(
          nextPageRef.current,
          { rotateY: -90 },
          {
            rotateY: 0,
            duration: 0.3,
            ease: 'power2.out',
            transformOrigin: 'left center',
          },
        )
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center pt-28 pr-14 pb-14 pl-4">
      <div className="flex w-full justify-center">
        <div className="z-10 flex w-12 flex-shrink-0 flex-col items-center justify-between gap-3 bg-beaver-dark py-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-5 w-5 rounded-full border-2 border-beaver/40 bg-beaver-dark"
            />
          ))}
        </div>

        <div
          ref={bookRef}
          className="relative h-[80vh] max-w-2xl flex-1 rounded-r-lg"
          style={{
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute top-8 -right-10 z-20 flex flex-col gap-1">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => goTo(i)}
                className={`transition-color flex h-10 w-10 items-center justify-center rounded-r-md font-body text-xs tracking-widest shadow-sm duration-75 ${
                  !showCover && i === (pending ?? current)
                    ? 'border border-beaver/20 bg-cream text-beaver-dark'
                    : 'bg-beaver/60 text-cream/60 hover:bg-beaver hover:text-cream'
                } `}
                aria-label={ch.title}
              >
                {ch.tab}
              </button>
            ))}
          </div>

          {next !== null && (
            <div
              ref={nextPageRef}
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <PageChrome chapter={chapters[next]}>
                {children(chapters[next].id)}
              </PageChrome>
            </div>
          )}

          <div
            ref={currentPageRef}
            className="absolute inset-0 z-10"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {showCover ? (
              <CoverPage wordmark={wordmark} />
            ) : current !== null ? (
              <PageChrome chapter={chapters[current]}>
                {children(chapters[current].id)}
              </PageChrome>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
