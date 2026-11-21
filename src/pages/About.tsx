import { pageHeaders } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { Story } from '../components/sections/Story'
import { Founders } from '../components/sections/Founders'
import { FunFacts } from '../components/sections/FunFacts'
import { Location } from '../components/sections/Location'

export function About() {
  return (
    <>
      <PageHeader {...pageHeaders.about} />
      <Story />
      <Founders tone="gray" />
      <FunFacts />
      <Location tone="gray" />
    </>
  )
}
