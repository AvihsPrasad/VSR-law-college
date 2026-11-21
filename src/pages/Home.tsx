import { Hero } from '../components/sections/Hero'
import { Founders } from '../components/sections/Founders'
import { WhyVsr } from '../components/sections/WhyVsr'
import { Announcements } from '../components/sections/Announcements'
import { Affiliations, Programmes } from '../components/sections/Programmes'
import { CampusGallery } from '../components/sections/CampusGallery'
import { FunFacts } from '../components/sections/FunFacts'
import { Admission } from '../components/sections/Admission'

export function Home() {
  return (
    <>
      {/* Backgrounds alternate white / gray; WhyVsr is the maroon band (.claude/DESIGN.md §2). */}
      <Hero />
      <Affiliations tone="gray" />
      <Founders />
      <WhyVsr />
      <Announcements />
      <Programmes tone="gray" />
      <CampusGallery />
      <FunFacts tone="gray" />
      <Admission />
    </>
  )
}
