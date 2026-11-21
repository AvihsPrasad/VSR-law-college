import { announcements } from '../../data/content'
import moot from '../../assets/photos/moot.jpg'
import { NewsRow } from '../ui/Cards'
import { Highlight } from '../ui/Highlight'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Announcements.module.css'

export function Announcements({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal id="announcements" className={`section ${toneClass(tone)}`}>
      <div className="container">
        <header className={`${styles.header} reveal-up`}>
          <p className="eyebrow">{announcements.eyebrow}</p>
          <h2 className="h2">
            {announcements.before}
            <Highlight>{announcements.highlight}</Highlight>
          </h2>
        </header>
        <div className={styles.grid}>
          <figure className={`${styles.feature} reveal-left`}>
            <img loading="lazy" className="photo" src={moot} alt="Law student arguing at a podium during a moot court session" />
            <figcaption>
              <strong>{announcements.feature.title}</strong>
              <span>{announcements.feature.meta}</span>
            </figcaption>
          </figure>
          <div className="stagger">
            {announcements.items.map((item, i) => (
              <NewsRow key={item.title} number={String(i + 1).padStart(2, '0')} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
