import { Link } from 'react-router-dom'
import { footer, site } from '../../data/content'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import styles from '../../styles/layout/Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div className={styles.about}>
            <h3>VSR Law College</h3>
            <p>{footer.about}</p>
            <ul className={styles.social}>
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/') ? <Link to={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3>Get in touch</h3>
            <ul>
              <li>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <address>{site.address}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <Logo onDark />
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
