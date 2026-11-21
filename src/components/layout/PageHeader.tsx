import { Link } from 'react-router-dom'
import { paths } from '../../data/content'
import styles from '../../styles/layout/PageHeader.module.css'

type PageHeaderProps = {
  eyebrow: string
  title: string
  /** non-link crumbs between Home and the current page, e.g. a dropdown group name */
  trail?: string[]
}

export function PageHeader({ eyebrow, title, trail = [] }: PageHeaderProps) {
  return (
    <section className={styles.banner}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link to={paths.home}>Home</Link>
          {trail.map((t) => (
            <span key={t} className={styles.trail}>
              <span aria-hidden="true">/</span>
              <span>{t}</span>
            </span>
          ))}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  )
}
