import type { MenuGroup, StatutoryBody, SubPage as SubPageData, SubPageSection } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { DocumentYears, YearIndex } from '../components/sections/DocumentYears'
import { Button } from '../components/ui/Button'
import { DocumentCard } from '../components/ui/DocumentCard'
import { Highlight } from '../components/ui/Highlight'
import { Icon } from '../components/ui/Icon'
import { JusticeEmblem } from '../components/ui/JusticeEmblem'
import { toneClass, type Tone } from '../components/ui/tone'
import { useReveal } from '../components/ui/useReveal'
import styles from '../styles/pages/SubPage.module.css'

type SubPageProps = { group: MenuGroup; page: SubPageData }

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={`${styles.points} stagger`}>
      {items.map((item, i) => (
        <li key={item}>
          <span className={styles.index}>{String(i + 1).padStart(2, '0')}.</span>
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </ol>
  )
}

// Accent the last word of a title, matching the site's heading pattern.
function AccentTitle({ title }: { title: string }) {
  const split = title.lastIndexOf(' ')
  return (
    <h2 className="h2">
      {split > 0 && title.slice(0, split + 1)}
      <Highlight>{split > 0 ? title.slice(split + 1) : title}</Highlight>
    </h2>
  )
}

// h3 + optional callout text + optional numbered list, per block.
function Blocks({ sections }: { sections: SubPageSection[] }) {
  return (
    <div className={`${styles.sections} stagger`}>
      {sections.map((section) => (
        <div key={section.title} className={styles.block}>
          <h3 className={styles.blockTitle}>{section.title}</h3>
          {section.text && <p className={styles.callout}>{section.text}</p>}
          {section.items && <NumberedList items={section.items} />}
        </div>
      ))}
    </div>
  )
}

// One cell / committee / association: icon tile, intro and helplines left, its blocks right.
function BodySection({ body, eyebrow, tone }: { body: StatutoryBody; eyebrow: string; tone: Tone }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id={body.id} data-reveal className={`section ${toneClass(tone)}`}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} ${styles.bodyCopy} reveal-up`}>
          <span className={styles.bodyIcon} aria-hidden="true">
            <Icon name={body.icon} size={24} />
          </span>
          <p className="eyebrow">{body.since ? `${eyebrow} · Since ${body.since}` : eyebrow}</p>
          <AccentTitle title={body.name} />
          {body.intro.map((para) => (
            <p key={para} className="body">
              {para}
            </p>
          ))}
          {body.contacts && (
            <div className={styles.contacts}>
              {body.contacts.map((c) => (
                <a key={c.href} className={styles.contact} href={c.href}>
                  <Icon name="phone" size={18} />
                  <span>
                    <span className={styles.contactLabel}>{c.label}</span>
                    <span className={styles.contactValue}>{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
        <Blocks sections={body.blocks} />
      </div>
    </section>
  )
}

// Shared template for every dropdown child page (Courses, R&D, Statutory Bodies, Student Corner).
export function SubPage({ group, page }: SubPageProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <>
      <PageHeader eyebrow={page.label} title={page.label} trail={[group.label]} />
      <section ref={ref} data-reveal className="section bg-white">
        <div className={`container ${styles.grid}`}>
          <div className={`${styles.copy} reveal-up`}>
            <p className="eyebrow">{group.label}</p>
            <AccentTitle title={page.label} />
            <p className="body">{page.summary}</p>
            {page.download && (
              <div>
                <Button href={page.download.href} download={page.download.fileName} icon="download">
                  {page.download.label}
                </Button>
              </div>
            )}
            {page.emblem && <JusticeEmblem className={styles.emblem} />}
          </div>

          {page.bodies ? (
            <ol className={`${styles.points} stagger`}>
              {page.bodies.map((body, i) => (
                <li key={body.id}>
                  <span className={styles.index}>{String(i + 1).padStart(2, '0')}.</span>
                  <a className={`${styles.text} ${styles.bodyLink}`} href={`#${body.id}`}>
                    {body.name}
                  </a>
                  <Icon name="chevron-right" size={18} className={styles.bodyArrow} />
                </li>
              ))}
            </ol>
          ) : page.documentGroups ? (
            <YearIndex groups={page.documentGroups} />
          ) : page.documents ? (
            <ul className={`${styles.documents} stagger`}>
              {page.documents.map((doc) => (
                <li key={doc.href}>
                  <DocumentCard {...doc} />
                </li>
              ))}
            </ul>
          ) : page.sections ? (
            <Blocks sections={page.sections} />
          ) : (
            page.points && <NumberedList items={page.points} />
          )}
        </div>
      </section>
      {page.documentGroups && <DocumentYears groups={page.documentGroups} />}
      {/* bands alternate grey/white after the white intro */}
      {page.bodies?.map((body, i) => (
        <BodySection key={body.id} body={body} eyebrow={page.label} tone={i % 2 === 0 ? 'gray' : 'white'} />
      ))}
    </>
  )
}
