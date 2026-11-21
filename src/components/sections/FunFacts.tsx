import { funFacts } from '../../data/content'
import { OutlineStat } from '../ui/Cards'
import { Highlight } from '../ui/Highlight'
import { Icon } from '../ui/Icon'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/FunFacts.module.css'

export function FunFacts({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal className={`section ${toneClass(tone)}`}>
      <div className={`container ${styles.wrap} stagger`}>
        <Icon name="graduation-cap" size={44} className={styles.icon} />
        <p className="eyebrow">{funFacts.eyebrow}</p>
        <h2 className={`h2 ${styles.title}`}>
          {funFacts.parts.map((p) => (p.highlight ? <Highlight key={p.text}>{p.text}</Highlight> : p.text))}
        </h2>
        <div className={`${styles.stats} stagger`}>
          {funFacts.stats.map((s) => (
            <OutlineStat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
