import { useState } from 'react'
import { CATEGORY_GROUP, CATEGORY_META, CATEGORY_ORDER, GROUP_ORDER, makeMockStock } from './data'
import type { Category } from './data'
import StockBar from './StockBar'

function App() {
  const [items, setItems] = useState(makeMockStock)
  const [selected, setSelected] = useState<Record<Category, boolean>>(() =>
    Object.fromEntries(CATEGORY_ORDER.map((c) => [c, true])) as Record<Category, boolean>,
  )

  function handleChange(id: string, stock: number) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, stock } : i)))
  }

  function toggleCategory(category: Category) {
    setSelected((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const allSelected = CATEGORY_ORDER.every((c) => selected[c])
  const noneSelected = CATEGORY_ORDER.every((c) => !selected[c])

  function toggleAll() {
    const next = !allSelected
    setSelected(
      Object.fromEntries(CATEGORY_ORDER.map((c) => [c, next])) as Record<Category, boolean>,
    )
  }

  const low = items.filter((i) => i.stock / i.max <= 0.2).length

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-[#0f1621] px-4 pb-10">
      <header className="sticky top-0 z-10 -mx-4 border-b border-[#26314a] bg-[#0f1621]/95 px-4 pt-3 pb-2 shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">Stock Levels</h1>
          {low > 0 && (
            <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-400">
              {low} low
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <label
            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm transition-colors ${
              allSelected
                ? 'border-[#3a4763] bg-[#1c2436] text-slate-200'
                : 'border-[#26314a] bg-transparent text-slate-500'
            }`}
          >
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-slate-400"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = !allSelected && !noneSelected
              }}
              onChange={toggleAll}
            />
            All
          </label>
          {CATEGORY_ORDER.map((category) => {
            const meta = CATEGORY_META[category]
            const isActive = selected[category]
            return (
              <label
                key={category}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm transition-colors ${
                  isActive
                    ? 'border-[#3a4763] bg-[#1c2436] text-slate-200'
                    : 'border-[#26314a] bg-transparent text-slate-500'
                }`}
              >
                <input
                  type="checkbox"
                  className={`h-3.5 w-3.5 ${meta.accent}`}
                  checked={isActive}
                  onChange={() => toggleCategory(category)}
                />
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                {category}
              </label>
            )
          })}
        </div>
      </header>

      <main className="space-y-4 pt-3">
        {GROUP_ORDER.map((group) => {
          const groupCategories = CATEGORY_ORDER.filter(
            (c) => CATEGORY_GROUP[c] === group && selected[c],
          )
          if (groupCategories.length === 0) return null
          return (
            <section key={group} className="space-y-2.5">
              <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                {group}
              </h2>
              {groupCategories.map((category) => {
                const categoryItems = items.filter((i) => i.category === category)
                if (categoryItems.length === 0) return null
                const categoryLow = categoryItems.filter((i) => i.stock / i.max <= 0.2).length
                const meta = CATEGORY_META[category]
                return (
                  <div
                    key={category}
                    className="overflow-hidden rounded-xl border border-[#26314a] bg-[#171f2e] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                  >
                    <div
                      className={`flex items-center justify-between border-l-4 ${meta.border} bg-[#1c2436] px-3 py-1.5`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${meta.dot} shadow-[0_0_6px_rgba(0,0,0,0.4)]`} />
                        <h3 className={`text-sm font-semibold tracking-wide uppercase ${meta.text}`}>
                          {category}
                        </h3>
                        <span className="text-xs text-slate-500">({categoryItems.length})</span>
                      </div>
                      {categoryLow > 0 && (
                        <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-400">
                          {categoryLow} low
                        </span>
                      )}
                    </div>
                    <div className="divide-y divide-[#26314a] px-3">
                      {categoryItems.flatMap((item, index) => {
                        const nodes = []
                        if (item.subgroup && item.subgroup !== categoryItems[index - 1]?.subgroup) {
                          nodes.push(
                            <div key={`${item.subgroup}-divider`} className="flex items-center gap-3 py-1">
                              <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                {item.subgroup}
                              </span>
                              <span className="h-px flex-1 bg-[#26314a]" />
                            </div>,
                          )
                        }
                        nodes.push(<StockBar key={item.id} item={item} onChange={handleChange} />)
                        return nodes
                      })}
                    </div>
                  </div>
                )
              })}
            </section>
          )
        })}
        {noneSelected && (
          <p className="pt-10 text-center text-sm text-slate-500">No categories selected.</p>
        )}
      </main>
    </div>
  )
}

export default App
