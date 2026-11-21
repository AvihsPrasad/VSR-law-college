import { hero } from '../../data/content'
import student from '../../assets/photos/student.jpg'
import { Button } from '../ui/Button'
import { Highlight } from '../ui/Highlight'
import { Icon } from '../ui/Icon'
import styles from '../../styles/sections/Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className={styles.title}>
          {hero.before}
          <Highlight>{hero.highlight}</Highlight>
          {hero.after}
        </h1>
        <p className="body">{hero.body}</p>
        <div>
          <Button href={hero.cta.href} download={hero.cta.fileName} icon="download">
            {hero.cta.label}
          </Button>
        </div>
        <ul className={styles.badges} aria-label="Accreditations">
          {hero.badges.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className={styles.media}>
        <span className={styles.arc} aria-hidden="true" />
        <img className={styles.photo} src={student} alt="Law student holding a stack of law books" />
        <div className={styles.estCard}>
          <Icon name="graduation-cap" size={32} />
          <div>
            <strong>{hero.established.value}</strong>
            <span className="small">{hero.established.label}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
