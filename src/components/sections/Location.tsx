import { location, site } from '../../data/content'
import { Highlight } from '../ui/Highlight'
import { Icon } from '../ui/Icon'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Location.module.css'

// Contact & location: heading + map pills on top, office details left, Google Map right.
export function Location({ tone }: { tone?: Tone }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} data-reveal id="location" className={`section ${toneClass(tone)}`}>
      <div className="container">
        <header className={`${styles.header} reveal-up`}>
          <div className={styles.heading}>
            <p className="eyebrow">{location.eyebrow}</p>
            <h2 className="h2">
              {location.before}
              <Highlight>{location.highlight}</Highlight>
            </h2>
          </div>
          <div className={styles.pills}>
            <a className={styles.pill} href={location.mapLink} target="_blank" rel="noreferrer">
              <Icon name="map-pin" size={16} />
              {location.addressLabel}
            </a>
            <a className={styles.pill} href={location.directions} target="_blank" rel="noreferrer">
              Get directions
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </header>

        <div className={styles.grid}>
          <div className={`${styles.info} reveal-up reveal-delay`}>
            <div>
              <h3 className={styles.office}>{location.office}</h3>
              <address className={styles.address}>
                {site.name}
                <br />
                {site.address}
              </address>
            </div>

            <p className={styles.row}>
              <Icon name="clock" size={20} />
              {location.hours}
            </p>

            <ul className={styles.contacts}>
              <li>
                <a className={styles.row} href={`tel:${site.phone}`}>
                  <Icon name="phone" size={20} />
                  {site.phone}
                </a>
              </li>
              <li>
                <a className={styles.row} href={`mailto:${site.email}`}>
                  <Icon name="mail" size={20} />
                  {site.email}
                </a>
              </li>
            </ul>

            <p className={styles.note}>{location.note}</p>
          </div>

          <div className={`${styles.map} reveal-right`}>
            <iframe
              title={`Map showing ${site.name}`}
              src={location.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
