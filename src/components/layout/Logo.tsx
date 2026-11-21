import { Link } from 'react-router-dom'
import { paths } from '../../data/content'
import { Icon } from '../ui/Icon'
import styles from '../../styles/layout/Logo.module.css'

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link className={onDark ? `${styles.logo} ${styles.logoDark}` : styles.logo} to={paths.home} aria-label="VSR Law College home">
      <Icon name="landmark" size={30} />
      <span>
        <span className={styles.logoAccent}>VSR</span> LAW COLLEGE
      </span>
    </Link>
  )
}
