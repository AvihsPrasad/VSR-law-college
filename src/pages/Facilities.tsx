import { facilities, pageHeaders } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { FacilityFeature } from '../components/sections/FacilityFeature'

export function Facilities() {
  return (
    <>
      <PageHeader {...pageHeaders.facilities} />
      {/* Alternate white / gray, and swap sides on every other facility. */}
      {facilities.map((f, i) => (
        <FacilityFeature key={f.id} {...f} reversed={i % 2 === 1} tone={i % 2 === 1 ? 'gray' : 'white'} />
      ))}
    </>
  )
}
