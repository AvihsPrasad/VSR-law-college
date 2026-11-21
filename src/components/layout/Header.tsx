import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks, paths, site, subPath, type MenuGroup, type SubPage } from '../../data/content'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import styles from '../../styles/layout/Header.module.css'

// How many items get the large treatment (icon tile + description); the rest go in the grey strip.
const FEATURED = 4

export function Header() {
  const [open, setOpen] = useState(false)
  // Dropdown opened by click/keyboard/tap (hover opens via CSS on desktop).
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  // After picking a child, keep that dropdown shut until the pointer leaves it.
  const [suppressed, setSuppressed] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  const closeAll = () => {
    setOpen(false)
    setOpenGroup(null)
  }

  // Escape closes the mobile menu and any open dropdown.
  useEffect(() => {
    if (!open && !openGroup) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setOpenGroup(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, openGroup])

  // Clicking anywhere outside the nav closes an open dropdown.
  useEffect(() => {
    if (!openGroup) return
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [openGroup])

  function pickChild(group: MenuGroup, e: ReactMouseEvent<HTMLAnchorElement>) {
    e.currentTarget.blur()
    setSuppressed(group.label)
    closeAll()
  }

  function renderItem(group: MenuGroup, page: SubPage, featured: boolean) {
    return (
      <NavLink
        to={subPath(group, page)}
        className={({ isActive }) => (isActive ? `${styles.item} ${styles.active}` : styles.item)}
        onClick={(e) => pickChild(group, e)}
      >
        <span className={styles.tile}>
          <Icon name={page.icon} size={22} />
        </span>
        <span className={styles.itemText}>
          <span className={styles.itemTitle}>
            {page.label}
            <Icon name="chevron-right" size={16} className={styles.arrow} />
          </span>
          {featured && <span className={styles.itemDesc}>{page.blurb}</span>}
        </span>
      </NavLink>
    )
  }

  return (
    <header id="top">
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <p>Welcome to {site.name}</p>
          <div className={styles.topBarLinks}>
            <a href={`tel:${site.phone}`}>
              <Icon name="phone" size={14} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={14} />
              {site.email}
            </a>
            <span>
              <a href={site.kannadaUrl} lang="kn">
                ಕನ್ನಡ
              </a>
              {'  |  '}English
            </span>
          </div>
        </div>
      </div>

      <nav ref={navRef} className={styles.nav} aria-label="Main">
        <div className={`container ${styles.navInner}`}>
          <Logo />
          <ul className={open ? `${styles.links} ${styles.linksOpen}` : styles.links}>
            {navLinks.map((item) => {
              if (!item.group) {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      end={item.href === paths.home}
                      className={({ isActive }) => (isActive ? `${styles.topLink} ${styles.active}` : styles.topLink)}
                      onClick={closeAll}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              const group = item.group
              const expanded = openGroup === group.label
              const inGroup = pathname.startsWith(`${group.base}/`)
              const menuId = `menu-${group.base.slice(1)}`
              const itemCls = [styles.hasMenu, expanded && styles.expanded, suppressed === group.label && styles.suppressed]
                .filter(Boolean)
                .join(' ')
              const triggerCls = [styles.topLink, styles.trigger, inGroup && styles.active].filter(Boolean).join(' ')

              return (
                <li key={item.label} className={itemCls} onMouseLeave={() => setSuppressed(null)}>
                  {/* Parent isn't a page: the button only opens the dropdown. */}
                  <button
                    type="button"
                    className={triggerCls}
                    aria-expanded={expanded}
                    aria-controls={menuId}
                    onClick={() => setOpenGroup(expanded ? null : group.label)}
                  >
                    {item.label}
                  </button>
                  <div id={menuId} className={styles.dropdown}>
                    <ul className={styles.featured}>
                      {group.pages.slice(0, FEATURED).map((page) => (
                        <li key={page.slug}>{renderItem(group, page, true)}</li>
                      ))}
                    </ul>
                    {group.pages.length > FEATURED && (
                      <ul className={styles.more}>
                        {group.pages.slice(FEATURED).map((page) => (
                          <li key={page.slug}>{renderItem(group, page, false)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  )
}
