# VSR Law College — website

React + TypeScript (Vite) build of the **VSR Law College — Homepage (Classic)** design in Figma:
https://www.figma.com/design/d90b8I1OV6iXzYgbXjXtEP/Law-College-Landing-Page?node-id=30-181

**Design guide:** see [.claude/DESIGN.md](.claude/DESIGN.md) for colours, type, spacing, components and conventions.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

| Path | What it is |
| --- | --- |
| `src/styles/` | **All styling lives here.** `tokens.css` (colours, spacing, type — mirrors the Figma "VSR Classic" variables), `global.css` (reset + shared helpers like `.container`, `.section`, `.eyebrow`), and CSS modules grouped as `layout/`, `sections/`, `ui/` |
| `src/data/content.ts` | All page copy and links (facts from vsrlawcollege.org), plus route `paths` and the header `navLinks` — edit text here |
| `src/App.tsx` | Route table (react-router): each header menu item maps to its own path |
| `src/components/layout/` | `Layout` (shared shell with `<Outlet />`), `Header`, `Footer`, `Logo`, `PageHeader` (inner-page banner) |
| `src/components/sections/` | Page sections, reused across pages |
| `src/components/ui/` | Building blocks matching the Figma components: `Button`, `WhyCard`, `NewsRow`, `ProgramRow`, `OutlineStat`, `Highlight`, `Icon` |
| `src/pages/` | One component per route: `Home`, `About`, `Admissions`, `Faculty`, `Facilities`, `Naac`, `NotFound`, plus `SubPage` — the shared template for every dropdown child page |
| `src/assets/photos/` | Placeholder photos (AI-generated in Figma) — replace with real campus photos, keeping the file names |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (all sections) |
| `/about` | About |
| `/faculty` | Faculty (header menu) |
| `/facilities` | Facilities (header menu) |
| `/naac-iqac` | NAAC & IQAC (header menu) |
| `/admissions` | Admissions (reached from the "Admission enquiry" buttons) |
| `/courses/…` | Courses dropdown: `llb-3-years`, `ba-llb-5-years` |
| `/research/…` | R&D dropdown: `books-articles-publications`, `seminars-workshops-conferences`, `mous`, `linkages-collaborative-activities` |
| `/statutory-bodies/…` | Statutory Bodies dropdown: `cells`, `committees`, `associations` |
| `/student-corner/…` | Student Corner dropdown: `time-table`, `lms`, `programme-syllabus`, `pos-psos-cos`, `addon-certificate-courses`, `question-bank`, `student-centric-activities`, `ia-marks`, `study-material` |

## Notes

- Routing uses browser history (`/about`, not `#/about`). When deploying, configure the host to serve `index.html` for unknown paths (SPA fallback), otherwise refreshing an inner page returns 404.

- The admission enquiry form opens the visitor's mail app (`mailto:`) — there is no backend yet.
- Links in the "Why VSR", announcements, programmes and footer sections point to the existing pages on vsrlawcollege.org.
