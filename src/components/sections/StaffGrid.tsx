import type { StaffMember } from '../../data/content'
import { Highlight } from '../ui/Highlight'
import { ProfileCard } from '../ui/ProfileCard'
import { toneClass, type Tone } from '../ui/tone'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/StaffGrid.module.css'

type StaffGridProps = {
  eyebrow: string
  before: string
  highlight: string
  members: StaffMember[]
  tone?: Tone
}

export function StaffGrid({ eyebrow, before, highlight, members, tone }: StaffGridProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} data-reveal className={`section ${toneClass(tone)}`}>
      <div className="container">
        <header className={`${styles.header} reveal-up`}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">
            {before}
            <Highlight>{highlight}</Highlight>
          </h2>
        </header>
        <ul className={`${styles.grid} stagger`}>
          {members.map((m) => (
            <li key={m.id}>
              <ProfileCard {...m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
