import group from '../../assets/photos/group.jpg'
import study from '../../assets/photos/study.jpg'
import library from '../../assets/photos/library.jpg'
import gavel from '../../assets/photos/gavel.jpg'
import { site } from '../../data/content'
import { Icon } from '../ui/Icon'
import { toneClass, type Tone } from '../ui/tone'
import styles from '../../styles/sections/CampusGallery.module.css'

const youtube = site.social.find((s) => s.icon === 'youtube')!.url

export function CampusGallery({ tone }: { tone?: Tone }) {
  return (
    <section className={toneClass(tone)} aria-label="Campus gallery">
      <div className={styles.gallery}>
        <div className={styles.hero}>
          <img loading="lazy" className="photo" src={group} alt="Students walking together across the campus" />
          <p className={styles.outline} aria-hidden="true">
            Overview / Campus
          </p>
          <a className={styles.play} href={youtube} target="_blank" rel="noreferrer">
            <Icon name="play" size={24} />
            <span className="visually-hidden">Watch campus videos on YouTube</span>
          </a>
        </div>
        <div className={styles.strip}>
          <img loading="lazy" className="photo" src={study} alt="Student preparing for exams" />
          <img loading="lazy" className={`photo ${styles.raised}`} src={library} alt="Law library reading room" />
          <img loading="lazy" className="photo" src={gavel} alt="Gavel and scales of justice" />
        </div>
      </div>
    </section>
  )
}
