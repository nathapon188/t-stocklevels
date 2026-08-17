import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'

const MIN_THUMB = 56

type Props = {
  scrollRef: RefObject<HTMLDivElement | null>
}

export default function PageScrollbar({ scrollRef }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const grabOffset = useRef(0)
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false })
  const [dragging, setDragging] = useState(false)

  const measure = useCallback(() => {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return
    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll <= 1) {
      setThumb({ top: 0, height: 0, visible: false })
      return
    }
    const trackH = track.clientHeight
    const height = Math.max(MIN_THUMB, trackH * (el.clientHeight / el.scrollHeight))
    const top = (el.scrollTop / maxScroll) * (trackH - height)
    setThumb({ top, height, visible: true })
  }, [scrollRef])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [measure, scrollRef])

  function scrollToPointer(clientY: number) {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return
    const rect = track.getBoundingClientRect()
    const maxThumbTop = track.clientHeight - thumb.height
    if (maxThumbTop <= 0) return
    const top = Math.min(maxThumbTop, Math.max(0, clientY - rect.top - grabOffset.current))
    el.scrollTop = (top / maxThumbTop) * (el.scrollHeight - el.clientHeight)
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track) return
    const y = e.clientY - track.getBoundingClientRect().top
    const onThumb = y >= thumb.top && y <= thumb.top + thumb.height
    grabOffset.current = onThumb ? y - thumb.top : thumb.height / 2
    track.setPointerCapture(e.pointerId)
    setDragging(true)
    scrollToPointer(e.clientY)
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return
    scrollToPointer(e.clientY)
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
  }

  if (!thumb.visible) return <div ref={trackRef} className="fixed top-0 right-0 h-[100dvh] w-9" />

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="fixed top-0 right-0 z-20 h-[100dvh] w-9 touch-none select-none border-l border-[#26314a] bg-[#0f1621]"
      aria-hidden="true"
    >
      <div
        className={`absolute left-1/2 w-4 -translate-x-1/2 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.5)] ${
          dragging ? 'bg-slate-300' : 'bg-[#4a5a7a]'
        }`}
        style={{ top: thumb.top, height: thumb.height }}
      />
    </div>
  )
}
