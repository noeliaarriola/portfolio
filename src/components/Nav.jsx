import ThemeToggle from './ThemeToggle'
import { useT, LanguageSwitch } from '../i18n.jsx'

export default function Nav() {
  const t = useT()
  return (
    <nav className="nav-grid layout-grid">
      <div className="nav-left">NOEL A.</div>

      <div className="nav-center">
        <a href="#" className="nav-link active" id="link-home">{t.nav.home}</a>
        <a href="#" className="nav-link" id="link-about">{t.nav.about}</a>
        <a href="#" className="nav-link" id="link-projects">{t.nav.projects}</a>
        <a href="#" className="nav-link" id="link-contact">{t.nav.contact}</a>
      </div>

      <div className="nav-right">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </nav>
  )
}
