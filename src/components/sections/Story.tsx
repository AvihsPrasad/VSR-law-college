import { story } from '../../data/content'
import { Highlight } from '../ui/Highlight'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Story.module.css'

export function Story({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal className={`section ${toneClass(tone)}`}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} reveal-up`}>
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 className="h2">
            {story.before}
            <Highlight>{story.highlight}</Highlight>
          </h2>
          {story.body.map((p) => (
            <p key={p} className="body">
              {p}
            </p>
          ))}
          <div className={styles.motto}>
            <span className="small">{story.motto.label}</span>
            <strong>{story.motto.text}</strong>
          </div>
        </div>

        <ol className={`${styles.timeline} stagger`}>
          {story.milestones.map((m) => (
            <li key={m.year} className={styles.milestone}>
              <span className={styles.year}>{m.year}</span>
              <div>
                <h3 className={styles.title}>{m.title}</h3>
                <p className="small">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
