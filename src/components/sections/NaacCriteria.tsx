import { useId, useState } from 'react'
import type { NaacCriterion, NaacFile } from '../../data/content'
import { Highlight } from '../ui/Highlight'
import { Icon } from '../ui/Icon'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/NaacCriteria.module.css'

type NaacCriteriaProps = {
  eyebrow: string
  before: string
  highlight: string
  body: string
  criteria: NaacCriterion[]
}

// Link-out chip: file-type badge, label, size and an external-link arrow.
function FileLink({ label, href, size }: NaacFile) {
  const type = href.split('.').pop()?.toLowerCase() === 'pdf' ? 'PDF' : 'DOC'
  return (
    <a className={styles.file} href={href} target="_blank" rel="noopener noreferrer">
      <span className={`${styles.type} ${type === 'DOC' ? styles.doc : ''}`} aria-hidden="true">
        {type}
      </span>
      <span className={styles.fileLabel}>{label}</span>
      {size && <span className={styles.size}>{size}</span>}
      <Icon name="arrow-up-right" size={16} className={styles.external} />
      <span className="visually-hidden">
        ({type === 'PDF' ? 'PDF' : 'Word document'}
        {size ? `, ${size}` : ''}, opens in a new tab)
      </span>
    </a>
  )
}

function FileList({ files }: { files: NaacFile[] }) {
  return (
    <ul className={styles.files}>
      {files.map((file) => (
        <li key={file.href}>
          <FileLink {...file} />
        </li>
      ))}
    </ul>
  )
}

function Criterion({ numeral, title, metrics, defaultOpen }: NaacCriterion & { defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const docs = metrics.reduce((n, m) => n + m.files.length + (m.more?.files.length ?? 0), 0)

  return (
    <div className={open ? `${styles.item} ${styles.open}` : styles.item}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={`${id}-trigger`}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.numeral} aria-hidden="true">
            {numeral}
          </span>
          <span className={styles.titles}>
            <span className={styles.label}>Criterion {numeral}</span>
            <span className={styles.title}>{title}</span>
          </span>
          <span className={styles.count}>
            {metrics.length} metrics · {docs} documents
          </span>
          <span className={styles.chevron} aria-hidden="true">
            <Icon name="chevron-right" size={18} />
          </span>
        </button>
      </h3>
      {/* grid-rows 0fr → 1fr animates the height; inert keeps closed links out of the tab order */}
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} className={styles.panel} inert={!open}>
        <div className={styles.panelInner}>
          <ol className={styles.metrics}>
            {metrics.map((m) => (
              <li key={m.code} className={styles.metric}>
                <span className={styles.code}>{m.code}</span>
                <div className={styles.metricBody}>
                  <p className={styles.metricText}>{m.text}</p>
                  <FileList files={m.files} />
                  {m.more && (
                    <>
                      <p className={styles.moreTitle}>{m.more.title}</p>
                      <FileList files={m.more.files} />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

// Grey band of accordions, one per NAAC criterion; several can be open at once.
export function NaacCriteria({ eyebrow, before, highlight, body, criteria }: NaacCriteriaProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal className="section bg-gray">
      <div className="container">
        <div className={`${styles.intro} reveal-up`}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">
            {before}
            <Highlight>{highlight}</Highlight>
          </h2>
          <p className="body">{body}</p>
        </div>
        <div className={`${styles.list} stagger`}>
          {criteria.map((c, i) => (
            <Criterion key={c.numeral} {...c} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
