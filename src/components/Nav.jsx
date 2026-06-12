import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav className="nav-grid layout-grid">
      <div className="nav-left">NOEL A.</div>

      <div className="nav-center">
        <a href="#" className="nav-link active" id="link-home">HOME</a>
        <a href="#" className="nav-link" id="link-about">ABOUT</a>
        <a href="#" className="nav-link" id="link-projects">PROJECTS</a>
        <a href="#" className="nav-link" id="link-contact">CONTACT</a>
      </div>

      <div className="nav-right">
        <ThemeToggle />
      </div>
    </nav>
  )
}
