import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { AutoH } from '@/components/primitives/AutoH'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT5 } from '@/components/primitives/BaseT5'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { gsap, useGSAP } from '@/deps/gsap'

export interface Chapter {
  id: string
  tab: string
  title: string
  subtitle: string
}

interface Props {
  label: string
  chapters: Chapter[]
  children: (id: string) => React.ReactNode
  wordmark?: React.ReactNode
  description?: string
}

function CoverPage({
  wordmark,
  description,
}: {
  wordmark?: React.ReactNode
  description?: string
}) {
  return (
    <div className="relative size-full overflow-hidden rounded-r-lg bg-beaver-dark dark:bg-beaver">
      <div className="z-raised relative flex h-full flex-col items-center justify-center px-12">
        <BaseT6 className="text-iron-orange uppercase dark:text-cream/80">
          Field Notes
        </BaseT6>
        {wordmark}
        {description && (
          <p className="mt-4 max-w-xs text-center text-cream/80 dark:text-cream">
            <BaseT5 variant="body">{description}</BaseT5>
          </p>
        )}
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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [chapter.id])

  return (
    <section
      role="tabpanel"
      aria-labelledby={`tab-${chapter.id}`}
      className="relative size-full overflow-hidden rounded-r-lg bg-enamel dark:bg-cream"
    >
      <div className="pointer-events-none absolute top-0 bottom-0 left-4 w-px bg-iron-orange/30 sm:left-8" />

      <div
        ref={scrollRef}
        className="z-raised relative h-full overflow-y-auto bg-local px-9 py-10 sm:px-12"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 27px, color-mix(in srgb, var(--color-iron-orange) 20%, transparent) 27px, color-mix(in srgb, var(--color-iron-orange) 13%, transparent) 28px)',
        }}
      >
        <div className="mx-auto mb-10 flex max-w-3xl flex-col">
          <AutoH className="text-beaver-dark">
            <BaseT1>{chapter.title}</BaseT1>
          </AutoH>
          <div className="flex flex-col gap-1 sm:ml-3 sm:flex-row sm:items-center">
            <BaseT6 className="leading-none text-iron-orange uppercase">
              Chapter {chapter.tab}:
            </BaseT6>
            <p className="leading-none text-iron-orange uppercase">
              <BaseT6>{chapter.subtitle}</BaseT6>
            </p>
          </div>
        </div>

        {/* Chapter content */}
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </section>
  )
}

export function Flipbook({
  label,
  chapters,
  children,
  wordmark,
  description,
}: Props) {
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

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const flipDuration = prefersReducedMotion ? 0 : 0.3

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
          duration: flipDuration,
          ease: 'power2.in',
          transformOrigin: 'left center',
        })
      } else {
        tl.set(currentPageRef.current, { rotateY: -90 }).fromTo(
          nextPageRef.current,
          { rotateY: -90 },
          {
            rotateY: 0,
            duration: flipDuration,
            ease: 'power2.out',
            transformOrigin: 'left center',
          },
        )
      }
    })
  }

  return (
    <div className="flex h-full flex-1 items-center justify-center px-4 pt-20 pb-14 sm:pt-24 sm:pr-14 lg:px-0">
      <div className="flex w-full justify-center">
        <div
          aria-hidden="true"
          className="z-raised flex w-8 flex-shrink-0 flex-col items-center justify-between gap-3 border-r-2 border-black/30 bg-beaver-dark py-8 sm:w-12 lg:py-12 dark:border-black/55 dark:bg-beaver"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="size-4 rounded-full bg-cream/80 outline-2 outline-black/30 dark:bg-beaver-dark/80 dark:outline-black/55"
            />
          ))}
        </div>

        <div
          ref={bookRef}
          className="relative h-[80vh] max-w-3xl flex-1 rounded-r-lg lg:h-[64rem]"
          style={{
            boxShadow: '0 40px 60px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            role="tablist"
            aria-label={label}
            className="z-tabs absolute -bottom-10 left-6 flex w-[86%] justify-between gap-1 sm:top-8 sm:-right-10 sm:bottom-0 sm:left-full sm:w-auto sm:flex-col sm:justify-start"
          >
            {/* TODO: figure out why the border flashes white before it transitions to border-beaver/20 */}
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                id={`tab-${ch.id}`}
                role="tab"
                aria-selected={!showCover && i === (pending ?? current)}
                onClick={() => goTo(i)}
                className={`transition-color flex size-10 items-center justify-center rounded-b-md font-body text-xs tracking-widest shadow-sm duration-75 focus-visible:border focus-visible:border-iron-orange focus-visible:outline-none sm:rounded-r-md sm:rounded-bl-none ${
                  !showCover && i === (pending ?? current)
                    ? 'border border-beaver/20 bg-beaver-dark text-cream dark:bg-beaver dark:text-cream'
                    : 'bg-beaver text-cream hover:bg-beaver-dark dark:bg-cream dark:text-beaver-dark dark:hover:bg-beaver dark:hover:text-cream'
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
            className="z-raised absolute inset-0"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {showCover ? (
              <CoverPage wordmark={wordmark} description={description} />
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
