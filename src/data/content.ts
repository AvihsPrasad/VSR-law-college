// All page copy lives here. Facts come from https://www.vsrlawcollege.org/
// (see ../../../files/content.json); links point at the existing site's pages.
import type { IconName } from '../components/ui/Icon'
import moot from '../assets/photos/moot.jpg'
import library from '../assets/photos/library.jpg'
import gavel from '../assets/photos/gavel.jpg'
import professor from '../assets/photos/professor.jpg'
import group from '../assets/photos/group.jpg'

const SITE = 'https://www.vsrlawcollege.org/index.php'

export const site = {
  name: "V.V. Sangha's Vunki Sannarudrappa Law College, Ballari",
  short: 'VSR LAW COLLEGE',
  phone: '08392-258368',
  email: 'vsrlawcollege@gmail.com',
  address: 'Y. Nagesh Shastry Nagar, Kappagal Road, Ballari – 583103, Karnataka',
  kannadaUrl: 'https://www.vsrlawcollege.org/kn/',
  social: [
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/VSLawCollege/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/vslawcollege_ballari' },
    { name: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@vslawcollege1329' },
  ] satisfies { name: string; icon: IconName; url: string }[],
}

export type Link = { label: string; href: string }

// One route per header menu item — App.tsx maps each path to a page.
export const paths = {
  home: '/',
  about: '/about',
  faculty: '/faculty',
  admissions: '/admissions',
  naac: '/naac-iqac',
  facilities: '/facilities',
} as const

// Child pages of dropdown menus. Copy is MOCK — replace `summary` and `points` with real content.
// `icon` + `blurb` show in the header dropdown; the first 4 items of a group get the blurb.
// A page shows `sections` when it has real content (text → highlighted box, items → numbered list),
// otherwise the mock `points` list.
export type SubPageSection = { title: string; text?: string; items?: string[] }
export type SubPage = {
  slug: string
  label: string
  icon: IconName
  blurb: string
  summary: string
  points?: string[]
  sections?: SubPageSection[]
  /** file in public/ offered as a download button under the summary */
  download?: { label: string; href: string; fileName: string }
  /** show the scales-of-justice emblem in the left column */
  emblem?: boolean
  /** named bodies (e.g. cells, committees): index in the right column, then one alternating band per body */
  bodies?: StatutoryBody[]
  /** PDFs in public/ shown as document cards in the right column (open in a new tab + download) */
  documents?: DocumentFile[]
  /** PDFs grouped by academic year: year index in the right column, then a grey band of card grids */
  documentGroups?: DocumentGroup[]
}
export type DocumentFile = {
  title: string
  href: string
  fileName: string
  pages: number
  size: string
  /** event type badge on the preview, e.g. "Workshop" */
  kind?: string
  /** shown instead of "PDF" in the meta line */
  date?: string
}
export type SocialLink = { title: string; href: string; kind: 'post' | 'video' }
/** one academic year: PDF cards and/or Facebook post rows */
export type DocumentGroup = { year: string; documents?: DocumentFile[]; links?: SocialLink[] }
export type MenuGroup = { label: string; base: string; pages: SubPage[] }
export type StatutoryBody = {
  id: string
  name: string
  icon: IconName
  since?: string
  intro: string[]
  blocks: SubPageSection[]
  contacts?: { label: string; value: string; href: string }[]
}

// The folder name has a space in it, so the URL needs it encoded.
const rdDocs = encodeURI('/RandD/Books_Articles _Publications')

// Reports from the old vsrlawcollege.org pages, one public/ folder per page.
// (Seminar reports and one IQAC report were Word files there, converted to PDF.)
const report =
  (folder: string) =>
  (file: string, title: string, kind: string, date: string, pages: number, size: string): DocumentFile => ({
    title,
    kind,
    date,
    pages,
    size,
    fileName: `${file}.pdf`,
    href: `/${folder}/${file}.pdf`,
  })
const seminar = report('RandD/Seminars_Workshops_Conferences')
const activity = report('RandD/Linkages_Collaborative_Activities')
const iqacReport = report('IQAC')

export const menuGroups = {
  courses: {
    label: 'Courses',
    base: '/courses',
    pages: [
      {
        slug: 'llb-3-years',
        label: '3 Years LL.B.', icon: 'scale', blurb: 'Bachelor’s degree in law for graduates.',
        summary: 'VSR Law College offers a bachelor’s degree in law after the completion of basic graduation.',
        download: { label: 'Download Syllabus', href: '/KSLU_3yrs_Syllabus.pdf', fileName: 'KSLU_3yrs_Syllabus.pdf' },
        emblem: true,
        sections: [
          {
            title: 'Eligibility for application',
            text: 'Graduate of any faculty, with a minimum of 45% for general candidates and 40% for SC/ST candidates.',
          },
          {
            title: 'Procedure for admission',
            items: [
              'Admission to the course is based on merit.',
              'All admissions are provisional and subject to sanction of eligibility by KSLU.',
              'All students seeking admission must apply in the prescribed form issued along with the prospectus.',
              'Incomplete forms will not be considered.',
              'Students must submit all documents in original.',
              'The full fee, as described in the fee structure, must be paid.',
              'A minimum of 75% attendance is compulsory as per KSLU rules.',
            ],
          },
        ],
      },
      {
        slug: 'ba-llb-5-years',
        label: '5 Years B.A., LL.B.', icon: 'graduation-cap', blurb: 'Integrated programme after PUC / 12th.',
        summary: 'An integrated five-year programme combining arts subjects with professional legal education, for students who have completed PUC / 12th standard.',
        points: [
          'Eligibility: PUC / 12th standard or equivalent, as per the KSLU ordinance.',
          'Ten semesters blending political science, history, economics and law.',
          'Includes moot court, internships and clinical legal education.',
        ],
      },
    ],
  },
  research: {
    label: 'R&D',
    base: '/research',
    pages: [
      {
        slug: 'books-articles-publications',
        label: 'Books, Articles & Publications', icon: 'book-open', blurb: 'Research published by our faculty.',
        summary: 'Books, journal articles and research papers published by our faculty members. Open a document to read it in your browser, or download a copy.',
        documents: [
          { title: 'Books & Articles', href: `${rdDocs}/Books_Articles.pdf`, fileName: 'Books_Articles.pdf', pages: 67, size: '42.7 MB' },
          { title: 'Publications', href: `${rdDocs}/Publications.pdf`, fileName: 'Publications.pdf', pages: 119, size: '27.8 MB' },
        ],
      },
      {
        slug: 'seminars-workshops-conferences',
        label: 'Seminars / Workshops / Conferences', icon: 'presentation', blurb: 'Academic events hosted and attended.',
        summary: 'Seminars, workshops and special lectures organised by the college, year by year. Open a report to read it in your browser, or download a copy.',
        documentGroups: [
          {
            year: '2017–2018',
            documents: [
              seminar('2017-18_Sharanaru', 'Constitution – Sharanaru (Saints)', 'Seminar', '18 Aug 2017', 8, '2.3 MB'),
              seminar('2017-18_Vachana_Kranthi', 'Vachana Kranthiya Punaruthhana', 'Funded Workshop', '26 Feb 2018', 9, '1.4 MB'),
            ],
          },
          {
            year: '2018–2019',
            documents: [
              seminar('2018-19_Women_Empowerment', 'Women Empowerment – Avala Hejje', 'Workshop', '17 Sep 2018', 14, '1.2 MB'),
              seminar('2018-19_Law_Training', 'Legal / Law Training', 'Workshop', '12 Oct 2018', 14, '1.2 MB'),
              seminar('2018-19_Pesonality_Devolopment', 'Personality Development', 'Workshop', '27 Mar 2019', 12, '1.4 MB'),
            ],
          },
          {
            year: '2019–2020',
            documents: [
              seminar('2019-20_Workshop_Law_Training', 'Legal / Law Training', 'Five-Day Workshop', '15–19 Aug 2019', 15, '1.7 MB'),
              seminar('2019-20_Reading_of_the_Constitution', 'Reading of the Constitution', 'Workshop', '25 Sep 2019', 13, '1.3 MB'),
              seminar('2019-20_fundamental_duties', 'Fundamental Duties', 'Workshop', '19 Feb 2020', 14, '1.9 MB'),
              seminar('2019-20_Women_Empowerment', 'Women Empowerment', 'Workshop', '4 Mar 2020', 11, '1.4 MB'),
              seminar('2019-20_Women_Health_and_Wellness', 'Women Health & Wellness', 'Workshop', '13 Mar 2020', 12, '1.4 MB'),
            ],
          },
          {
            year: '2020–2021',
            documents: [
              seminar('2020-21_Indian_Evidence_Act', 'Indian Evidence Act', 'National Seminar', '26 Sep 2020', 6, '0.9 MB'),
              seminar('2020-21_Hindu_Succession_Act', 'Hindu Succession Act', 'National Seminar', '30 Sep 2020', 7, '1.0 MB'),
              seminar('2020-21_intellectual_property_rights', 'Intellectual Property Rights', 'National Seminar', '6 Oct 2020', 6, '1.3 MB'),
              seminar('2020-21_Fundamental_Duties_of_Indian_Constitution', 'Fundamental Duties of Indian Constitution', 'National Seminar', '20 Oct 2020', 7, '1.2 MB'),
              seminar('2020-21_Swachh_Bharat_-_Healthy_Bharat', 'Swachh Bharat – Healthy Bharat', 'National Seminar', '31 Oct 2020', 9, '1.1 MB'),
              seminar('2020-21_Stress_Management_with_Yoga', 'Stress Management with Yoga during COVID-19', 'National Seminar', '12 Aug 2021', 5, '0.8 MB'),
              seminar('2020-21_Consumer_Protection_Act1', 'Key Features of the Consumer Protection Act, 2019', 'National Seminar', '17 Aug 2021', 6, '1.3 MB'),
            ],
          },
          {
            year: '2021–2022',
            documents: [
              seminar('2021-22_371J', 'Issues on Implementation of 371J Reservation', 'Special Lecture', '29 Jun 2022', 7, '1.3 MB'),
              seminar('2021-22_savaratha_sharanaur', 'Savirada Sharaneyaru', 'Workshop', '29 Jul 2022', 11, '1.6 MB'),
              seminar('2021-22_child_protection', 'Protection of Child Rights & POCSO Act', 'Workshop', '14 Sep 2022', 9, '3.7 MB'),
            ],
          },
        ],
      },
      {
        slug: 'mous',
        label: 'MoUs', icon: 'file-text', blurb: 'Agreements with partner institutions.',
        summary: 'Memoranda of Understanding signed with institutions to support teaching, research and outreach. Open a document to read it in your browser, or download a copy.',
        documents: [
          { title: 'List of MoUs', href: '/RandD/MoUs/List_of_MoUs.pdf', fileName: 'List_of_MoUs.pdf', pages: 5, size: '0.5 MB' },
          { title: 'E-Copies of MoUs', href: '/RandD/MoUs/E-Copies.pdf', fileName: 'E-Copies_of_MoUs.pdf', pages: 32, size: '4.6 MB' },
          {
            title: 'Details of Activities done under MoUs',
            href: '/RandD/MoUs/Details_of_Activities_done_under_MoUS.pdf',
            fileName: 'Details_of_Activities_done_under_MoUs.pdf',
            pages: 151,
            size: '40.5 MB',
          },
        ],
      },
      {
        slug: 'linkages-collaborative-activities',
        label: 'Linkages & Collaborative Activities', icon: 'link', blurb: 'Joint programmes with partners.',
        summary: 'Court observations, internships, visits and legal-awareness programmes carried out with partner institutions, courts and organisations, year by year. Open a report to read it in your browser, or download a copy.',
        documentGroups: [
          {
            year: '2017–2018',
            documents: [
              activity('One_Day_Para_legal_Voluntary_Training_on_21.08.2017', 'Para-Legal Volunteer Training', 'Training', '21 Aug 2017', 14, '4.5 MB'),
              activity('Court_Obsservation_Dated_from_10.03.2018_of_30_days', 'Court Observation (30 days)', 'Court Observation', 'From 10 Mar 2018', 3, '3.8 MB'),
            ],
          },
          {
            year: '2018–2019',
            documents: [
              activity('Court_Observation_from_01.09.2018_to_30.09.2018', 'Court Observation', 'Court Observation', '1–30 Sep 2018', 11, '8.7 MB'),
              activity('Workshop_on_Legal_Topics_on_12.10.2018', 'Workshop on Legal Topics', 'Workshop', '12 Oct 2018', 14, '11.0 MB'),
              activity('Constiutional_Day_on_26.11.2018', 'Constitution Day Celebration', 'Celebration', '26 Nov 2018', 5, '7.0 MB'),
              activity('Legal_Literacy_Kanoon_Ratha_2018-19', 'Legal Literacy – Kanoonu Ratha', 'Legal Literacy', '2018–19', 1, '0.7 MB'),
              activity('Winter_internship_program_of_21_days_2018-19', 'Winter Internship (21 days)', 'Internship', '2018–19', 7, '7.3 MB'),
              activity('Industrial_Visit_on_07.03.2019', 'Industrial Visit', 'Visit', '7 Mar 2019', 9, '9.4 MB'),
              activity('Industrial_Visit_on_27.04.2019', 'Industrial Visit', 'Visit', '27 Apr 2019', 2, '1.4 MB'),
            ],
          },
          {
            year: '2019–2020',
            documents: [
              activity('Summar_internship_Progaram_of_30_days_on_15.06.2019', 'Summer Internship (30 days)', 'Internship', 'From 15 Jun 2019', 9, '6.3 MB'),
              activity('Workshop_on_legal_training_on_15.08.2019', 'Workshop on Legal Training', 'Workshop', '15 Aug 2019', 1, '0.7 MB'),
              activity('Legal_Awareness_Bus_Camp_on_25.08.2019', 'Legal Awareness Bus Camp', 'Legal Awareness', '25 Aug 2019', 1, '0.7 MB'),
              activity('Court_observation_on_01.11.2019', 'Court Observation', 'Court Observation', '1 Nov 2019', 4, '3.5 MB'),
              activity('Constitutional_Day_on_26.11.2019', 'Constitution Day Celebration', 'Celebration', '26 Nov 2019', 4, '2.7 MB'),
            ],
          },
          {
            year: '2020–2021',
            documents: [
              activity('Constitutional_Day_on_26.11.2020_online', 'Constitution Day Celebration (Online)', 'Celebration', '26 Nov 2020', 1, '0.5 MB'),
            ],
          },
          {
            // Jul–Aug 2022 kept in 2021–22, as the college does on the Seminars page.
            year: '2021–2022',
            documents: [
              activity('Police_station_visit_on_18.12.2021', 'Police Station Visit', 'Visit', '18 Dec 2021', 4, '4.0 MB'),
              activity('Establishment_of_legal_aid_clinic_on_06.03.2022', 'Establishment of Legal Aid Clinic', 'Legal Aid', '6 Mar 2022', 5, '4.3 MB'),
              activity('Industrial_visit_on_13.07.2022', 'Industrial Visit', 'Visit', '13 Jul 2022', 7, '9.4 MB'),
              activity('Central_Jail_visit_on_18.08.2022', 'Central Jail Visit', 'Visit', '18 Aug 2022', 8, '8.1 MB'),
            ],
          },
        ],
      },
    ],
  },
  statutory: {
    label: 'Statutory Bodies',
    base: '/statutory-bodies',
    pages: [
      {
        slug: 'cells',
        label: 'Cells',
        icon: 'scale',
        blurb: 'Legal Aid and Human Rights cells.',
        summary: 'Cells that take legal education beyond the classroom: legal aid and legal literacy for the community, and awareness of human rights.',
        bodies: [
          {
            id: 'legal-aid-cell',
            name: 'Legal Aid Cell',
            icon: 'scale',
            intro: [
              'The Legal Aid Cell works to make justice accessible to all, spreading legal education and rendering legal services to the needy community.',
              'It conducts legal-literacy programmes with the District Legal Services Authority (DLSA), Ballari, and in collaboration with Gram Panchayats.',
            ],
            blocks: [
              {
                title: 'Objectives',
                items: [
                  'To provide information about the basic laws most relevant to the target group.',
                  'To make the target groups aware of basic laws through skits, plays and drama.',
                  'To provide legal aid and advice through the legal clinic.',
                  'To create awareness about Lok Adalat and mediation, to reduce the burden on courts.',
                  'To involve students as para-legal volunteers and in other activities.',
                ],
              },
            ],
          },
          {
            id: 'human-rights-cell',
            name: 'Human Rights Cell',
            icon: 'users',
            since: '2015–16',
            intro: ['Established in the academic year 2015–16, the Human Rights Cell creates awareness of human rights among students and staff.'],
            blocks: [
              {
                title: 'Aims',
                items: [
                  'To create awareness about human rights.',
                  'To mould each individual to lead a decent and dignified life without encroaching on the rights of others.',
                ],
              },
              {
                title: 'Objectives',
                items: [
                  'To impart education about human rights.',
                  'To sensitise students to human rights and to gender, ethnicity, religion and related issues.',
                  'To respond against the violation of human rights.',
                  'To expose and study cases of human rights violations.',
                  'To work for the protection of human rights.',
                  'To ensure that basic human rights are respected everywhere.',
                  'To discourage discrimination and harassment.',
                ],
              },
            ],
          },
        ],
      },
      {
        slug: 'committees',
        label: 'Committees',
        icon: 'clipboard-check',
        blurb: 'Examination, ICC and Anti-Ragging.',
        summary: 'Statutory committees that keep the college fair, safe and accountable: examination grievances, the prevention of sexual harassment, and a ragging-free campus.',
        bodies: [
          {
            id: 'examination-committee',
            name: 'Examination Committee',
            icon: 'clipboard-check',
            intro: [
              'Grievance redressal is one of the committee’s most important functions. It looks into complaints lodged by students and judges their merit; anyone with a genuine grievance may approach the committee members in person, and the committee takes every necessary step to resolve it.',
              'Its aim is to develop a responsive and accountable attitude among all stakeholders, so that the college keeps a harmonious educational atmosphere.',
            ],
            blocks: [
              {
                title: 'Objectives',
                items: [
                  'To uphold the dignity of the college by ensuring a strife-free atmosphere.',
                  'To encourage students to express their grievances freely and frankly, without fear of being victimised.',
                  'To resolve any examination-related grievance without undue delay.',
                  'To advise students to respect each other’s rights and dignity, and to show restraint and patience whenever a rift arises.',
                ],
              },
              {
                title: 'Scope',
                text: 'The committee deals with grievances received orally or in writing from students about:',
                items: [
                  'Internal tests, seminars and projects.',
                  'Issue of hall tickets.',
                  'Display of the internal and KSLU semester examination time tables.',
                  'The help-desk counter during examinations.',
                  'Timely issue of mark sheets, transfer and conduct certificates, and other examination matters.',
                ],
              },
              {
                title: 'Functions',
                items: [
                  'Grievances are attended to promptly on receipt, whether oral or written.',
                  'The committee formally reviews every case and acts in time, as per the management’s policy.',
                  'It reports to the authorities on the cases attended to and any pending cases that need their direction.',
                ],
              },
              {
                title: 'Lodging a complaint',
                items: [
                  'Students may raise an issue with the Examination Committee orally or in writing.',
                  'The committee acts on cases forwarded with the necessary documents.',
                  'The committee ensures each grievance is properly resolved without undue delay.',
                ],
              },
            ],
          },
          {
            id: 'internal-complaints-committee',
            name: 'Internal Complaints Committee',
            icon: 'shield',
            intro: [
              'The committee is formed at V.V. Sangha’s V.S.R. Law College, Ballari, to address issues under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Set up under UGC regulations and the Supreme Court guidelines in Vishaka v. State of Rajasthan, it protects women against sexual harassment at the workplace and handles the prevention and redressal of complaints.',
              'Sexual harassment infringes two fundamental rights under the Constitution of India: a woman’s right to gender equality under Article 14, and her right to life and to live with dignity under Article 21. The Supreme Court’s 1997 guidelines, which are legally binding, define sexual harassment at the workplace and set out its prevention, disciplinary action and the employer’s responsibility.',
              'Beyond handling complaints, the committee creates awareness and offers counselling and education on gender issues, including gender-sensitisation workshops for staff and students.',
            ],
            blocks: [
              {
                title: 'What is sexual harassment at the workplace?',
                text: 'Any one or more of the following unwelcome acts or behaviour, whether directly or by implication:',
                items: [
                  'Physical contact or advances.',
                  'A demand or request for sexual favours.',
                  'Making sexually coloured remarks.',
                  'Showing pornography.',
                  'Any other unwelcome physical, verbal or non-verbal conduct of a sexual nature.',
                ],
              },
              {
                title: 'Objectives',
                items: [
                  'To develop a policy against sexual harassment of women at the college.',
                  'To implement the policy in letter and spirit through proper reporting of complaints and their follow-up.',
                  'To uphold the college’s commitment to an environment free of gender-based discrimination.',
                  'To promote a social and psychological environment that raises awareness of sexual harassment in its various forms.',
                  'To create a secure physical and social environment that deters any act of sexual harassment.',
                  'To evolve a permanent mechanism for the prevention and redressal of sexual harassment and other gender-based violence.',
                ],
              },
              {
                title: 'Jurisdiction',
                text: 'The policy applies to all students, faculty and non-teaching staff of the college, and to service providers and visitors on campus at the time of the act.',
              },
              {
                title: 'Composition',
                text: 'Three to four members, at least half of them women. The chairperson is a woman faculty member.',
              },
            ],
          },
          {
            id: 'anti-ragging-cell',
            name: 'Anti-Ragging Cell',
            icon: 'shield',
            intro: [
              'Constituted under UGC regulations and Supreme Court guidelines, the Anti-Ragging Cell ensures that students maintain discipline in the classrooms and on campus. Its members regularly visit every classroom to note errant behaviour and keep the campus free from ragging and eve-teasing.',
              'Ragging is the so-called “initiation ritual” in educational institutions across South Asia, in which senior students abuse, humiliate or harass new entrants and juniors.',
            ],
            contacts: [
              { label: 'College', value: '08392-258368', href: 'tel:08392258368' },
              { label: 'Anti-Ragging Coordinator', value: '94810 46272', href: 'tel:+919481046272' },
            ],
            blocks: [
              {
                title: 'Definition (Dr. R.K. Raghavan Committee)',
                text: '“Ragging” means display of noisy, disorderly conduct or doing any act which causes or is likely to cause physical or psychological harm or raise apprehension or fear or shame or embarrassment to a student in any educational institution, and includes:',
                items: [
                  'Teasing, abusing, playing practical jokes on, or causing hurt to such students.',
                  'Asking the student to do any act or perform something which they would not, in the ordinary course, willingly do.',
                ],
              },
              {
                title: 'Supreme Court of India',
                text: '“Ragging is any disorderly conduct, whether by words spoken or written, or by an act which has the effect of teasing, treating or handling with rudeness any student, indulging in rowdy or indisciplined activities which cause or are likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in a fresher or a junior student, and which has the effect of causing or generating a sense of shame or embarrassment so as to adversely affect the psyche of a fresher or a junior student.”',
              },
              {
                title: 'Kinds of ragging',
                items: ['Dress-code ragging', 'Formal introduction', 'Verbal torture', 'Sexual abuse', 'Playing the fool', 'Hostel ragging', 'Drug abuse'],
              },
            ],
          },
        ],
      },
      {
        slug: 'associations',
        label: 'Associations',
        icon: 'users',
        blurb: 'Student Union – VSR Voice.',
        summary: 'Student associations that give every student a voice and a part in campus life.',
        bodies: [
          {
            id: 'student-union',
            name: 'Student Union – VSR Voice',
            icon: 'users',
            since: '2015–16',
            intro: [
              'The college’s Student Union, formed in 2015–16 and popularly known as VSR Voice, is the core centre for all students and the college’s activity-based committees. It gives students a comfortable and welcoming place to organise themselves for the betterment of the students and the college.',
              'VSR Voice works to see that the college’s mission and objectives are continuously strived for, and that students’ needs are met to boost their overall personality development.',
              'The union provides convenient, high-quality facilities and services to support students’ social, cultural, educational and recreational programmes, which together with the college’s teaching develop their intellectual, emotional, physical and social growth.',
            ],
            blocks: [
              {
                title: 'Objectives',
                items: [
                  'To provide a comfortable and inviting environment where students feel free to voice their views.',
                  'To provide academic support to students who come from different degree backgrounds and mediums of instruction.',
                  'To work with the college’s other activity-based committees, such as the Student Grievance Redressal Cell, Sexual Harassment Cell, cleanliness, library, cultural and sports committees.',
                  'To provide quality extracurricular activities of an educational, social, cultural and recreational nature.',
                  'To serve as a laboratory where student volunteers plan and run programmes from concept through completion and evaluation.',
                  'To support students’ personality development in leadership, moral and value clarification, social responsibility, self-realisation and interpersonal cooperation, through training and daily interaction.',
                  'To provide leisure learning and continuing-education courses for students.',
                  'To provide leisure-time and recreational opportunities for students.',
                  'To address issues of diversity and keep an atmosphere where every student feels comfortable and empowered.',
                  'To provide convenient, up-to-date services that meet students’ current needs.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  studentCorner: {
    label: 'Student Corner',
    base: '/student-corner',
    pages: [
      { slug: 'time-table', label: 'Time Table', icon: 'calendar', blurb: 'Semester-wise class schedules.', summary: 'Class time tables for each semester of the academic year.', points: ['Semester-wise class schedules.', 'Moot court and practical session timings.', 'Updated at the start of each semester.'] },
      { slug: 'lms', label: 'LMS', icon: 'monitor', blurb: 'Lectures, assignments and notices online.', summary: 'The college Learning Management System for lectures, assignments and announcements.', points: ['Access course material and recorded lectures.', 'Submit assignments online.', 'Receive announcements from faculty.'] },
      { slug: 'programme-syllabus', label: 'Programme Syllabus', icon: 'file-text', blurb: 'KSLU syllabus for every semester.', summary: 'The KSLU syllabus for every semester of the LL.B. programme.', points: ['Semester-wise subjects and units.', 'Prescribed and recommended readings.', 'Scheme of examination.'] },
      { slug: 'pos-psos-cos', label: 'POs, PSOs & COs', icon: 'target', blurb: 'Programme and course outcomes.', summary: 'Programme Outcomes, Programme Specific Outcomes and Course Outcomes for the LL.B. programme.', points: ['Programme Outcomes (POs).', 'Programme Specific Outcomes (PSOs).', 'Course Outcomes (COs) for every subject.'] },
      { slug: 'addon-certificate-courses', label: 'Add-on / Certificate Courses', icon: 'award', blurb: 'Short skill-building courses.', summary: 'Short courses that add practical skills beyond the regular syllabus.', points: ['Certificate courses in specialised areas of law.', 'Capacity-building and skill programmes.', 'Certificates awarded on completion.'] },
      { slug: 'question-bank', label: 'Question Bank', icon: 'help-circle', blurb: 'Previous years’ question papers.', summary: 'Previous years’ university question papers to help students prepare for examinations.', points: ['Semester-wise question papers.', 'Organised by subject.', 'Useful for revision and practice.'] },
      { slug: 'student-centric-activities', label: 'Student Centric Activities', icon: 'users', blurb: 'Moots, debates, camps and more.', summary: 'Activities that put students at the centre of learning.', points: ['Moot courts, debates and quizzes.', 'Legal-aid camps and field visits.', 'Group projects and presentations.'] },
      { slug: 'ia-marks', label: 'IA Marks', icon: 'clipboard-check', blurb: 'Internal assessment results.', summary: 'Internal Assessment marks published for each semester.', points: ['Semester-wise internal assessment results.', 'Subject-wise marks.', 'Contact the office for any corrections.'] },
      { slug: 'study-material', label: 'Study Material', icon: 'book-open', blurb: 'Notes and reading lists by faculty.', summary: 'Notes, reading lists and reference material prepared by our faculty.', points: ['Subject-wise notes and handouts.', 'Reading lists and case references.', 'Updated regularly by faculty.'] },
    ],
  },
} satisfies Record<string, MenuGroup>

export const subPath = (group: MenuGroup, page: SubPage) => `${group.base}/${page.slug}`

// Header menu. Items with `group` open a dropdown and are not links themselves.
export type NavItem = { label: string; href: string; group?: never } | { label: string; group: MenuGroup; href?: never }

export const navLinks: NavItem[] = [
  { label: 'Home', href: paths.home },
  { label: 'Faculty', href: paths.faculty },
  { label: 'Courses', group: menuGroups.courses },
  { label: 'R&D', group: menuGroups.research },
  { label: 'Facilities', href: paths.facilities },
  { label: 'NAAC & IQAC', href: paths.naac },
  { label: 'Statutory Bodies', group: menuGroups.statutory },
  { label: 'Student Corner', group: menuGroups.studentCorner },
  { label: 'About', href: paths.about },
]

// Banner shown at the top of every inner page.
export const pageHeaders = {
  about: { eyebrow: 'About the college', title: 'A legacy of legal education since 1975' },
  faculty: { eyebrow: 'Faculty', title: 'Meet our teaching and support staff' },
  admissions: { eyebrow: 'Admissions', title: 'Join VSR Law College' },
  naac: { eyebrow: 'NAAC & IQAC', title: 'Quality Assurance' },
  facilities: { eyebrow: 'Facilities', title: 'Learning beyond the classroom' },
  notFound: { eyebrow: 'Page not found', title: 'We couldn’t find that page' },
}

// Map + directions use Google Maps URLs (no API key needed).
// `hours` and `note` are PLACEHOLDERS — confirm with the college office.
const mapQuery = encodeURIComponent(`Vunki Sannarudrappa Law College, ${site.address}`)

export const location = {
  eyebrow: 'Visit us',
  before: 'Find our ',
  highlight: 'campus',
  office: 'College Office',
  hours: 'Mon – Sat: 10:00 am – 5:00 pm',
  note: 'Visitors are requested to report to the college office on arrival. Prior appointment is recommended for meetings with the Principal.',
  addressLabel: 'Kappagal Road, Ballari',
  mapEmbed: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
  mapLink: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
}

export const hero = {
  eyebrow: 'Affiliated to KSLU, Hubballi',
  before: 'Most reputed legal education ',
  highlight: 'institution',
  after: ' in Ballari',
  body: 'Established in 1975 by the century-old V.V. Sangha to train students and young advocates to stand up for the rule of law and social justice.',
  // Placeholder PDF in public/ — replace public/vsr-brochure.pdf with the real brochure.
  cta: { label: 'Download brochure', href: '/vsr-brochure.pdf', fileName: 'VSR-Law-College-Brochure.pdf' },
  badges: ['BCI', 'UGC', 'KSLU', 'AISHE'],
  established: { value: '1975', label: 'Year of establishment' },
}

export const founders = {
  eyebrow: 'Since 1916',
  before: 'A legacy from our ',
  highlight: 'founding donors',
  body: 'In the 1970s there was no institution offering legal education in Ballari district — aspirants had to travel to Madras or Hyderabad. The great donor Shree Vadaga Veerappa made the dream real with a donation in the name of his father-in-law, late Shree Vunki Sannarudrappa, and V.V. Sangha founded the college in 1975.',
  quote:
    'The college has produced approximately 26,000 graduates. Our alumni have been appointed Judges of the Supreme Court, High Court and District Courts, APPs and Civil Judges.',
  founderLabel: 'Founded by',
  founderName: 'Veerasaiva Vidyavardhaka Sangha, Ballari',
}

export const story = {
  eyebrow: 'Our story',
  before: 'Rooted in the heritage of ',
  highlight: 'Ballari',
  body: [
    'Ballari, in eastern Karnataka, was once ruled by the Vijayanagara Empire, whose kings built the City of Victory at Hampi on the banks of the Tungabhadra. After the states were reorganised on linguistic lines, the district became part of the Hyderabad-Karnataka region of Karnataka.',
    'Today the college trains students and young advocates to stand up for the rule of law and social justice, with qualified faculty and a focus on community leadership and civic responsibility.',
  ],
  motto: { label: 'The V.V. Sangha’s guiding motto', text: '“Viddyege Gnanave Bhooshana”' },
  milestones: [
    {
      year: '1916',
      title: 'V.V. Sangha is founded',
      body: 'Our parent society is founded to spread knowledge and awaken the people of the region.',
    },
    {
      year: '1918',
      title: 'Registered as a society',
      body: 'Registered on 7 March 1918 under the Societies Registration Act XXI of 1860. The Sangha goes on to open schools, colleges, and technical, management, pharmacy and teacher-training institutions across the district.',
    },
    {
      year: '1975',
      title: 'The law college opens',
      body: 'Vunki Sannarudrappa Law College opens as the first institution for legal education in Ballari district.',
    },
    {
      year: 'Today',
      title: '26,000+ graduates',
      body: 'A grant-in-aid college affiliated to KSLU, Hubballi. Alumni serve as judges of the Supreme Court, High Court and District Courts, as APPs, as Civil Judges and as civil servants.',
    },
  ],
}

// Placeholder documents — swap each href for the real PDF/page when available.
export const qualityTabs = [
  { id: 'naac', label: 'NAAC' },
  { id: 'iqac', label: 'IQAC' },
] as const
export type QualityTab = (typeof qualityTabs)[number]['id']

const fb = (title: string, href: string, kind: SocialLink['kind'] = 'post'): SocialLink => ({ title, href, kind })
// Programmes since 2024 are only posted on the college Facebook page.
const iqacPosts: Record<string, SocialLink[]> = {
  '2024–2025': [
    fb('Students Participation in 7th state Level Mahila Sammelana programme at Davanagere on 6th January 2024', 'https://www.facebook.com/share/p/1KV5xfUiwD/'),
    fb('Workshop on the eve of Human Rights Celebration day at college Seminar Hall On 22/12/2023', 'https://www.facebook.com/share/p/1ad4BZh4H4/'),
    fb('Intra College singing, elocution, cultural, essay and quiz Competition on the Eve of Republic Day', 'https://www.facebook.com/share/p/1BzezdBRP5/'),
    fb('On the eve of 75th Republic day Vunki Sannarudrappa Law College conducted Various Competitions', 'https://www.facebook.com/share/p/1DXkcb6Sq7/'),
    fb('Participation of Para legal Volunteers and other selected students of our college in “Para legal Volunteers Training” organised by District Legal Services Authority Ballari in association with National Legal Services Authority On 4 January,2024', 'https://www.facebook.com/share/p/199o8Vcrwk/'),
    fb('Celebration of Basava Jayanthi on May 10th, 2024', 'https://www.facebook.com/share/p/19jjR2Fq2P/'),
    fb('Celebration of Buddha Purnima on May 23rd, 2024', 'https://www.facebook.com/share/p/19f4RichAA/'),
    fb('Debate Competition on the Topic “Citizenship Amendment Act (CAA)” on May 30th, 2024', 'https://www.facebook.com/share/p/1DUFJbKvL6/'),
    fb('World Tobacco Prohibition Day, College Organized Tobacco free awareness rally on May 31st, 2024', 'https://www.facebook.com/share/p/19UbFRkMgw/'),
    fb('Celebration of World Environment Day on 5th June, 2024 by planting saplings and spreading awareness among the students', 'https://www.facebook.com/share/p/198NMVFqD5/'),
    fb('Celebration of “World Anti-Child Labour Day” and students took the pledge against Child Labour prohibition on 13th June, 2024 at 1.00 p.m. at College Seminar Hall', 'https://www.facebook.com/share/p/1Bkj2AjGPW/'),
    fb('A Day workshop on “Mental Health Awareness and stress Management, with special reference to Mental Health Care Act 2017” on 14th June, 2024', 'https://m.facebook.com/story.php?story_fbid=pfbid04aoPE6LkNzeoYLsWCujnp8DaKCZPZZPAEkqzJVVtFyUf2mUyu81o3GwQ5vCXF2ETl&id=100081149261756&mibextid=Nif5oz'),
    fb('Celebration of 10th International yoga day 2024 on 21st June, 2024', 'https://m.facebook.com/story.php?story_fbid=pfbid0ckKxJ4ivntJpkHbcVz61AgzMkuMmvNQCBvcGLGFq9okb9p9JyS7gR8S3c7BcCgaWl&id=100081149261756&mibextid=Nif5oz'),
    fb('Mega Lok Adalat Awareness Campaign on 23/6/24 & 26/6/24', 'https://www.facebook.com/share/p/1DDyKcccvR/'),
    fb('Essay Writing Competition On “Efficacy of Bharatiya Nyaya Sanhita in comparison with Indian Penal code 1860” and Drawing competition on 23.07.24', 'https://www.facebook.com/share/p/1FPQxJDRhy/'),
    fb('A Day Workshop on Salient features of “Bharatiya Nyaya Sanhita -2023” on 24th July, 2024', 'https://www.facebook.com/share/p/19wpQRpnyE/'),
    fb('Participation in “National Level Moot Court Competition” organized by the Saraswati Law College, Chitradurga on 27 & 28 of July 2024', 'https://www.facebook.com/share/p/19dTjGWYKt/'),
    fb('Participation in a “Career Guidance Workshop” organized by the Karnataka State Law University in Hubballi, on 31.07.24', 'https://www.facebook.com/share/p/1DeM9AStvK/'),
    fb('Final year students visit to “Dharwad High Court” as a part of the Educational Tour on 7th August 2024', 'https://www.facebook.com/share/p/1LgNuUQooe/'),
    fb('“Fundamental Rights and Duties” Legal Awareness Program was organised by our college and conducted on 09.08.2024 at Shri Medha college, Ballari', 'https://www.facebook.com/share/p/1TpJTz8Yfo/'),
    fb('Celebration of “Anti-Ragging Day” on 12.08.2024', 'https://www.facebook.com/share/p/1B9MsrCJEn/'),
    fb('Farewell to the final year Students on 08.08.2024', 'https://www.facebook.com/share/p/18XVJdxpNY/'),
    fb('Celebration of “International Youth Day” on 12.08.2024', 'https://www.facebook.com/share/p/1EpQm5Bf6k/'),
    fb('Celebration of 78th “Independence Day” on 15.08.2024', 'https://www.facebook.com/share/v/1HUr5H7M3s/', 'video'),
    fb('Celebration of “Annual Day” on 15.08.2024', 'https://www.facebook.com/share/p/1besH42adi/'),
    fb("Celebration of “Sadbhavana Diwas 2024” Rajiv Gandhi's Birth Anniversary on 20.08.2024", 'https://www.facebook.com/share/p/1Myd1Mihu6/'),
    fb('NSS Unit Organised Annual Special Camp at Sanganakal Village, Ballari Taluk, Ballari District, From 02/08/2024 to 08/08/2024', 'https://www.facebook.com/share/v/18xS9LbbV5/', 'video'),
    fb('Celebration of Donors Day On 14/09/2024', 'https://www.facebook.com/share/p/19XATUEyYe/'),
    fb('Celebration of Kalyana Karnataka Vimochana Day On 17/09/2024', 'https://www.facebook.com/share/p/1HSKDwhijm/'),
    fb('Celebration of “National Voluntary Blood Donation DAY”.on 1/10/2024', 'https://www.facebook.com/share/p/1Pa2Y4ZSGg/'),
    fb('Celebration of “Senior Citizens Day” on 4/10/2024', 'https://www.facebook.com/share/p/1ZWgavYtk9/'),
    fb('Celebration of “World Mental Health Day” on 10/10/2024', 'https://www.facebook.com/share/p/1DwEZ5BR5y/'),
    fb('Celebration of “Dussehra Ayudha Puja” for the academic year 2024-25', 'https://www.facebook.com/share/p/1FLrB9x5TP/'),
    fb('Celebration of “Maharishi Valmiki Jayanti” on 17/10/2024', 'https://www.facebook.com/share/p/1CQw4VWobn/'),
    fb('NSS Unit, on the eve of “Vigilance Awareness Week” All Students, teaching and non teaching staff took pledge to eliminate corruption on 28/10/2024', 'https://www.facebook.com/share/p/1C5J5CM5eM/'),
    fb('Participation in “Legal Workshop” on the topic “Bharatiya Nyaya Suraksha Samhitha” Organized by Karnataka State Bar Council in association with Ballari Bar Association on 28.10.24', 'https://www.facebook.com/share/p/19ff88XEDf/'),
    fb('Celebration of Birth Anniversary of Sardar Vallabhbhai Patel Jayanti “Rashtriya Ekta Divas (National Unity Day)” on 31/10/2024', 'https://www.facebook.com/share/p/1ENogQTgxM/'),
    fb('Celebration of 69th “Kannada Rajyotsava” on 1/11/2024', 'https://www.facebook.com/share/p/1BjUYVLsc4/'),
    fb('Fire safety awareness program on 07.11.24', 'https://www.facebook.com/share/p/1C3dZMcB9v/'),
    fb('Legal Awareness Programme on the eve of National Legal Services Day on the Topic: Women & law, on 09.11.24', 'https://www.facebook.com/share/p/1DtRazsqVR/'),
    fb('NSS Unit Celebrated “International Day For Tolerance And Peace” on 16/11/2024', 'https://www.facebook.com/share/p/18RiwUurPt/'),
    fb('Celebration of “Kanakadasa Jayanti” on 18/11/2024', 'https://www.facebook.com/share/p/1JzUfdb5Cm/'),
    fb('Legal Awareness Programme on the Topics: Fundamental Rights, Fundamental Duties and Child Rights on 13.11.24', 'https://www.facebook.com/share/p/1EzyxxbCwN/'),
    fb('Celebration of “International Day For Tolerance And Peace” on 16/11/2024', 'https://www.facebook.com/share/p/1BGbCz2zJu/'),
    fb('Legal Awareness Programme on the Topics: Fundamental Rights, Fundamental Duties and Child Rights on 23.11.24', 'https://www.facebook.com/share/p/1DK39e6JRw/'),
    fb('Participation in Para Legal Volunteers Training on 24.11.24', 'https://www.facebook.com/share/p/1E2umQFvex/'),
    fb('Celebration of 75th Constitution Day on 26.11.24', 'https://www.facebook.com/share/p/1E2G4R4YVp/'),
    fb('On the eve of Campaigning on Solidarity for Safe Abortion, Conducted “Elocution Competition” to our Students on the Topic: “MTP Act 2021” on 03.12.24', 'https://www.facebook.com/share/p/1cKvaj2BiK/'),
    fb('On the eve of Campaigning on Solidarity for Safe Abortion, Organised “Workshop On MTP Act 2021” on 03.12.24', 'https://www.facebook.com/share/p/1EuH8hhAK5/'),
    fb('NSS Unit Celebration of “68th Mahaparinirvana Divas” on 6/12/2024', 'https://www.facebook.com/share/p/1CnUARQs9S/'),
    fb('The final year students active participation in the awareness campaign on 09/12/24 & 10/12/24', 'https://www.facebook.com/share/p/19WjQHJnmA/'),
    fb('Celebration of World Human Rights Day on 14.12.24', 'https://www.facebook.com/share/p/1EYoUEN6Wv/'),
    fb("Freshers' Day celebration on 30.12.2024", 'https://www.facebook.com/share/p/19i34JQy48/'),
  ],
  '2025–2026': [
    fb('“Workshop On Uplifting Women In Society” on 03.01.25', 'https://www.facebook.com/share/p/1ERsghRyvj/'),
    fb('15th National Voters Day - Voters pledge on 24/01/2025', 'https://www.facebook.com/share/p/17vPMbtvnC/'),
    fb('Celebration of “76th Republic Day” by hoisting the National flag on 26/01/2025', 'https://www.facebook.com/share/p/1EoWs4amja/'),
    fb("Workshop on the Topic: “Cyber Security & Women's Protection”, on 14.03.25", 'https://www.facebook.com/share/p/1BzwAxvJd6/'),
    fb('Two Days Workshop on “From Concept to Realisation, Child Rights Training” on 18.03.25 and 19.03.2025', 'https://www.facebook.com/share/p/1BdYx5Nn8v/'),
    fb('5 years BA, LL.B. Integrated Course Launch Celebration was held on 24th March 2025', 'https://www.facebook.com/share/p/1KDqP7S4Qk/'),
    fb("On the Eve of International Women's Day 2025, on 25th March 2025", 'https://www.facebook.com/share/p/1JmpT7UAan/'),
    fb('Educational visit to the Honourable Supreme Court of India, New Delhi on 01.04.2025', 'https://www.facebook.com/share/p/1GcmxGLRXJ/'),
    fb('Celebration of “134th Birth Anniversary Of Bharat Ratna, Architect Of Indian Constitution Shree Baba Saheb Dr. B. R. Ambedkar Jayanti” on 14/04/2025', 'https://www.facebook.com/share/p/19TbxiaYd9/'),
    fb('Special Lecture on “Personality Development” program in College Auditorium Hall On 28.04.24', 'https://www.facebook.com/share/p/19d4LhnhDT/'),
    fb('Intra class moot court competition on 28.04.2024', 'https://www.facebook.com/share/p/19iNfbfJdF/'),
    fb('ಕಲಬುರ್ಗಿ ವಲಯ ಮಟ್ಟದ ಮಾದರಿ ವಿಧಾನಸಭೆ ಅಧಿವೇಶನ ಸ್ಪರ್ಧೆ 2024-25', 'https://www.facebook.com/share/p/1DQqAa9PrN/'),
    fb('Celebration of “892nd Birth Anniversary Of Lord Basaveshwara”, Basava Jayanti, on 30/04/2025', 'https://www.facebook.com/share/p/1GJJSwwduZ/'),
    fb('Jail Visit for 3 years and 5 years LL.B. students on 06.05.25 & 07.05.25', 'https://www.facebook.com/share/p/19i47y9ZqX/'),
    fb('Annual Day celebration on 30.05.25', 'https://www.facebook.com/share/p/19MjjBc53K/'),
    fb('Celebration of “World Environment Day” on 06.06.25', 'https://www.facebook.com/share/p/1VRUtYSeMz/'),
    fb('Farewell program on 06.06.25', 'https://www.facebook.com/share/p/19kQTETiA7/'),
    fb('Celebration of 79th Independence Day on 15.08.25', 'https://www.facebook.com/share/p/19pbHZLFQv/'),
    fb("5th year Central Government's Drug-Free India Campaign on 13.08.25", 'https://www.facebook.com/share/p/19pMmhvyRn/'),
    fb('Celebration of “Anti-Ragging Day”, as a part of National Anti - Ragging Week (12-18 August 2025)', 'https://www.facebook.com/share/p/1CW7BbQ3mv/'),
    fb('Celebration of Gandhi Jayanthi on 02/10/2026', 'https://www.facebook.com/share/p/19ktREhZSv/'),
    fb('In association with KSCASI Ballari City Branch and Ballari Anaesthesiology Society organized Workshop on “Cardiopulmonary Resuscitation” on 02.09.2025', 'https://www.facebook.com/share/p/1FYq4p2kHs/'),
    fb('ವಿ ವಿ ಸಂಘದ ಸಂಸ್ಥಾಪನಾ ದಿನಾಚರಣೆ ಮತ್ತು ಹಾನಗಲ್ ಕುಮಾರೇಶ್ವರ ಮಹಾಸ್ವಾಮಿಗಳ ಜಯಂತಿ ದಿನಾಂಕ. 04/09/2025', 'https://www.facebook.com/share/p/1CLvB2Hii4/'),
    fb('Lok Adalat awareness campaign in different areas of Ballari District on 02.09.2025', 'https://www.facebook.com/share/p/1Eq1zEo6SS/'),
    fb('Celebration of Kalyan Karnataka Utsav Day on 17.09.25', 'https://www.facebook.com/share/p/1WQ4R9CB2M/'),
    fb("Celebration of 54th Donor's Day", 'https://www.facebook.com/share/p/19ky36zLrV/'),
    fb('Celebration of Fresher Day on 19.09.25', 'https://www.facebook.com/share/p/1EMmDKZ7yD/'),
    fb('Special Lecture on “The Role of Women Warriors Rani Abbakka, Kittur Channamma & Ahilyabai Holkar” on 20.09.25', 'https://www.facebook.com/share/p/1DmBbkQo6J/'),
    fb('Celebration of Ayudha Puja and Vijayadashami Puja for the Academic Year 2025-26', 'https://www.facebook.com/share/p/1JEcpVKctF/'),
    fb('NSS Unit Organized Swachhata Abhiyana on 30.09.25', 'https://www.facebook.com/share/p/19csjUTrcr/'),
    fb('Celebration of Gandhi Jayanti and Lal Bahadur Shastri Jayanthi on 02.10.2025', 'https://www.facebook.com/share/p/1GMvsjyVNs/'),
    fb('Celebration of Maharishi Valmiki Jayanti on 07.10.2025', 'https://www.facebook.com/share/p/1Gk3XH9R5m/'),
    fb('Awareness program on the Topic: “Legal Impact of Ragging & Sexual Harassment” on 25.10.25', 'https://www.facebook.com/share/p/1911ecCVya/'),
    fb('Celebration of “70th Karnataka Rajyotsava Day” on 01.11.25', 'https://www.facebook.com/share/p/19nLmgX1c6/'),
    fb('Celebration of “Kanakadasa Jayanti” on 08.11.25', 'https://www.facebook.com/share/p/1D92MS3A2Q/'),
    fb('ಕರ್ನಾಟಕ ಕಾನೂನು ಮತ್ತು ಸಂಸದೀಯ ಸುಧಾರಣೆ ಸಂಸ್ಥೆ, ಬೆಂಗಳೂರು ಹಾಗೂ ವುoಕಿ ಸಣ್ಣರುದ್ರಪ್ಪ ಕಾನೂನು ಮಹಾವಿದ್ಯಾಲಯ, ಬಳ್ಳಾರಿ ವತಿಯಿಂದ ಕಲ್ಬುರ್ಗಿ ವಲಯ ಮಟ್ಟದ “ಮಾದರಿ ವಿಧಾನಸಭಾ ಅಧಿವೇಶನ ಸ್ಪರ್ಧೆ” ದಿನಾಂಕ: 21/11/2025', 'https://www.facebook.com/share/p/1HV5vXxQga/'),
    fb('Lok Adalat Awareness Campaign on 28.11.2025', 'https://www.facebook.com/share/p/1DXuZ8yzde/'),
    fb('Celebration of 76th Constitution Day on 03.12.25', 'https://www.facebook.com/share/p/1CBjr23iXb/'),
    fb('“Maha Parinirvan Diwas” was observed in the college to commemorate the death anniversary of the sculptor of Indian Constitution Sri Babasaheb Dr. B. R. Ambedkar on 06.12.2025', 'https://www.facebook.com/share/p/1JhQi7sAkv/'),
    fb('Participation in National Lok Adalat held on 13.12.25', 'https://www.facebook.com/share/p/1d9ENvEbZM/'),
    fb('V. S. Law College in association with Adhivakta Parishat Karnataka (North) Ballari District and Consumer Dispute Redressal Commission Ballari organised Special Lecture on Consumer Rights Protection Awareness Programme 25-26', 'https://www.facebook.com/share/p/1DGmuHvFbu/'),
    fb('Central Jail Visit for 1st year students of 3 years and 5 years LL.B. on 29.12.25 and 31.12.25', 'https://www.facebook.com/share/p/1CSZ8sLzra/'),
    fb('“77th Republic Day” by hoisting the National flag by our Principal Dr. K. Rajani Kumari on 26/01/2026', 'https://www.facebook.com/share/p/19XVU2SdCr/'),
    fb('Para legal volunteers training held by District Legal Services Authority on 07.02.26 and 08.02.26', 'https://www.facebook.com/share/p/1CEiv5tmyu/'),
    fb('V.S. Law College in association with District Legal Services Authority Ballari, Organized Legal Awareness Programme at Gautham Nagar, Belagal Road, Ballari on 21.02.26', 'https://www.facebook.com/share/p/19BLRnEpcu/'),
    fb('The NSS and Red Cross Wing of our college organized a visit to an old age home along with Student Volunteers on 09/04/2026', 'https://www.facebook.com/share/p/1HmprBkmXc/'),
    fb('Celebration of 135th Birth Anniversary of Bharat Ratna architect of Indian Constitution Shri Babasaheb Dr. B.R. Ambedkar Jayanti on 14 April 2025', 'https://www.facebook.com/share/p/1FijXvBALU/'),
    fb('Legal Awareness Programme at Saraladevi Degree College, Ballari Auditorium Hall on 25.05.26', 'https://www.facebook.com/share/p/1BzrMwXFW9/'),
    fb('Annual-Sports Meet on 26.05.2026 and 27.05.2026', 'https://www.facebook.com/share/p/18ZwrLy1VU/'),
    fb('Celebration of World Environment Day on 05.06.26', 'https://www.facebook.com/share/p/19hwZ9e6aC/'),
    fb('Hubballi Zonal Level Workshop on “From Class to Courtrooms: Law Students as Catalysts for Social Justice” organized by the KSLSA in association with KSLU Hubballi; on 14th June 2025–26', 'https://www.facebook.com/share/p/1BxNQLQYhc/'),
    fb('Celebration of 12th International Yoga Day 2026 on 21st June 2026', 'https://www.facebook.com/share/v/18nijrXNem/', 'video'),
    fb('Lok Adalat Awareness campaign at ballari on 10th, 25th and 30/06/2026', 'https://www.facebook.com/share/p/1EmGCJHd2k/'),
    fb('Intra class Moot Court Competition 2025-26', 'https://www.facebook.com/share/p/19VhjCzNLo/'),
    fb('Annual Day celebration 2025-26', 'https://www.facebook.com/share/p/19n2ucvAAu/'),
    fb('Farewell Ceremony to Honour Dr. K. Rajani Kumari on her superannuation on 31st July 2026', 'https://www.facebook.com/share/p/19sfhzvz9M/'),
  ],
}

export const iqac = {
  eyebrow: 'IQAC',
  before: 'Internal Quality ',
  highlight: 'Assurance',
  after: ' Cell',
  body: 'The IQAC plans, guides and monitors quality-enhancement activities at the college, in line with NAAC guidelines. Below are the programmes it has organised, year by year: open a report to read it in your browser or download a copy, or see the post on our Facebook page.',
  groups: [
    {
      year: '2022–23 to 2023–24',
      documents: [
        iqacReport('1_All_India_Inter_University_Karate_Championship', 'All India Inter-University Karate Championship', 'Sports', '14–17 Mar 2022', 2, '0.6 MB'),
        iqacReport('5_LIC_peer_team_visited_on_28.04.2022', 'LIC Peer Team Visit', 'Visit', '28 Apr 2022', 3, '0.6 MB'),
        iqacReport('2_Buddha_Purnima', 'Buddha Purnima', 'Celebration', '16 May 2022', 2, '0.2 MB'),
        iqacReport('7_Workshop_on_Law_training', 'Legal Literacy & Legal Awareness Programme, SCAAB Law College, Raichur', 'Workshop', '27 May 2022', 2, '0.6 MB'),
        iqacReport('4_LEGAL_SERVICE_CLINIC', 'Legal Service Clinic', 'Legal Aid', '2 Jun 2022', 4, '1.1 MB'),
        iqacReport('NSS-Activity-Swachh_Bharath_Abhiyan', 'Swachh Bharat Abhiyan', 'NSS', '6 Jun 2022', 5, '1.2 MB'),
        iqacReport('World_Environment_Day', 'World Environment Day', 'Celebration', '7 Jun 2022', 3, '0.7 MB'),
        iqacReport('International_Yoga_Day', 'International Yoga Day', 'Celebration', '23 Jun 2022', 3, '0.7 MB'),
        iqacReport('Awareness_on_Mega_Loka_Adalath', 'Awareness on Mega Lok Adalat', 'Legal Awareness', '25 Jun 2022', 4, '1.2 MB'),
        iqacReport('Special_lecture_on_Effective_Implementation_of_Article_371J', 'Effective Implementation of Article 371(J)', 'Special Lecture', '29 Jun 2022', 2, '0.4 MB'),
        iqacReport('Institutional_Social_Responsibility', 'Institutional Social Responsibility', 'Outreach', '1–3 Jul 2022', 3, '0.8 MB'),
        iqacReport('Moot_Court_Selection_Trails_', 'Moot Court Selection Trials', 'Moot Court', '8–9 Jul 2022', 4, '0.7 MB'),
        iqacReport('Nethaji_Subhash_Chandra_Bose_125th_Birth_Anniversary', 'Netaji Subhas Chandra Bose 125th Birth Anniversary', 'Celebration', '12 Jul 2022', 3, '0.8 MB'),
        iqacReport('Industrial_Visit_to_JINDAL-JSW', 'Industrial Visit to Jindal JSW', 'Visit', '13 Jul 2022', 4, '1.1 MB'),
        iqacReport('NSS__Legal_Awareness_Programme_', 'NSS & Legal Awareness Programme', 'NSS', '27 Jul 2022', 3, '0.8 MB'),
        iqacReport('Nivedana_Programme_and_Savirada_sharaneyaru', 'Nivedana Programme & Savirada Sharaneyaru', 'Programme', '29 Jul 2022', 3, '0.5 MB'),
        iqacReport('Voluntary_Blood_Donation_Camp', 'Voluntary Blood Donation Camp', 'Outreach', '30 Jul 2022', 4, '1.0 MB'),
        iqacReport('Celebrated_Indias_75th_Independence_Day', 'India’s 75th Independence Day', 'Celebration', '15 Aug 2022', 3, '1.1 MB'),
        iqacReport('Central_Jail_from_', 'Ballari Central Jail Visit', 'Visit', '18–20 Aug 2022', 2, '0.5 MB'),
        iqacReport('Annual_Indoor_and_outdoor_Games', 'Annual Indoor & Outdoor Games', 'Sports', '29–30 Aug 2022', 4, '1.2 MB'),
        iqacReport('Celebration_of_National_Youth_Day', 'National Youth Day', 'Celebration', '12 Jan 2023', 2, '0.5 MB'),
        iqacReport('3_EVM_Awareness_2022-23_on_23.02.2023', 'Electronic Voting Machine Awareness', 'Awareness', '23 Feb 2023', 2, '0.6 MB'),
        // same report file as the Raichur programme above, as on the old site
        iqacReport('7_Workshop_on_Law_training', 'Workshop on Law Training', 'Workshop', '24–26 Feb 2023', 2, '0.6 MB'),
        iqacReport('6_Mega_Lok_Adalat_Awareness_Campaign', 'Mega Lok Adalat Awareness Campaign', 'Legal Awareness', '22 & 24 Aug 2023', 2, '0.5 MB'),
      ],
    },
    { year: '2024–2025', links: iqacPosts['2024–2025'] },
    { year: '2025–2026', links: iqacPosts['2025–2026'] },
  ] satisfies DocumentGroup[],
}

// NAAC criterion files stay on the old site (≈1.6 GB in total, many 60–90 MB), so they link out.
export type NaacFile = { label: string; href: string; size?: string }
export type NaacMetric = { code: string; text: string; files: NaacFile[]; more?: { title: string; files: NaacFile[] } }
export type NaacCriterion = { numeral: string; title: string; metrics: NaacMetric[] }

const nf = (file: string, label: string, size?: string): NaacFile => ({
  label,
  size,
  href: `https://www.vsrlawcollege.org/images/${file}`,
})

export const naac = {
  eyebrow: 'NAAC',
  before: 'Accredited with ',
  highlight: 'B++',
  after: ' grade',
  body: 'In its first cycle of Assessment & Accreditation, the National Assessment and Accreditation Council (NAAC) accredited the college with a CGPA of 3.00 on a four-point scale at B++ grade, valid up to 20 March 2029. The accreditation documents are here; open a criterion below for the supporting documents of each metric.',
  documents: [
    { title: 'NAAC Certificate of Accreditation', kind: 'B++ grade', date: '21 Mar 2024', href: '/NAAC/NAAC_Grade.pdf', fileName: 'NAAC_Grade.pdf', pages: 3, size: '2.9 MB' },
    { title: 'Self Study Report (SSR)', kind: 'First cycle', href: '/NAAC/Self_Study_Report_SSR.pdf', fileName: 'Self_Study_Report_SSR.pdf', pages: 94, size: '0.6 MB' },
    { title: 'Institutional Information for Quality Assessment (IIQA)', kind: 'First cycle', href: '/NAAC/IIQA.pdf', fileName: 'IIQA.pdf', pages: 4, size: '30 KB' },
  ] satisfies DocumentFile[],
  criteriaEyebrow: 'Criteria',
  criteriaBefore: 'Supporting ',
  criteriaHighlight: 'documents',
  criteriaBody: 'Documents submitted for each metric of the seven NAAC criteria. They open from the college’s document archive in a new tab; some are large scans, so the file size is shown beside each one.',
  criteria: [
  {
    numeral: 'I',
    title: 'Curricular Aspects',
    metrics: [
      {
        code: '1.1.1',
        text: 'The Institution ensures effective curriculum delivery through a well planned and documented process',
        files: [
          nf('Any_Additional_Information.pdf', 'Additional Information (1)', '20.3 MB'),
          nf('1.1.1_Link_for_Additional_Information.pdf', 'Additional Information (2)', '67.3 MB'),
        ],
      },
      {
        code: '1.1.2',
        text: 'The Institution adheres to the academic calendar including for the conduct of CIE',
        files: [
          nf('1.1.2_Upload_any_Additional_Infomation.pdf', 'Additional Information', '60.9 MB'),
        ],
      },
      {
        code: '1.1.3',
        text: 'Teachers of the Institution participate in following activities related to curriculum development and assessment of the affiliating University and other colleges and/are represented on the following academic bodies during the last 5 years',
        files: [
          nf('1.3.3.pdf', 'Additional Information', '1.3 MB'),
          nf('1.1.3_Det_parti.pdf', 'Details of Participation', '408 KB'),
          nf('1.1.3_Nomination_Letter_from_the_KSLU_indicating_membership_in_Academic_Council.pdf', 'Letters from KSLU for Academic Council', '15.5 MB'),
          nf('1.1.3_Letter_from_KSLU_inviting_the_faculty_for_Evaluation.pdf', 'Evaluation Letters from KSLU', '90.2 MB'),
          nf('1.1.3_Letters_from_KSLU_to_the_faculty_for_Setting_Question_Papers.pdf', 'Letters from KSLU for Setting Question Papers', '14.0 MB'),
        ],
      },
      {
        code: '1.2.1',
        text: 'Percentage of Programmes in which Choice Based Credit System (CBCS)/elective course system has been implemented',
        files: [
          nf('1.2.1_Additional_Information.pdf', 'Additional Information', '17.1 MB'),
        ],
      },
      {
        code: '1.2.2',
        text: 'Number of Add on or value added courses/Certificate programs offered during the last five years',
        files: [
          nf('1.2.2_Additional_Information.pdf', 'Additional Information', '3.8 MB'),
        ],
      },
      {
        code: '1.2.3',
        text: 'Average percentage of students enrolled in Add on or value added courses/Certificate programs as against the total number of students during the last five years',
        files: [
          nf('1.2.3_Additional_Information.pdf', 'Additional Information', '18.8 MB'),
        ],
      },
      {
        code: '1.3.1',
        text: 'Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Constitutional and Human Values, Environment and Sustainability etc. into the Curriculum',
        files: [
          nf('1.3.1_List_and_Description_of_Courses.pdf', 'List of Description of Courses', '1.6 MB'),
          nf('1.3.1_Any_Additional_Information.pdf', 'Additional Information', '61.1 MB'),
        ],
      },
      {
        code: '1.3.2',
        text: 'Average percentage of courses that include experiential learning through Moot Courts, seminar courses, Court visits, Arbitration/Mediation/Client Counselling Exercises, Para legal volunteering/legal aid training, advocate chamber and internship in law firms/NGO/Judicial Clerkships etc., (year wise during the last five years)',
        files: [
          nf('1.3.2_Final.pdf', 'List of courses include Experiential Learning', '29.1 MB'),
          nf('1.3.2_Internship_Certificates_of_the_students_who_completed_Experiential_Learning.pdf', 'Internship Certificates of the students who have completed Experiential Learning', '21.0 MB'),
        ],
      },
      {
        code: '1.3.3',
        text: 'Number of students undertaking Moot Courts, Court Visits, Arbitration/Mediation/Client Counselling Exercises and Internship in Law Firms/NGOs/Judicial Clerkships etc., Data Requirements (as per data Template)',
        files: [
          nf('1.3.3_Internship_Certificates.pdf', 'Internship Certificates', '21.0 MB'),
          nf('1.3.3.pdf', 'Additional Information', '1.3 MB'),
        ],
      },
      {
        code: '1.4.1',
        text: 'Institution obtains feedback on the syllabus and its transaction at the institution from the stakeholders',
        files: [
          nf('1.4.1_SAMPLE_FILLED_FORMS.pdf', 'Sample Filled Forms', '1.5 MB'),
          nf('1.4.1_FINAL.pdf', 'Additional Information', '972 KB'),
        ],
      },
      {
        code: '1.4.2',
        text: 'Feedback process of the Institution',
        files: [
          nf('1.4.2_new.pdf', 'Additional Information', '13.1 MB'),
        ],
      },
    ],
  },
  {
    numeral: 'II',
    title: 'Teaching-Learning and Evaluation',
    metrics: [
      {
        code: '2.1.1',
        text: 'Average Enrolment percentage (Average of last five Years)',
        files: [
          nf('2.1.1_Any_Additional_Information.pdf', 'Additional Information', '975 KB'),
          nf('2.1.1_FINAL.pdf', 'Approved Admission List', '4.5 MB'),
        ],
      },
      {
        code: '2.1.2',
        text: 'Average percentage of seats filled against seats reserved for various categories (SC, ST, OBC, Divyangjan, etc. as per applicable reservation policy during the last five years (exclusive of supernumerary seats)',
        files: [
          nf('2.1.2_Any_Additional_Information.pdf', 'Additional Information', '3.9 MB'),
          nf('2.1.2_FINAL.pdf', 'Admission as per Reservation Policy', '364 KB'),
        ],
      },
      {
        code: '2.2.1',
        text: 'The Institution assesses the learning levels of the students and organises special programmes/have policies in place for different levels of learners',
        files: [
          nf('2.2.1_Upload_any_Additional_Information.pdf', 'Additional Information', '72.5 MB'),
        ],
      },
      {
        code: '2.2.2',
        text: 'Student-Full time teacher ratio (Data for the latest completed academic year)',
        files: [
          nf('2.2.2_Any_Additional_Information.pdf', 'Additional Information', '4.5 MB'),
          nf('2.2.2_FINAL.pdf', 'Full time Teacher Ratio', '3.4 MB'),
        ],
      },
      {
        code: '2.3.1',
        text: 'Student centric methods, such as experiential learning, participative learning peer learning, team teaching, case law method and problem solving methodologies are used for enhancing learning experiences',
        files: [
          nf('2.3.1_Upload_any_Additional_Information.pdf', 'Additional Information', '14.7 MB'),
        ],
      },
      {
        code: '2.3.2',
        text: 'Teachers use ICT enabled tools for effective teaching-learning process',
        files: [
          nf('2.3.2_Upload_any_Additional_Information.pdf', 'Additional Information', '744 KB'),
        ],
      },
      {
        code: '2.3.3',
        text: 'Ratio of faculty mentor to students for academic and other related issues (Data for the latest completed academic year)',
        files: [
          nf('2.3.3_Mentor_Diary.pdf', 'Mentor\'s Diary', '60.7 MB'),
          nf('2.3.3_Circulars.pdf', 'Circulars', '9.2 MB'),
          nf('2.3.3_FINAL.pdf', 'Issues Raised and Resolved', '5.7 MB'),
        ],
      },
      {
        code: '2.3.4',
        text: 'Percentage of Students identified as mentors for mentoring other students for academic and other related issues (Data to be provided only for the latest completed academic year)',
        files: [
          nf('2.3.4_Circulars__Student_to_student_Mentorship_Diary.pdf', 'Circulars and student to student Mentorship diary', '35.9 MB'),
          nf('2.3.4_FINAL.pdf', 'Student to Student Mentor Circulars', '13.2 MB'),
        ],
      },
      {
        code: '2.4.1',
        text: 'Average percentage of full time teachers against sanctioned posts during the last five years',
        files: [
          nf('2.4.1_Any_Additional_Information.pdf', 'Additional Information', '3.8 MB'),
          nf('2.4.1_FINAL.pdf', 'Full time Teacher Sanctioned Post', '2.2 MB'),
        ],
      },
      {
        code: '2.4.2',
        text: 'Average percentage of full time teachers with Ph.D./LL.D during the last five years',
        files: [
          nf('2.4.2_Final.pdf', 'Ph.D Degree Certificates', '7.4 MB'),
        ],
      },
      {
        code: '2.4.3',
        text: 'Average teaching experience of full time teachers (Data for the latest completed academic year in number of years)',
        files: [
          nf('2.4.3_Teaching_Experience.pdf', 'Teaching Experience', '401 KB'),
          nf('2.4.3_Any_Additional_Information.pdf', 'Additional Information', '190 KB'),
        ],
      },
      {
        code: '2.4.4',
        text: 'Measures taken by the Institution for faculty retention',
        files: [
          nf('2.4.4_Policy_Measure.pdf', 'Policy Measure', '3.1 MB'),
        ],
      },
      {
        code: '2.5.1',
        text: 'Mechanism of internal assessment is transparent and robust in terms of frequency, mode and innovation introduced in the internal evaluation',
        files: [
          nf('2.5.1_Additional_Information.pdf', 'Internal Assessment', '23.7 MB'),
        ],
      },
      {
        code: '2.5.2',
        text: 'Mechanism to deal with internal examination related grievances is transparent, time-bound and efficient',
        files: [
          nf('2.5.2_Any_Additional_Information.pdf', 'Additional Information', '847 KB'),
        ],
      },
      {
        code: '2.6.1',
        text: 'Teachers and students are aware of the stated Programme and Course outcomes of the Programmes offered by the Institution',
        files: [
          nf('2.6.1_Programe__Course_Outcomes.pdf', 'Programme and Course Outcomes', '1.5 MB'),
        ],
      },
      {
        code: '2.6.2',
        text: 'Attainment of Programme outcomes and course outcomes are evaluated by the Institution',
        files: [
          nf('2.6.2_Upload_Any_Additional_Information.pdf', 'Additional Information', '1.1 MB'),
        ],
      },
      {
        code: '2.6.3',
        text: 'Average pass percentage of Students during last five years',
        files: [
          nf('2.6.3_Result_Anuual_Reports.pdf', 'Annual Report', '1.5 MB'),
          nf('2.6.3.pdf', 'Report Indicating Pass Percentage', '810 KB'),
        ],
      },
      {
        code: '2.7.1',
        text: 'Online student satisfaction survey regarding to teaching learning process',
        files: [
          nf('2.7.1_SSS.pdf', 'Student Satisfaction Survey', '3.1 MB'),
        ],
      },
    ],
  },
  {
    numeral: 'III',
    title: 'Research, Innovations and Extension',
    metrics: [
      {
        code: '3.1.2',
        text: 'Total number of Seminars/conferences/Workshops conducted by the Institution during the last five years',
        files: [
          nf('3.1.2_Final.pdf', 'Details of Seminars & Workshops', '14.5 MB'),
        ],
      },
      {
        code: '3.1.3',
        text: 'Funded Seminars/Conferences/Workshops',
        files: [
          nf('Fund_Sanction_Letter.pdf', 'Fund Sanction Letter', '3.2 MB'),
        ],
      },
      {
        code: '3.2.2',
        text: 'Number of research papers in the Journals notified on UGC website during the last five years',
        files: [
          nf('3.3.2.1_Any_Additional_Information.pdf', 'Additional Information', '27.8 MB'),
        ],
      },
      {
        code: '3.2.3',
        text: 'Total number of books and chapters in edited volumes/books published and papers in national/international conference proceedings year-wise during the last five years',
        files: [
          nf('3.2.3_Final.pdf', 'Details of Books with ISBN numbers and Paper Presentations', '42.7 MB'),
        ],
      },
      {
        code: '3.4.2',
        text: 'Number of awards/recognitions/letters of appreciations/commendation for research, legal aid and legal extension activities by institution/teachers/research scholars/students',
        files: [
          nf('3.4.2_FINAL.pdf', 'Appreciation letter with Translation from Kannada to English', '5.3 MB'),
        ],
      },
      {
        code: '3.4.3',
        text: 'Number of extension and outreach programs conducted by the Institution through NSS/NCC, Government and Government recognized bodies during the last five years',
        files: [
          nf('3.4.3_3.4.4_Final.pdf', 'Details and Report of Extension and Outreach Programs', '19.4 MB'),
        ],
      },
      {
        code: '3.4.4',
        text: 'Total number of Students participating in Extension activities conducted in collaboration with industry, community and Non-Government Organizations through NSS/NCC/Red Cross/YRC etc.,',
        files: [
          nf('3.4.3_3.4.4_Final.pdf', 'Reports of Extension and Outreach Programs', '19.4 MB'),
        ],
      },
      {
        code: '3.5.1',
        text: 'The Institution has several collaborations/linkages for Faculty exchange, Student exchange, Internship, Field Trip, on-the-job training, research etc during the last five years',
        files: [
          nf('3.5.1_Additional_Information.pdf', 'Additional Information', '53.1 MB'),
          nf('3.5.1_Final.pdf', 'E-Copies of Collaborations', '2.7 MB'),
        ],
      },
      {
        code: '3.5.2',
        text: 'Number of functional MoUs with national and international institutions, universities, industries, corporate houses law-firms etc. during the last five years',
        files: [
          nf('3.5.2._E-Copies.pdf', 'E-Copies', '4.6 MB'),
          nf('3.5.2.1_Any_Additional_Information.pdf', 'Additional Information', '40.5 MB'),
          nf('3.5.2_Final.pdf', 'List of Activities conducted through MoU Yearwise', '528 KB'),
        ],
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Infrastructure and Learning Resources',
    metrics: [
      {
        code: '4.1.1',
        text: 'The Institution has adequate infrastructure and physical facilities for teaching-learning viz., classrooms, laboratories, computing equipment etc.',
        files: [
          nf('4.1.1_Upload_Additional_Information.pdf', 'Additional Information', '2.7 MB'),
        ],
      },
      {
        code: '4.1.2',
        text: 'The Institution has adequate facilities for cultural activities, sports, games (indoor, outdoor), gymnasium, Yoga centre etc.',
        files: [
          nf('4.1.2_Upload_Additional_Information.pdf', 'Additional Information', '1.1 MB'),
        ],
      },
      {
        code: '4.1.3',
        text: 'Percentage of classrooms and seminar halls with ICT - enabled facilities such as smart class, LMS, etc.',
        files: [
          nf('4.1.3.1_Upload_Additional_Information.pdf', 'Additional Information', '961 KB'),
          nf('4.1.3.pdf', 'Geo-Tagged Photos of ICT enabled Classrooms/Seminar Halls', '928 KB'),
        ],
      },
      {
        code: '4.1.4',
        text: 'Average percentage of expenditure, excluding salary for infrastructure augmentation during last five years',
        files: [
          nf('4.1.4.1_Any_Additional_Information.pdf', 'Additional Information', '4.0 MB'),
          nf('4.1.4.pdf', 'Audit Statement highlighting the Expenditure on Infrastructure', '1.3 MB'),
        ],
      },
      {
        code: '4.2.1',
        text: 'Library is automated using Integrated Library Management',
        files: [
          nf('4.2.1_Upload_Additional_Information.pdf', 'Additional Information', '1.5 MB'),
        ],
      },
      {
        code: '4.2.2',
        text: 'The Institution has subscription for the following e-resources',
        files: [
          nf('4.2.2_Any_Additional_Information.pdf', 'Additional Information', '16.9 MB'),
        ],
      },
      {
        code: '4.2.3',
        text: 'Average annual expenditure for purchase of books/e-books and subscription to journals/e-journals and legal databases during the last five years',
        files: [
          nf('4.2.3.1_Audited_Statements.pdf', 'Audited Statements', '10.1 MB'),
        ],
      },
      {
        code: '4.2.4',
        text: 'Percentage per day usage of library by teachers and students (foot falls and login data for online access)',
        files: [
          nf('4.2.4_Any_Additional_Information.pdf', 'Additional Information', '4.6 MB'),
        ],
      },
      {
        code: '4.3.1',
        text: 'Institution frequently updates its IT facilities including Wi-Fi',
        files: [
          nf('4.3.1_Any_Additional_Information.pdf', 'Additional Information', '1.1 MB'),
        ],
      },
      {
        code: '4.3.2',
        text: 'Student - Computer/laptop ratio (Data for the latest completed academic year',
        files: [
          nf('4.3.2_Student_Computer_Ratio.pdf', 'Student Computer Ratio', '995 KB'),
          nf('4.3.2_Final.pdf', 'Supporting Documents', '654 KB'),
        ],
      },
      {
        code: '4.3.3',
        text: 'Bandwidth of internet connection in the Institution',
        files: [
          nf('4.3.3_Details_of_Ratio.pdf', 'Details of Internet', '825 KB'),
          nf('4.3.3_Final.pdf', 'Additional Information', '262 KB'),
        ],
      },
      {
        code: '4.4.1',
        text: 'Average percentage of expenditure incurred on maintenance of infrastructure (physical and academic support facilities) excluding salary component during the last five years',
        files: [
          nf('4.4.1_Any_Additional_Information.pdf', 'Additional Information & Audited Statement', '16.1 MB'),
          nf('4.4.1_Final.pdf', 'Additional Information', '4.0 MB'),
        ],
      },
      {
        code: '4.4.2',
        text: 'There are established systems and procedures for maintaining and utilizing physical, academic and support facilities - laboratory, library, sports complex, computers, classrooms etc.',
        files: [
          nf('4.4.2_Any_Additional_Information.pdf', 'Additional Information', '17.5 MB'),
        ],
      },
    ],
  },
  {
    numeral: 'V',
    title: 'Student Support & Progression',
    metrics: [
      {
        code: '5.1.1',
        text: 'Average percentage of students benefited by scholarships and freeships provided by the institution, Government and non-government bodies, industries, individuals, philanthropists',
        files: [
          nf('List_of_Students_sanctioned_Scholarship.pdf', 'List of Students Sanctioned Scholarship', '15.9 MB'),
          nf('5.1.1.pdf', 'Yearwise List of Students benefited in Scholarship', '3.4 MB'),
        ],
      },
      {
        code: '5.1.2',
        text: 'Capacity building and skills enhancement initiatives taken by the institution include the following',
        files: [
          nf('5.1.2_FINAL.pdf', 'Additional Information', '64.4 MB'),
        ],
        more: {
          title: 'List of Initiatives taken by the Institution',
          files: [
            nf('Blood_Donation_Camp.pdf', 'Blood Donation Camp', '3.0 MB'),
            nf('Client_Interview_Skill_Program.pdf', 'Client Interview Skill Program', '212 KB'),
            nf('COVID_19_JAN_ANDOLAN.pdf', 'COVID19 JAN ANDOLAN', '3.2 MB'),
            nf('Debate_on_Burning_Issue.pdf', 'Debate on Burning Issue', '272 KB'),
            nf('Fire_Safety_Awareness_Program.pdf', 'Fire Safety Awareness Programme', '1.9 MB'),
            nf('Fundamental_Duties_Awareness_Program.pdf', 'Workshop on Fundamental Duties of Indian Constitution', '4.1 MB'),
            nf('ICT_Training_Program.pdf', 'ICT Training Program', '289 KB'),
            nf('International_Yoga_Day_Program.pdf', 'International Yoga Day Program', '9.1 MB'),
            nf('Law_Training_Program.pdf', 'Law Training Program', '5.2 MB'),
            nf('Moot_court_Training_Program.pdf', 'Moot Court Training Program', '356 KB'),
            nf('Novel_Corona_Virus_Awareness_Program.pdf', 'Novel Corona Virus Awareness Program', '2.0 MB'),
            nf('Practical_Training_on_Negotiation_and_Mediation.pdf', 'Practical Training on Negotiation and Mediation', '302 KB'),
            nf('Special_Lecture_on_Conciliation_Skill.pdf', 'Special Lecture on Conciliation Skills', '292 KB'),
            nf('Special_Lecture_on_Drafting_Skills.pdf', 'Special Lecture on Drafting Skills', '308 KB'),
            nf('Swatchatha_Karyakram.pdf', 'Swatchatha Karyakram', '5.2 MB'),
            nf('Women_Empowerment_Program_Avala_Hejje.pdf', 'Women Empowerment Program (Avala Hejje)', '4.0 MB'),
            nf('women_empowerment_Program.pdf', 'Women Empowerment Program', '4.0 MB'),
            nf('Workshop_on_Personality_Development.pdf', 'Workshop on Personality Development', '4.4 MB'),
            nf('Yoga_Campaign.pdf', 'Yoga Campaign', '4.6 MB'),
          ],
        },
      },
      {
        code: '5.1.3',
        text: 'Average percentage of students benefited by guidance for competitive examinations and career counselling offered by the Institution',
        files: [
          nf('5.1.3_Any_Additional_Information.pdf', 'Additional Information', '4.1 MB'),
          nf('5.1.3.pdf', 'Yearwise list of students attending each programs', '1.1 MB'),
        ],
      },
      {
        code: '5.1.4',
        text: 'The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases',
        files: [
          nf('5.1.4_Minutes_of_Meeting.pdf', 'Minutes of Meeting', '8.3 MB'),
          nf('5.1.4_FINAL.pdf', 'Supporting Document', '9.0 MB'),
        ],
      },
      {
        code: '5.2.1',
        text: 'Average percentage of placement of outgoing students during the last five years',
        files: [
          nf('5.2.1_Upload_Additional_Information.pdf', 'Additional Information', '3.9 MB'),
          nf('5.2.1.pdf', 'Supporting Document', '2.2 MB'),
        ],
      },
      {
        code: '5.2.2',
        text: 'Percentage of Students enrolled with State Bar Council',
        files: [
          nf('5.2.2_Any_Additional_Information.pdf', 'Additional Information', '5.7 MB'),
          nf('5.2.2.pdf', 'List of Students with State Bar Council Enrolment Number', '153 KB'),
        ],
      },
      {
        code: '5.2.3',
        text: 'Average percentage of students progressing to higher education during the last five years',
        files: [
          nf('5.2.3_Any_Additional_Information.pdf', 'Additional Information', '9.1 MB'),
          nf('5.2.3.pdf', 'Supporting Document for students progressing Higher Education', '210 KB'),
        ],
      },
      {
        code: '5.2.4',
        text: 'Number of students appearing in state/national/international level examinations (eg: JAM/CLAT/NET/SLET/GATE/GMAT/CAT,GRE/TOFEL/Civil Services/Judicial Services/Public Prosecution services/All India Bar Exams/State Government Examinations',
        files: [
          nf('5.2.4.2_Any_Additional_Information.pdf', 'Additional Information', '14.3 MB'),
          nf('5.2.4.pdf', 'List of Students Yearwise', '395 KB'),
        ],
      },
      {
        code: '5.3.1',
        text: 'Number of awards/medals for outstanding performance in sports/literary/cultural activities/Moot court/arbitration competition/Trail advocacy Client Counselling competition/Mediation etc.,',
        files: [
          nf('5.3.1.1_Any_Additional_Information.pdf', 'Additional Information', '3.7 MB'),
          nf('5.3.1_Final.pdf', 'E-copies of Award letters and certificates', '3.6 MB'),
        ],
      },
      {
        code: '5.3.2',
        text: 'Institution facilitates students representation and engagement in various administrative, co-curricular and extracurricular activities (student council/students representation on various bodies as per established processes and norms',
        files: [
          nf('5.3.2.pdf', 'Additional Information', '36.3 MB'),
        ],
      },
      {
        code: '5.3.3',
        text: 'Average number of sports and cultural events/competitions youth parliaments organised by the institution in which students of the Institution participated during the last five years',
        files: [
          nf('5.3.3_Upload_Additional_Information.pdf', 'Additional Information', '7.5 MB'),
          nf('5.3.3_FINAL.pdf', 'Program Circulars and List of the Students participated yearwise', '14.7 MB'),
        ],
      },
      {
        code: '5.4.1',
        text: 'There is a registered Alumni Association that contributes significantly to the development of the Institution through financial, teaching, mentorying and/or other support services',
        files: [
          nf('5.4.1_Upload_Additional_Information.pdf', 'Additional Information', '6.1 MB'),
        ],
      },
      {
        code: '5.4.2',
        text: 'Alumni contribution during the last five years',
        files: [
          nf('5.4.2_Upload_Additional_Information.pdf', 'Additional Information', '242 KB'),
          nf('5.4.2.pdf', 'List of alumnis with the Amount Contributed Yearwise', '173 KB'),
        ],
      },
    ],
  },
  {
    numeral: 'VI',
    title: 'Governance, Leadership and Management',
    metrics: [
      {
        code: '6.1.1',
        text: 'The governance of the institution is reflective of and in tune with the vision and mission of the institution',
        files: [
          nf('6.1.1_Upload_Additional_Information.pdf', 'Additional Information', '8.0 MB'),
        ],
      },
      {
        code: '6.1.2',
        text: 'The effective leadership is visible in various institutional practices such as decentralization and participative management.',
        files: [
          nf('6.1.2_Any_Additional_Information.pdf', 'Additional Information', '17.8 MB'),
          nf('6.1.2_Paste_Link_for_Additional_information.docx', 'Additional information', '2.4 MB'),
        ],
      },
      {
        code: '6.2.1',
        text: 'The Institutional strategic/perspective plan is effectively deployed',
        files: [
          nf('6.2.1_Upload_Additional_Information.PDF', 'Additional Information', '1.8 MB'),
        ],
      },
      {
        code: '6.2.2',
        text: 'The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, proceedures, etc.',
        files: [
          nf('6.2.2_Upload_Additional_Information.pdf', 'Additional Information', '18.8 MB'),
          nf('Organogram_of_the_Institution_structure.docx', 'Structure of the College', '32 KB'),
        ],
      },
      {
        code: '6.2.3',
        text: 'Implementation of e-governance in areas of operation',
        files: [
          nf('6.2.3_Screen_Shots_of_User_Interfaces.pdf', 'Screen shots of User Interfaces', '2.2 MB'),
          nf('6.2.3_Details_of_E-governance.pdf', 'Details of E-governance', '3.6 MB'),
          nf('6-2.pdf', 'Supporting Document', '11.1 MB'),
        ],
      },
      {
        code: '6.3.1',
        text: 'The institution has effective welfare measures for teaching and non-teaching staff',
        files: [
          nf('6.3.1_Upload_Additional_Information.pdf', 'Additional Information', '2.1 MB'),
        ],
      },
      {
        code: '6.3.2.1',
        text: 'Number of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies year wise during the last five years',
        files: [
          nf('6.3.2.1_Details_of_Teachers.pdf', 'Details of Teachers', '375 KB'),
        ],
      },
      {
        code: '6.3.3',
        text: 'Average number of Professional Development/Administrative Training Programs organized by the Institution for teaching and non-teaching staff during the last five years',
        files: [
          nf('6.3.3_Upload_Additional_Information.pdf', 'Additional Information', '57.0 MB'),
          nf('6.3.3_FINAL.pdf', 'Supporting Document', '11.4 MB'),
          nf('Annual_Report_of_the_Program.pdf', 'Annual Report of the Programs', '321 KB'),
        ],
      },
      {
        code: '6.3.4',
        text: 'Average percentage of teachers undergoing online/face-to-face Faculty Development Programs (FDP) during the last five years',
        files: [
          nf('Annual_Reports.pdf', 'Annual Reports', '1.9 MB'),
          nf('6.3.4.pdf', 'Supporting Document', '339 KB'),
          nf('Average_Percentage_of_Teachers_attending_FDP.pdf', 'Average percentage of Teachers attending FDP', '349 KB'),
        ],
      },
      {
        code: '6.3.4.1',
        text: 'Total number of teachers attending professional development programmes viz, Orientation/Induction Programme, Refresher Course, Short Term Course',
        files: [
          nf('6.3.4.1_Upload_Additional_Information.pdf', 'Additional Information', '3.0 MB'),
        ],
      },
      {
        code: '6.3.5',
        text: 'Institutions Performance Appraisal System for teaching and non-teaching staff',
        files: [
          nf('6.3.5_Upload_Additional_Information.pdf', 'Additional Information', '12.3 MB'),
        ],
      },
      {
        code: '6.4.1',
        text: 'Institution conducts internal and external financial audits regularly',
        files: [
          nf('6.4.1_Upload_Additional_Information.pdf', 'Additional Information', '3.1 MB'),
        ],
      },
      {
        code: '6.4.2',
        text: 'Total grants received from non-government bodies, individuals, philanthropists year wise during the last five years',
        files: [
          nf('6.4.2.1_Ddetails_of_Funds.pdf', 'Details of Funds', '5.1 MB'),
          nf('6.4.2_FINAL.pdf', 'Supporting Document', '497 KB'),
        ],
      },
      {
        code: '6.4.3',
        text: 'Institutional strategies for mobilization of funds and the optimal utilisation of resources',
        files: [
          nf('6.4.3_Upload_Additional_Information.pdf', 'Additional Information', '4.2 MB'),
        ],
      },
      {
        code: '6.5.1',
        text: 'Internal Quality Assurance Cell has contributed significantly for institutionalizing the quality assurance strategies and processes',
        files: [
          nf('6.5.1_Upload_Additional_Information.pdf', 'Additional Information', '4.3 MB'),
        ],
      },
      {
        code: '6.5.2',
        text: 'The Institution reviews its teaching learning process, structures and methodologies of operations and learning outcomes at periodic intervals through IQAC set up as per norms and recorded the incremental improvement in various acttivities',
        files: [
          nf('6.5.2_Link_for_Additional_Information.pdf', 'Additional information', '67.5 MB'),
        ],
      },
      {
        code: '6.5.3',
        text: 'Quality assurance initiatives of the institution include',
        files: [
          nf('6.5.3_IQAC_Initiatives.pdf', 'IQAC Initiatives', '9.1 MB'),
          nf('SKM_36723052613420.pdf', 'Annual reports of Institution', '1.7 MB'),
          nf('6.5.3_FINAL.pdf', 'Supporting Document', '9.3 MB'),
        ],
      },
    ],
  },
  {
    numeral: 'VII',
    title: 'Institutional Values and Best Practices',
    metrics: [
      {
        code: '7.1.1',
        text: 'Measures initiated by the Institution for the promotion of constitutional values and gender equity during the last five years',
        files: [
          nf('7.1.1_Specific_Fecilities.pdf', 'Specific Facilities', '3.0 MB'),
          nf('7.1.1_Action_Plan.pdf', 'Action Plan', '466 KB'),
        ],
      },
      {
        code: '7.1.2',
        text: 'The Institution has facilities for alternate sources of energy and energy conservation measures',
        files: [
          nf('7.1.2_Geo_Tagged_Photos.pdf', 'Geo Tagged Photos', '3.5 MB'),
          nf('7.1.2_Relevant_Information.pdf', 'Relevant Information', '104 KB'),
        ],
      },
      {
        code: '7.1.3',
        text: 'Describe the facilities in the Institution for the management of the following types of degradable and non-degradable waste',
        files: [
          nf('7.1.3_Geo_Tag_Photos.pdf', 'Geo Tagged Photos', '346 KB'),
          nf('7.1.3_Add_Relevant_Information.pdf', 'Relevant Information', '767 KB'),
        ],
      },
      {
        code: '7.1.5',
        text: 'Green Campus initiatives include',
        files: [
          nf('7.1.5_Geo_Tagged_Photos.pdf', 'Geo Tagged Photos', '2.7 MB'),
          nf('7.1.5_Relevant_Documents.pdf', 'Relevant Documents', '656 KB'),
        ],
      },
      {
        code: '7.1.6',
        text: 'Quality audits on environment and energy regularly undertaken by the Institution',
        files: [
          nf('Green_Audit_Report.pdf', 'Green Audit Report', '226 KB'),
          nf('Any_Other_Relevant_Information.pdf', 'Other Relevant Information', '6.2 MB'),
        ],
      },
      {
        code: '7.1.8',
        text: 'Describe the Institutional efforts/initiatives in providing an inclusive environment i.e., tolerance and harmony towards cultural, regional, linguistic, communal socioeconomic and other diversities',
        files: [
          nf('7.1.8_Supporting_Document.pdf', 'Supporting Documents', '2.4 MB'),
        ],
      },
      {
        code: '7.1.9',
        text: 'Sensitization of students and employees of the Institution to the constitutional obligations; values, rights, duties and responsibilities of citizens',
        files: [
          nf('7.1.9_Details_of_Activities.pdf', 'Details of Activities', '4.6 MB'),
        ],
      },
      {
        code: '7.1.10',
        text: 'The Institution has a prescribed code of conduct for students, teachers, administrators and other staff and conducts periodic programmes in this regard',
        files: [
          nf('7.1.10_Code_of_Conduct.pdf', 'Code of Conduct', '523 KB'),
        ],
      },
      {
        code: '7.1.11',
        text: 'Institution celebrates/organizes national and international commemorative days, events and festivals',
        files: [
          nf('7.1.11_Geo_Tagged_Photographs.pdf', 'Geo Tagged Photos', '1.8 MB'),
          nf('Annual_Reports_7.1.11.pdf', 'Annual Reports', '1.9 MB'),
        ],
      },
      {
        code: '7.2.1',
        text: 'Describe two best practices successfully implemented by the Institution as per NAAC format provided in the Manual',
        files: [
          nf('7.2.1_Link_Best_Practices.pdf', 'Best Practices', '3.4 MB'),
        ],
      },
      {
        code: '7.3.1',
        text: 'Portray the performance of the Institution in one area distinctive to its priority and thrust',
        files: [
          nf('7.3.1_Link_for_Any_other_Relevant_Information.pdf', 'Other Relevant Information', '1.8 MB'),
        ],
      },
    ],
  },
  ] satisfies NaacCriterion[],
}

// Teaching staff from the college's staff list. Support staff below are still PLACEHOLDERS.
// To add a photo: put it in src/assets/photos/, import it here and set `photo`.
export type Employment = 'permanent' | 'full-time' | 'part-time' | 'guest' | 'management'

export const employmentLabels: Record<Employment, string> = {
  permanent: 'Permanent',
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  guest: 'Guest',
  management: 'Management',
}

export type StaffMember = {
  id: string
  name: string
  role: string
  employment?: Employment
  scale?: string
  bio?: string
  experience?: string
  qualification?: string
  photo?: string
}

export const faculty = {
  teaching: {
    eyebrow: 'Teaching staff',
    before: 'Learn from experienced ',
    highlight: 'faculty',
    members: [
      { id: 't1', name: 'Dr. K. Rajani Kumari', role: 'Principal & Assistant Professor', employment: 'permanent', scale: 'UGC' },
      { id: 't2', name: 'Dr. S. Bharathi', role: 'Assistant Professor', employment: 'permanent', scale: 'UGC' },
      { id: 't3', name: 'Sri. Ramesh A', role: 'Assistant Professor', employment: 'permanent', scale: 'UGC' },
      { id: 't4', name: 'Smt. H. Chandrika', role: 'Assistant Professor', employment: 'permanent', scale: 'UGC' },
      { id: 't5', name: 'Sri. Srikanth', role: 'Lecturer', employment: 'full-time', scale: 'V.V. Sangha Pay Scale' },
      { id: 't6', name: 'Smt. Shilpa Magalad', role: 'Lecturer', employment: 'full-time', scale: 'V.V. Sangha Pay Scale' },
      { id: 't7', name: 'Smt. Umajyothi Chiniwal', role: 'Lecturer', employment: 'part-time', scale: 'Consolidated' },
      { id: 't8', name: 'Dr. Shiva Prakash', role: 'Guest Lecturer', employment: 'guest', scale: 'Consolidated' },
      { id: 't9', name: 'Smt. Soumya', role: 'Guest Lecturer', employment: 'guest', scale: 'Consolidated' },
      // Source remark is just "Management" (no full-/part-time given).
      { id: 't10', name: 'Smt. Rekha Patil', role: 'Lecturer', employment: 'management', scale: 'Consolidated' },
    ] satisfies StaffMember[],
  },
  support: {
    eyebrow: 'Support staff',
    before: 'The team that keeps the ',
    highlight: 'college running',
    members: [
      { id: 's1', name: 'Staff Name', role: 'Librarian', bio: 'Manages the library, e-resources and the Web OPAC.', experience: '14 yrs', qualification: 'M.Lib.Sc.' },
      { id: 's2', name: 'Staff Name', role: 'Office Superintendent', bio: 'Oversees admissions, records and the college office.', experience: '20 yrs', qualification: 'B.Com.' },
      { id: 's3', name: 'Staff Name', role: 'First Division Assistant', bio: 'Handles student records, fees and scholarships.', experience: '12 yrs', qualification: 'B.A.' },
      { id: 's4', name: 'Staff Name', role: 'Computer Operator', bio: 'Supports the computer lab, website and digital records.', experience: '7 yrs', qualification: 'BCA' },
    ] satisfies StaffMember[],
  },
}

// Each facility is its own two-column section on the Facilities page.
// Moot Court links the college's PDF; the other copy is MOCK and links are placeholders.
export type Facility = {
  id: string
  eyebrow: string
  before: string
  highlight: string
  body: string[]
  image: string
  imageAlt: string
  cta: { label: string; href: string }
}

export const facilities: Facility[] = [
  {
    id: 'moot-court',
    eyebrow: 'Facility 01',
    before: 'Moot ',
    highlight: 'Court',
    body: [
      'A dedicated moot courtroom where students argue cases before mock benches, learning to frame issues, cite authority and think on their feet.',
      'Regular sessions, inter-class competitions and guidance from practising advocates prepare students for real courtroom work.',
    ],
    image: moot,
    imageAlt: 'Law student arguing at a podium during a moot court session',
    cta: { label: 'View Moot Court PDF', href: 'https://www.vsrlawcollege.org/images/Moot_Court.pdf' },
  },
  {
    id: 'digital-library',
    eyebrow: 'Facility 02',
    before: 'Digital ',
    highlight: 'Library',
    body: [
      'Online access to law reports, journals, e-books and legal databases, so students and faculty can research from anywhere on campus.',
      'The Web OPAC catalogue makes it quick to find books and periodicals in the physical library as well.',
    ],
    image: library,
    imageAlt: 'Law library reading room with shelves of books',
    cta: { label: 'Learn more', href: '#' },
  },
  {
    id: 'legal-aid-cell',
    eyebrow: 'Facility 03',
    before: 'Legal Aid ',
    highlight: 'Cell',
    body: [
      'Students run free legal-awareness camps and offer guidance to the community under the supervision of faculty members.',
      'Working with real people and real problems builds empathy and a commitment to access to justice.',
    ],
    image: gavel,
    imageAlt: 'Gavel and scales of justice on a desk',
    cta: { label: 'Learn more', href: '#' },
  },
  {
    id: 'student-internships',
    eyebrow: 'Facility 04',
    before: 'Student ',
    highlight: 'Internships',
    body: [
      'Internships with advocates, courts, law firms and legal-aid bodies connect classroom learning with day-to-day legal practice.',
      'Students learn drafting, client interaction and court procedure while building a network in the profession.',
    ],
    image: professor,
    imageAlt: 'Senior advocate mentoring in front of bookshelves',
    cta: { label: 'Learn more', href: '#' },
  },
  {
    id: 'experiential-learning',
    eyebrow: 'Facility 05',
    before: 'Experiential ',
    highlight: 'Learning',
    body: [
      'Court visits, client-counselling sessions, drafting exercises and field work teach the law by doing rather than only reading.',
      'Each activity is linked to the syllabus so practical experience reinforces what students learn in class.',
    ],
    image: group,
    imageAlt: 'Students walking together across the campus',
    cta: { label: 'Learn more', href: '#' },
  },
]

export const why = {
  eyebrow: 'Why choose VSR',
  before: 'The first institution for ',
  highlight: 'legal education',
  after: ' in Ballari district',
  cards: [
    {
      icon: 'landmark',
      title: 'Government aided & affordable',
      body: 'A grant-in-aid college aided by the Government of Karnataka, keeping quality legal education within reach.',
      href: paths.about,
    },
    {
      icon: 'scale',
      title: 'Moot court & legal aid cell',
      body: 'Experiential learning through moot court sessions, student internships and community legal-awareness work.',
      href: paths.facilities,
    },
    {
      icon: 'book-open',
      title: 'Library & e-resources',
      body: 'A well-stocked library with books, journals, e-resources, Web OPAC and a digital library for every student.',
      href: `${SITE}/facilities-left/learning-reources/digital-library`,
    },
  ] satisfies { icon: IconName; title: string; body: string; href: string }[],
}

export const announcements = {
  eyebrow: 'Academic updates',
  before: 'Announcements & ',
  highlight: 'notices',
  feature: { title: 'Moot court sessions for LL.B. students', meta: 'Experiential learning' },
  items: [
    { title: 'Admissions open for the 3-year LL.B. course', meta: 'Admissions · Eligibility as per KSLU ordinance', href: `${SITE}/courses-offered/admissions` },
    { title: 'Calendar of events for the academic year', meta: 'Student Corner', href: `${SITE}/calendar-of-events` },
    { title: 'University results & rank holders', meta: 'Results · KSLU, Hubballi', href: `${SITE}/ranks-achievements` },
    { title: 'Legal awareness programmes by the Legal Aid Cell', meta: 'Extension activities', href: `${SITE}/facilities-left/learning-reources/legal-aid-cell` },
  ],
}

export const affiliations = ['KSLU Hubballi', 'Bar Council of India', 'UGC 2(f) & 12B', 'NAAC', 'AISHE C-9846', 'Govt. of Karnataka']

export const programmes = {
  eyebrow: 'Programmes & facilities',
  before: 'Learning & ',
  highlight: 'expertise',
  after: ' at VSR',
  items: [
    { title: 'LL.B. – 3 Years Course', body: 'For graduates of any faculty — minimum 45% (40% for SC/ST). Admission on merit, subject to KSLU approval.', href: `${SITE}/courses-offered/l-l-b-3-years` },
    { title: 'Moot Court', body: 'Courtroom practice through regular moot court sessions and experiential learning.', href: `${SITE}/facilities-left/learning-reources/facility-moot-court` },
    { title: 'Legal Aid Cell', body: 'Legal awareness and aid activities that take the law to the community.', href: `${SITE}/facilities-left/learning-reources/legal-aid-cell` },
    { title: 'Student Internships', body: 'Internships that connect classroom learning with the practising legal profession.', href: `${SITE}/facilities-left/learning-reources/student-internships` },
    { title: 'Add-on & Certificate Courses', body: 'Certificate courses, capacity-building programmes, seminars and workshops.', href: `${SITE}/student-corner/addon-certificate-courses` },
  ],
}

export const funFacts = {
  eyebrow: 'Fun facts about VSR',
  parts: [
    { text: 'Educating advocates who become ' },
    { text: 'judges', highlight: true },
    { text: ', prosecutors and ' },
    { text: 'civil servants', highlight: true },
  ],
  stats: [
    { label: 'Year established', value: '1975' },
    { label: 'Graduates produced', value: '26,000+' },
    { label: 'Years of V.V. Sangha', value: '100+' },
  ],
}

export const admission = {
  before: 'Apply for ',
  highlight: 'admission?',
  body: 'Graduates of any faculty with a minimum of 45% (40% for SC/ST) are eligible for the 3-year LL.B. Students from outside Karnataka need an Eligibility Certificate from KSLU before applying.',
  placeholder: 'Your email address',
  cta: 'Enquire',
}

export const footer = {
  about:
    'Affiliated to Karnataka State Law University, Hubballi. Approved by the Bar Council of India. Recognised under Sections 2(f) & 12B of the UGC Act.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'About the College', href: `${SITE}/about-college` },
        { label: 'Faculty & Staff', href: paths.faculty },
        { label: 'Vision & Mission', href: `${SITE}/vision-mission` },
        { label: 'LL.B. – 3 Years', href: '/courses/llb-3-years' },
        { label: 'Admissions', href: `${SITE}/courses-offered/admissions` },
        { label: 'Results', href: `${SITE}/results` },
      ],
    },
    {
      title: 'Student Corner',
      links: [
        { label: 'Time Table', href: '/student-corner/time-table' },
        { label: 'Programme Syllabus', href: '/student-corner/programme-syllabus' },
        { label: 'Study Material', href: '/student-corner/study-material' },
        { label: 'Question Bank', href: '/student-corner/question-bank' },
        { label: 'Library & Web OPAC', href: `${SITE}/question-papers/web-opac` },
      ],
    },
  ] satisfies { title: string; links: Link[] }[],
  copyright: `© ${new Date().getFullYear()} V.V. Sangha's Vunki Sannarudrappa Law College, Ballari. All rights reserved.`,
}
