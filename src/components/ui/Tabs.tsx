import { useRef, type KeyboardEvent } from 'react'
import { panelId, tabId } from './tabIds'
import styles from '../../styles/ui/Tabs.module.css'

type Tab<T extends string> = { id: T; label: string }

type TabsProps<T extends string> = {
  tabs: readonly Tab<T>[]
  active: T
  onChange: (id: T) => void
  label: string
}

// Segmented control (ARIA tabs). Arrow keys / Home / End move and select, as in the WAI-ARIA pattern.
export function Tabs<T extends string>({ tabs, active, onChange, label }: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(e: KeyboardEvent, i: number) {
    const last = tabs.length - 1
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={styles.list} role="tablist" aria-label={label}>
      {tabs.map((tab, i) => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={tabId(tab.id)}
            aria-selected={selected}
            aria-controls={panelId(tab.id)}
            tabIndex={selected ? 0 : -1}
            className={styles.tab}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
