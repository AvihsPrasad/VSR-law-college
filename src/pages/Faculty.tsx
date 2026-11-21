import { faculty, pageHeaders } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { StaffGrid } from '../components/sections/StaffGrid'

export function Faculty() {
  return (
    <>
      <PageHeader {...pageHeaders.faculty} />
      <StaffGrid {...faculty.teaching} />
      <StaffGrid {...faculty.support} tone="gray" />
    </>
  )
}
