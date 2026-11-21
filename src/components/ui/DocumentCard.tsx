import type { DocumentFile } from '../../data/content'
import { Icon } from './Icon'
import styles from '../../styles/ui/DocumentCard.module.css'

// Page with a folded corner and a maroon "PDF" tag, drawn in tokens so it follows the brand.
function PdfGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 56 64" aria-hidden="true">
      <path className={styles.sheet} d="M10 2h26l14 14v42a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" />
      <path className={styles.fold} d="M36 2v10a4 4 0 0 0 4 4h10Z" />
      <path className={styles.lines} d="M14 12h14M14 18h10" />
      <rect className={styles.tag} x="0" y="30" width="38" height="18" rx="3" />
      <text className={styles.tagText} x="19" y="43.5" textAnchor="middle">
        PDF
      </text>
    </svg>
  )
}

// Whole card opens the PDF in a new tab (stretched title link); the round button downloads it.
export function DocumentCard({ title, href, fileName, pages, size, kind, date }: DocumentFile) {
  return (
    <article className={styles.card}>
      <div className={styles.preview}>
        {kind && <span className={styles.kind}>{kind}</span>}
        <PdfGlyph />
      </div>
      <div className={styles.footer}>
        <div className={styles.text}>
          <h3 className={styles.title}>
            <a className={styles.open} href={href} target="_blank" rel="noopener noreferrer">
              {title}
              <span className="visually-hidden"> (PDF, opens in a new tab)</span>
            </a>
          </h3>
          <p className={styles.meta}>
            {date ?? 'PDF'} · {pages} {pages === 1 ? 'page' : 'pages'} · <span className={styles.nowrap}>{size}</span>
          </p>
        </div>
        <a className={styles.download} href={href} download={fileName} aria-label={`Download ${title} (PDF, ${size})`}>
          <Icon name="download" size={18} />
        </a>
      </div>
    </article>
  )
}
