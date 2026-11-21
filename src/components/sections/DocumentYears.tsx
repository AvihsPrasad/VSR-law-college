import { useRef, useState } from 'react'
import type { DocumentGroup } from '../../data/content'
import { Button } from '../ui/Button'
import { DocumentCard } from '../ui/DocumentCard'
import { LinkRow } from '../ui/LinkRow'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/DocumentYears.module.css'

type YearsProps = {
  groups: DocumentGroup[]
  /** what each item is called in the counts, e.g. "event" → "3 events" */
  unit?: string
}

const yearId = (year: string) => `year-${year.replace(/\D+/g, '-')}`

function Count({ group, unit }: { group: DocumentGroup; unit: string }) {
  const n = (group.documents?.length ?? 0) + (group.links?.length ?? 0)
  return (
    <span className={styles.count}>
      {n} {n === 1 ? unit : `${unit}s`}
    </span>
  )
}

// Numbered list of the years, each linking down to its block in DocumentYears.
export function YearIndex({ groups, unit = 'event' }: YearsProps) {
  return (
    <ol className={`${styles.index} stagger`}>
      {groups.map((group, i) => (
        <li key={group.year}>
          <span className={styles.number}>{String(i + 1).padStart(2, '0')}.</span>
          <a className={styles.yearLink} href={`#${yearId(group.year)}`}>
            {group.year}
          </a>
          <Count group={group} unit={unit} />
        </li>
      ))}
    </ol>
  )
}

// Each year shows one row to start (3 cards / 4 post rows); "Load more" reveals the rest.
const CARD_LIMIT = 3
const LINK_LIMIT = 4

function YearBlock({ group, unit }: { group: DocumentGroup; unit: string }) {
  const [expanded, setExpanded] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const docs = group.documents ?? []
  const links = group.links ?? []
  const shownDocs = expanded ? docs : docs.slice(0, CARD_LIMIT)
  const shownLinks = expanded ? links : links.slice(0, LINK_LIMIT)
  const hidden = docs.length - shownDocs.length + links.length - shownLinks.length

  function loadMore() {
    const firstNew = shownDocs.length < docs.length ? shownDocs.length : docs.length + shownLinks.length
    setExpanded(true)
    // The button disappears, so move focus to the first item that just appeared.
    requestAnimationFrame(() => listRef.current?.querySelectorAll('li')[firstNew]?.querySelector('a')?.focus())
  }

  return (
    <div id={yearId(group.year)} className={styles.year}>
      <h3 className={`${styles.yearTitle} reveal-up`}>
        {group.year}
        <Count group={group} unit={unit} />
      </h3>
      <div ref={listRef} className={styles.year}>
        {shownDocs.length > 0 && (
          <ul className={`${styles.cards} stagger`}>
            {shownDocs.map((doc) => (
              <li key={`${doc.href}|${doc.title}`}>
                <DocumentCard {...doc} />
              </li>
            ))}
          </ul>
        )}
        {shownLinks.length > 0 && (
          <ul className={`${styles.links} stagger`}>
            {shownLinks.map((link) => (
              <li key={link.href}>
                <LinkRow {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {hidden > 0 && (
        <div className={styles.more}>
          <Button variant="outline" icon="plus" onClick={loadMore}>
            Load more ({hidden})
          </Button>
        </div>
      )}
    </div>
  )
}

// Grey band: one heading per academic year, then its PDF cards and Facebook post rows.
export function DocumentYears({ groups, unit = 'event' }: YearsProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal className="section bg-gray">
      <div className={`container ${styles.years}`}>
        {groups.map((group) => (
          <YearBlock key={group.year} group={group} unit={unit} />
        ))}
      </div>
    </section>
  )
}
