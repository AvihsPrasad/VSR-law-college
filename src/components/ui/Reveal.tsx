import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from '../../styles/ui/Reveal.module.css'

type Direction = 'up' | 'left' | 'right'

type RevealProps = {
  children: ReactNode
  /** up = fade in up; left = slides in from the left; right = from the right */
  from?: Direction
  className?: string
}

// Fades its children in once they scroll into view (runs once).
export function Reveal({ children, from = 'up', className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Without IntersectionObserver, just show the content.
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cls = [styles.reveal, styles[from], shown && styles.shown, className].filter(Boolean).join(' ')
  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  )
}
