import type { ReactNode } from 'react'
import styles from '../../styles/ui/Highlight.module.css'

/** Underlined maroon word used in headings ("institution", "notices", …). */
export function Highlight({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return <span className={onDark ? `${styles.hl} ${styles.onDark}` : styles.hl}>{children}</span>
}
