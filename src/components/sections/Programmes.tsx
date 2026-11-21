import { affiliations, programmes } from '../../data/content'
import graduate from '../../assets/photos/graduate.jpg'
import { ProgramRow } from '../ui/Cards'
import { Highlight } from '../ui/Highlight'
import { Icon } from '../ui/Icon'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Programmes.module.css'

export function Affiliations({ tone }: { tone?: Tone }) {
  return (
    <div className={toneClass(tone)}>
      {/* Marquee: four copies, the track slides by half (two copies) so it loops seamlessly even on very wide screens. */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[0, 1, 2, 3].map((copy) => (
            <ul
              key={copy}
              className={styles.affList}
              aria-label={copy === 0 ? 'Affiliations and recognitions' : undefined}
              aria-hidden={copy > 0 || undefined}
            >
              {affiliations.map((a) => (
                <li key={a}>
                  <Icon name="landmark" size={22} />
                  {a}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Programmes({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal id="programmes" className={`section ${toneClass(tone)}`}>
      <div className="container">
        <header className={`${styles.header} reveal-up`}>
          <p className="eyebrow">{programmes.eyebrow}</p>
          <h2 className="h2">
            {programmes.before}
            <Highlight>{programmes.highlight}</Highlight>
            {programmes.after}
          </h2>
        </header>
        <div className={styles.grid}>
          <div className="stagger">
            {programmes.items.map((p, i) => (
              <ProgramRow key={p.title} index={`0${i + 1}.`} {...p} active={i === 0} />
            ))}
          </div>
          <img loading="lazy" className={`${styles.photo} reveal-right`} src={graduate} alt="Law graduate in gown and cap on campus" />
        </div>
      </div>
    </section>
  )
}
