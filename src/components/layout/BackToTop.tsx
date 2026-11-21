import { useEffect, useState } from 'react'
import { Icon } from '../ui/Icon'
import styles from '../../styles/layout/BackToTop.module.css'

// Show the button once the visitor has scrolled roughly a screen down.
const SHOW_AFTER = 400

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    // CSS scroll-behavior makes this smooth (and instant under reduced motion).
    window.scrollTo({ top: 0 })
    // The button hides at the top, so hand keyboard focus to the page content.
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      className={visible ? `${styles.button} ${styles.visible}` : styles.button}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="arrow-up" size={22} />
    </button>
  )
}
