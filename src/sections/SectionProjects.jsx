// SectionProjects.jsx
// Portfolio work list. Projects are defined as a data array at the top —
// easy to add, remove, or reorder without touching JSX structure.
//
// Each project has a `content` object with 4 keys for the case-study modal:
//   problem, role, decisions, outcome  (fill in when ready — leave empty for placeholder)
import { useEffect, useState } from 'react'
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
//
// `wall` is the row's hover: columns of screens that slide upward behind the
// cover. Each column is { kind: 'desktop' | 'mobile', shots: [...] }; columns
// are laid out left to right and the screens in a column loop top to bottom.
// The shots are small copies made just for this (public/media/wall/, 520px
// wide for desktop and 220px for mobile) — do not point at the full-size
// case-study images, they are far too heavy for a hover.
const shot = (name) => `/media/wall/${name}.jpg`

const PROJECTS = [
  {
    num: '02',
    name: 'Powersis',
    subtitle: 'Building the digital foundation for a growing engineering company',
    tags: 'UX STRATEGY / WEB DESIGN / SEO / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'SEO'],
    thumb: '/media/powersis-cover.png',
    image: '/media/powersis-desktop-poster.jpg', // poster shown while the cover video loads
    video: '/media/powersis-desktop.mp4',
    wall: [
      { kind: 'desktop', shots: [shot('powersis-hero'), shot('powersis-servicos'), shot('powersis-sobre')] },
      { kind: 'mobile', shots: [shot('powersis-mobile-hero'), shot('powersis-mobile-sobre')] },
      { kind: 'desktop', shots: [shot('powersis-contato'), shot('powersis-servicos'), shot('powersis-clientes'), shot('powersis-hero')] },
      { kind: 'mobile', shots: [shot('powersis-mobile-sobre'), shot('powersis-mobile-hero')] },
      { kind: 'desktop', shots: [shot('powersis-sobre'), shot('powersis-clientes'), shot('powersis-hero'), shot('powersis-contato')] },
    ],
    content: powersisContent,
  },
  {
    num: '04',
    name: 'SPR Capital',
    subtitle: 'A group project — designing a financial experience from UX research to a scalable solution',
    tags: 'UX RESEARCH / PRODUCT STRATEGY / UI DESIGN / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'FigJam', 'Miro', 'Framer'],
    link: 'https://sprcapital.framer.website/',
    thumb: '/media/spr-hero.jpg?v=2',
    image: '/media/spr-desktop-poster.jpg', // poster shown while the cover video loads
    video: '/media/spr-desktop.mp4',
    wall: [
      { kind: 'desktop', shots: [shot('spr-site-hero'), shot('spr-site-areas'), shot('spr-site-equipe')] },
      { kind: 'mobile', shots: [shot('spr-mobile-hero'), shot('spr-mobile-areas')] },
      { kind: 'desktop', shots: [shot('spr-site-capital'), shot('spr-site-quem'), shot('spr-site-contato'), shot('spr-site-hero')] },
      { kind: 'mobile', shots: [shot('spr-mobile-quem'), shot('spr-mobile-contato')] },
      { kind: 'desktop', shots: [shot('spr-site-areas'), shot('spr-site-contato'), shot('spr-site-hero'), shot('spr-site-capital')] },
    ],
    content: sprContent,
  },
  {
    num: '01',
    name: 'Cleear Cosmetics',
    subtitle: 'Creating a cohesive e-commerce experience for a growing beauty brand',
    tags: 'E-COMMERCE DESIGN / UI DESIGN / BRAND FOUNDATION / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'Adobe Illustrator', 'Design System', 'Shopify', 'E-commerce Setup'],
    thumb: '/media/cleear-cover.png',
    image: '/media/cleear-desktop-poster.jpg', // poster shown while the cover video loads
    video: '/media/cleear-desktop.mp4',
    wall: [
      { kind: 'desktop', shots: [shot('cleear-hero'), shot('cleear-produtos'), shot('cleear-filosofia')] },
      { kind: 'mobile', shots: [shot('cleear-mobile-hero'), shot('cleear-mobile-produtos')] },
      { kind: 'desktop', shots: [shot('cleear-produtos'), shot('cleear-filosofia'), shot('cleear-hero')] },
      { kind: 'mobile', shots: [shot('cleear-mobile-produtos'), shot('cleear-mobile-hero')] },
      { kind: 'desktop', shots: [shot('cleear-filosofia'), shot('cleear-hero'), shot('cleear-produtos')] },
    ],
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
    // Provisional: pitch slides and flows, until final screens are exported
    wall: [
      { kind: 'desktop', shots: [shot('appbit-pitch-solucao'), shot('appbit-pitch-cover'), shot('appbit-pitch-conclusao')] },
      { kind: 'mobile', shots: [shot('appbit-flow-onboarding'), shot('appbit-design-system')] },
      { kind: 'desktop', shots: [shot('appbit-pitch-conclusao'), shot('appbit-flow-assistente'), shot('appbit-pitch-solucao')] },
      { kind: 'mobile', shots: [shot('appbit-design-system'), shot('appbit-flow-onboarding')] },
      { kind: 'desktop', shots: [shot('appbit-pitch-cover'), shot('appbit-pitch-solucao'), shot('appbit-flow-assistente')] },
    ],
    content: appbitContent,
  },
]

export default function SectionProjects() {
  const [activeProject, setActiveProject] = useState(null)
  const [showWall, setShowWall] = useState(false)
  const t = useT()

  // The hover wall is only for mouse users who have not asked for reduced
  // motion. Its images are requested once the browser is idle, so the first
  // paint of the site never pays for them.
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reducedMotion) return
    const arm = () => setShowWall(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(arm, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(arm, 2000)
    return () => clearTimeout(id)
  }, [])

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
          {/* Mobile/tablet only (hidden on desktop, where col-left carries the
              number and label): the side rails fold away below 900px, so the
              section number moves to the top-left corner and the label
              becomes the section's centred title, with a hint as subtitle. */}
          <span className="sec-num mobile-sec-num" aria-hidden="true">03</span>
          <div className="projects-mobile-head">
            <h2 className="section-headline projects-mobile-title">
              {t.projects.titlePre}<em>{t.projects.titleEm}</em>
            </h2>
            <p className="projects-mobile-hint">{t.projects.tapHint}</p>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectRow
                key={project.num}
                {...project}
                showWall={showWall}
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
