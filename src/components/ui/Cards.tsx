import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import styles from '../../styles/ui/Cards.module.css'

type WhyCardProps = { icon: IconName; title: string; body: string; href: string; active?: boolean }

export function WhyCard({ icon, title, body, href, active = false }: WhyCardProps) {
  return (
    <article className={active ? `${styles.why} ${styles.whyActive}` : styles.why}>
      <Icon name={icon} size={44} />
      <h3 className={styles.whyTitle}>{title}</h3>
      <p className={styles.whyBody}>{body}</p>
      {/* App routes ("/about") use the router; other links (old site) stay plain anchors. */}
      {href.startsWith('/') ? (
        <Link className={styles.whyLink} to={href}>
          Read more <Icon name="arrow-up-right" size={14} />
        </Link>
      ) : (
        <a className={styles.whyLink} href={href}>
          Read more <Icon name="arrow-up-right" size={14} />
        </a>
      )}
    </article>
  )
}

type NewsRowProps = { number: string; title: string; meta: string; href: string }

export function NewsRow({ number, title, meta, href }: NewsRowProps) {
  return (
    <a className={styles.news} href={href}>
      <span className={styles.newsNumber}>{number}</span>
      <span className={styles.newsText}>
        <span className={styles.newsTitle}>{title}</span>
        <span className="small">{meta}</span>
      </span>
    </a>
  )
}

type ProgramRowProps = { index: string; title: string; body: string; href: string; active?: boolean }

export function ProgramRow({ index, title, body, href, active = false }: ProgramRowProps) {
  return (
    <a
      className={active ? `${styles.program} ${styles.programActive}` : styles.program}
      href={href}
      // PDFs open in a new tab so visitors don't lose their place on the site.
      {...(href.endsWith('.pdf') && { target: '_blank', rel: 'noreferrer' })}
    >
      <span className={styles.programIndex}>{index}</span>
      <span className={styles.programText}>
        <span className={styles.programTitle}>{title}</span>
        <span className="small">{body}</span>
      </span>
    </a>
  )
}

export function OutlineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className="small">{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  )
}
