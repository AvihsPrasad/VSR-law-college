import { why } from '../../data/content'
import { WhyCard } from '../ui/Cards'
import { Highlight } from '../ui/Highlight'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/WhyVsr.module.css'

export function WhyVsr() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal id="why" className={`section ${styles.band}`}>
      <div className="container">
        <header className={`${styles.header} reveal-up`}>
          <p className={`eyebrow ${styles.eyebrow}`}>{why.eyebrow}</p>
          <h2 className="h2">
            {why.before}
            <Highlight onDark>{why.highlight}</Highlight>
            {why.after}
          </h2>
        </header>
        <div className={`${styles.cards} stagger`}>
          {why.cards.map((c, i) => (
            <WhyCard key={c.title} {...c} active={i === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
