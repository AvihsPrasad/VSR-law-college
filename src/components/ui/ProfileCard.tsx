import { employmentLabels, site, type StaffMember } from '../../data/content'
import { Icon, type IconName } from './Icon'
import styles from '../../styles/ui/ProfileCard.module.css'

const HONORIFICS = /^(dr|sri|smt|shri|mr|mrs|ms|prof)\.?$/i

// "Dr. K. Rajani Kumari" → "RK": skip titles and single-letter initials when possible.
function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => !HONORIFICS.test(w))
  const full = words.filter((w) => w.replace('.', '').length > 1)
  const pick = full.length >= 2 ? full : words
  const first = pick[0]?.[0] ?? ''
  const last = pick.length > 1 ? pick[pick.length - 1][0] : ''
  return (first + last).toUpperCase()
}

type Stat = { label: string; icon: IconName; value?: string }

export function ProfileCard({ name, role, employment, scale, bio, experience, qualification, photo }: StaffMember) {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`Attn: ${name}, ${role}`)}`
  // Only show the details we actually have for this person.
  const stats = (
    [
      { label: 'Pay scale', icon: 'landmark', value: scale },
      { label: 'Experience', icon: 'briefcase', value: experience },
      { label: 'Qualification', icon: 'graduation-cap', value: qualification },
    ] satisfies Stat[]
  ).filter((s) => s.value)

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {photo ? (
          <img className="photo" src={photo} alt={`${name}, ${role}`} loading="lazy" />
        ) : (
          <span className={styles.monogram} aria-hidden="true">
            {initials(name)}
          </span>
        )}
        {employment && <span className={`${styles.badge} ${styles[employment]}`}>{employmentLabels[employment]}</span>}
      </div>

      <div className={styles.body}>
        <p className="eyebrow">{role}</p>
        <h3 className={styles.name}>{name}</h3>
        {bio && <p className="small">{bio}</p>}
      </div>

      <div className={styles.footer}>
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="visually-hidden">{s.label}</dt>
              <Icon name={s.icon} size={18} />
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <a className={styles.action} href={mail} aria-label={`Email ${name}, ${role}`}>
          Email
        </a>
      </div>
    </article>
  )
}
