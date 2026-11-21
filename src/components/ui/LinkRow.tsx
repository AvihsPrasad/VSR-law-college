import type { SocialLink } from '../../data/content'
import { Icon } from './Icon'
import styles from '../../styles/ui/LinkRow.module.css'

const KANNADA = /[ಀ-೿]/

// One Facebook post/video as a full-width link row: brand tile, title, source tag.
export function LinkRow({ title, href, kind }: SocialLink) {
  return (
    <a className={styles.row} href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <span className={styles.tile}>
        <Icon name="facebook" size={20} />
      </span>
      <span className={styles.text}>
        <span className={styles.title} lang={KANNADA.test(title) ? 'kn' : undefined}>
          {title}
        </span>
        <span className={styles.meta}>
          <span className={styles.dot} aria-hidden="true" />
          {kind === 'video' ? 'Video' : 'Post'} on Facebook
          <span className="visually-hidden"> (opens in a new tab)</span>
        </span>
      </span>
      <span className={styles.source} aria-hidden="true">
        facebook / {kind}
      </span>
      <Icon name="arrow-up-right" size={18} className={styles.arrow} />
    </a>
  )
}
