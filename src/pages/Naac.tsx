import { useSearchParams } from 'react-router-dom'
import { iqac, naac, pageHeaders, qualityTabs, type QualityTab } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { DocumentYears, YearIndex } from '../components/sections/DocumentYears'
import { NaacCriteria } from '../components/sections/NaacCriteria'
import { DocumentCard } from '../components/ui/DocumentCard'
import { Highlight } from '../components/ui/Highlight'
import { panelId, tabId } from '../components/ui/tabIds'
import { Tabs } from '../components/ui/Tabs'
import { useReveal } from '../components/ui/useReveal'
import styles from '../styles/pages/Naac.module.css'

function NaacPanel() {
  const ref = useReveal<HTMLElement>()
  return (
    <>
      <section ref={ref} data-reveal className="section bg-white">
        <div className={`container ${styles.grid}`}>
          <div className={`${styles.copy} reveal-up`}>
            <p className="eyebrow">{naac.eyebrow}</p>
            <h2 className="h2">
              {naac.before}
              <Highlight>{naac.highlight}</Highlight>
              {naac.after}
            </h2>
            <p className="body">{naac.body}</p>
          </div>
          <ul className={`${styles.documents} stagger`}>
            {naac.documents.map((doc) => (
              <li key={doc.href}>
                <DocumentCard {...doc} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NaacCriteria
        eyebrow={naac.criteriaEyebrow}
        before={naac.criteriaBefore}
        highlight={naac.criteriaHighlight}
        body={naac.criteriaBody}
        criteria={naac.criteria}
      />
    </>
  )
}

function IqacPanel() {
  const ref = useReveal<HTMLElement>()
  return (
    <>
      <section ref={ref} data-reveal className="section bg-white">
        <div className={`container ${styles.grid}`}>
          <div className={`${styles.copy} reveal-up`}>
            <p className="eyebrow">{iqac.eyebrow}</p>
            <h2 className="h2">
              {iqac.before}
              <Highlight>{iqac.highlight}</Highlight>
              {iqac.after}
            </h2>
            <p className="body">{iqac.body}</p>
          </div>
          <YearIndex groups={iqac.groups} unit="programme" />
        </div>
      </section>
      <DocumentYears groups={iqac.groups} unit="programme" />
    </>
  )
}

// The tab lives in ?tab= so each one can be linked to directly.
export function Naac() {
  const [params, setParams] = useSearchParams()
  const active: QualityTab = params.get('tab') === 'iqac' ? 'iqac' : 'naac'

  return (
    <>
      <PageHeader {...pageHeaders.naac} />
      <div className={`bg-white ${styles.tabBar}`}>
        <div className="container">
          <Tabs
            tabs={qualityTabs}
            active={active}
            onChange={(tab) => setParams(tab === 'naac' ? {} : { tab }, { replace: true })}
            label="NAAC and IQAC"
          />
        </div>
      </div>
      <div key={active} id={panelId(active)} role="tabpanel" aria-labelledby={tabId(active)} className={styles.panel}>
        {active === 'iqac' ? <IqacPanel /> : <NaacPanel />}
      </div>
    </>
  )
}
