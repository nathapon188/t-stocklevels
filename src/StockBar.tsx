import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { StockItem } from './data'

function levelColor(pct: number) {
  if (pct <= 20) return 'bg-red-400'
  if (pct <= 50) return 'bg-amber-400'
  return 'bg-emerald-400'
}

function pctFromClientX(track: HTMLDivElement, clientX: number) {
  const rect = track.getBoundingClientRect()
  const ratio = (clientX - rect.left) / rect.width
  return Math.min(1, Math.max(0, ratio))
}

type Props = {
  item: StockItem
  onChange: (id: string, stock: number) => void
}

export default function StockBar({ item, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const pct = Math.round((item.stock / item.max) * 100)

  function updateFromPointer(clientX: number) {
    const track = trackRef.current
    if (!track) return
    const ratio = pctFromClientX(track, clientX)
    onChange(item.id, Math.round(ratio * item.max))
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    updateFromPointer(e.clientX)
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return
    updateFromPointer(e.clientX)
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
  }

  return (
    <div className="py-1.5">
      <div className="mb-0.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-slate-100">{item.name}</span>
        <span className="shrink-0 text-xs tabular-nums text-slate-400">
          {item.stock} / {item.max} {item.unit} &middot; {pct}%
        </span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative mr-8 h-7 touch-none select-none rounded-full bg-[#1a2233] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
        role="slider"
        aria-label={`${item.name} stock level`}
        aria-valuemin={0}
        aria-valuemax={item.max}
        aria-valuenow={item.stock}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-b from-white/15 to-transparent shadow-[0_1px_4px_rgba(0,0,0,0.35)] ${levelColor(pct)} ${dragging ? '' : 'transition-[width] duration-150'}`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-[#171f2e] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
    </div>
  )
}
