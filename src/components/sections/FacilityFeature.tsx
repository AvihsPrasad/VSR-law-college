import { site, type Facility } from '../../data/content'
import { Button } from '../ui/Button'
import { Highlight } from '../ui/Highlight'
import { Reveal } from '../ui/Reveal'
import { toneClass, type Tone } from '../ui/tone'
import styles from '../../styles/sections/FacilityFeature.module.css'

type FacilityFeatureProps = Facility & {
  /** image on the left instead of the right */
  reversed?: boolean
  tone?: Tone
}

// Two-column feature: copy + actions on one side, a large rounded photo on the other.
export function FacilityFeature({ id, eyebrow, before, highlight, body, image, imageAlt, cta, reversed, tone }: FacilityFeatureProps) {
  const enquire = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${before}${highlight}`)}`

  return (
    <section id={id} className={`section ${styles.feature} ${toneClass(tone)}`}>
      <div className={reversed ? `container ${styles.grid} ${styles.reversed}` : `container ${styles.grid}`}>
        <Reveal from="up" className={styles.copy}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">
            {before}
            <Highlight>{highlight}</Highlight>
          </h2>
          {body.map((p) => (
            <p key={p} className="body">
              {p}
            </p>
          ))}
          <div className={styles.actions}>
            <Button variant="outline" href={enquire}>
              Enquire
            </Button>
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </Reveal>

        <Reveal from={reversed ? 'left' : 'right'} className={styles.media}>
          <img className="photo" src={image} alt={imageAlt} loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}
