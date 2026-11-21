import { pageHeaders } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { Admission } from '../components/sections/Admission'

export function Admissions() {
  return (
    <>
      <PageHeader {...pageHeaders.admissions} />
      <Admission />
    </>
  )
}
