import { useEffect, useRef } from 'react'

// Adds `is-revealed` to the element once it scrolls into view (runs once).
// Pair with `data-reveal` on the same element; descendants marked
// .reveal-up / .reveal-left / .reveal-right / .stagger then animate in (see global.css).
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
