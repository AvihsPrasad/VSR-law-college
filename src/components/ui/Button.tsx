import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import styles from '../../styles/ui/Button.module.css'

type Variant = 'primary' | 'outline' | 'light' | 'ghost-dark'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  type?: 'button' | 'submit'
  className?: string
  icon?: IconName
  /** File name to save as — turns the link into a download instead of navigation. */
  download?: string
  /** Only for the plain <button> (no href). */
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  className,
  icon = 'arrow-up-right',
  download,
  onClick,
}: ButtonProps) {
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  const content = (
    <>
      <span className={styles.roll}>
        <span className={styles.rollText}>{children}</span>
        <span className={styles.rollClone} aria-hidden="true">
          {children}
        </span>
      </span>
      <Icon name={icon} size={14} />
    </>
  )
  if (href && download) {
    return (
      <a className={cls} href={href} download={download}>
        {content}
      </a>
    )
  }
  // Paths like "/admissions" are app routes; anything else (mailto:, https:, #) is a plain link.
  if (href?.startsWith('/')) {
    return (
      <Link className={cls} to={href}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a className={cls} href={href} {...(href.endsWith('.pdf') && { target: '_blank', rel: 'noreferrer' })}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} type={type} onClick={onClick}>
      {content}
    </button>
  )
}
