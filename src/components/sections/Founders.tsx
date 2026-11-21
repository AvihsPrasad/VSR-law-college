import { founders } from '../../data/content'
import { Highlight } from '../ui/Highlight'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Founders.module.css'

export function Founders({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal id="founders" className={`section ${toneClass(tone)}`}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.collage} reveal-left`}>
          {/* Portraits live in public/ */}
          <figure className={styles.photoA}>
            <img loading="lazy" src="/Vunki_Sannarudrappa.jpg" alt="Portrait of Late Sri Vunki Sannarudrappa" />
            <figcaption>Late Sri Vunki Sannarudrappa</figcaption>
          </figure>
          <figure className={styles.photoB}>
            <img loading="lazy" src="/Vadaga_Veerappa.jpg" alt="Portrait of Shri Vadaga Veerappa" />
            <figcaption>Shri Vadaga Veerappa</figcaption>
          </figure>
          <div className={styles.seal}>
            <span className="eyebrow">Estd</span>
            <strong>1975</strong>
          </div>
        </div>

        <div className={`${styles.copy} reveal-up reveal-delay`}>
          <p className="eyebrow">{founders.eyebrow}</p>
          <h2 className="h2">
            {founders.before}
            <Highlight>{founders.highlight}</Highlight>
          </h2>
          <p className="body">{founders.body}</p>
          <blockquote className={styles.quote}>{founders.quote}</blockquote>
          <div className={styles.founder}>
            <span className={styles.avatar} aria-hidden="true">
              VV
            </span>
            <div>
              <span className="small">{founders.founderLabel}</span>
              <strong>{founders.founderName}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
