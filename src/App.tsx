import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { menuGroups, paths, subPath } from './data/content'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Faculty } from './pages/Faculty'
import { Admissions } from './pages/Admissions'
import { Naac } from './pages/Naac'
import { Facilities } from './pages/Facilities'
import { SubPage } from './pages/SubPage'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.about} element={<About />} />
          <Route path={paths.faculty} element={<Faculty />} />
          <Route path={paths.admissions} element={<Admissions />} />
          <Route path={paths.facilities} element={<Facilities />} />
          <Route path={paths.naac} element={<Naac />} />
          {/* One page per dropdown child: /courses/…, /research/…, /student-corner/… */}
          {Object.values(menuGroups).flatMap((group) =>
            group.pages.map((page) => (
              <Route key={page.slug} path={subPath(group, page)} element={<SubPage group={group} page={page} />} />
            )),
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
