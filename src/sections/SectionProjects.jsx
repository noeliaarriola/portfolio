// SectionProjects.jsx
// Portfolio work list. Projects are defined as a data array at the top —
// easy to add, remove, or reorder without touching JSX structure.
//
// Each project has a `content` object with 4 keys for the case-study modal:
//   problem, role, decisions, outcome  (fill in when ready — leave empty for placeholder)
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ProjectRow from '../components/ProjectRow'
import ProjectModal from '../components/ProjectModal'
import { useT } from '../i18n.jsx'
import cleearContent from '../content/cleear.jsx'
import powersisContent from '../content/powersis.jsx'
import appbitContent from '../content/appbit.jsx'
import sprContent from '../content/spr.jsx'

// ── Projects data ─────────────────────────────────────────────────────────────
// To add a project: duplicate an entry and update all fields.
// Images go in /public/media/ and are referenced from there.
// Modal content: fill in problem / role / decisions / outcome when ready.
const PROJECTS = [
  {
    num: '02',
    name: 'Powersis',
    subtitle: 'Building the digital foundation for a growing engineering company',
    tags: 'UX STRATEGY / WEB DESIGN / SEO / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'SEO'],
    thumb: '/media/powersis-cover.png',
    image: '/media/powersis-cover.png',
    content: powersisContent,
  },
  {
    num: '04',
    name: 'SPR Capital',
    subtitle: 'A group project — designing a financial experience from UX research to a scalable solution',
    tags: 'UX RESEARCH / PRODUCT STRATEGY / UI DESIGN / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'FigJam', 'Miro'],
    thumb: '/media/spr-hero.jpg',
    image: '/media/spr-hero.jpg',
    content: sprContent,
  },
  {
    num: '01',
    name: 'Cleear Cosmetics',
    subtitle: 'Creating a cohesive e-commerce experience for a growing beauty brand',
    tags: 'E-COMMERCE DESIGN / UI DESIGN / BRAND FOUNDATION / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'Shopify', 'Design Tokens'],
    thumb: '/media/cleear-cover.png',
    image: '/media/cleear-desktop-poster.jpg', // poster shown while the cover video loads
    video: '/media/cleear-desktop.mp4',
    content: cleearContent,
  },
  {
    num: '03',
    name: 'AppBiT — B2G',
    subtitle: 'Designing an AI-powered public data platform during a 5-week hackathon',
    tags: 'UX/UI DESIGN / DESIGN SYSTEM / DATA VISUALIZATION / FRONTEND',
    year: '2026',
    tech: ['Figma', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://appbit-web.onrender.com/',
    thumb: '/media/appbit-cover.png',
    image: '/media/appbit-pitch-cover.png',
    content: appbitContent,
  },
]

export default function SectionProjects() {
  const [activeProject, setActiveProject] = useState(null)
  const t = useT()

  // Localize each project's subtitle + tags for the active language.
  // Names, years, images and rich case-study content stay as authored.
  const projects = PROJECTS
    .filter((project) => !project.hidden)
    .sort((a, b) => a.num.localeCompare(b.num))
    .map((project) => ({
      ...project,
      subtitle: t.projects.subtitles[project.name] || project.subtitle,
      tags: project.tags.split(' / ').map((tag) => t.tags[tag] || tag).join(' / '),
    }))

  return (
    <>
      <section id="sec-3" className="section-layout layout-grid">

        <div className="col-left">
          <div className="sec-num">03</div>
          <div className="selected-work-label">{t.projects.selectedWork}</div>
          <div className="right-jp-text-container">
            <div className="right-jp-text">作品集</div>
            <div className="right-jp-subtext">選ばれたプロジェクト</div>
          </div>
          <div className="bottom-dot">●</div>
        </div>

        <div className="col-center">
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectRow
                key={project.num}
                {...project}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>

        <div className="col-right">
          <div className="right-icon">✳</div>
          <div className="more-projects-label">{t.projects.moreSoon}</div>
          <div className="bottom-dot">●</div>
        </div>

      </section>

      {/* Modal is portalled to document.body so it renders outside sec-3's
          GSAP autoAlpha and is never hidden by the scroll timeline */}
      {createPortal(
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />,
        document.body
      )}
    </>
  )
}
