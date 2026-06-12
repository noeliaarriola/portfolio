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

// ── Projects data ─────────────────────────────────────────────────────────────
// To add a project: duplicate an entry and update all fields.
// Images go in /public/media/ and are referenced from there.
// Modal content: fill in problem / role / decisions / outcome when ready.
const PROJECTS = [
  {
    num: '01',
    name: 'Powersis',
    subtitle: 'Building the digital foundation for a growing engineering company',
    tags: 'UX STRATEGY / WEB DESIGN / SEO / RESPONSIVE',
    year: '2024',
    image: null,
    content: {

      problem: (
        <div className="modal-content-text">
          <p>Powersis started as an independent electrical engineering service with the goal of building a stronger market presence and attracting new clients.</p>
          <p>The challenge was not only creating a website, but transforming a technical service into a clear, trustworthy, and scalable digital experience.</p>
          <p>The company needed a platform that could communicate complex engineering solutions, improve online visibility, and create a stronger foundation for being discovered through Google search.</p>

          {/* ↓ Replace slot with <img src="/media/powersis-cover.jpg" alt="Powersis website" /> */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Hero / Cover</span></div>
          </figure>

          <h4 className="modal-list-title">Challenges</h4>
          <ul className="modal-list">
            <li>No structured digital presence</li>
            <li>Limited visibility on search engines</li>
            <li>Technical services difficult to communicate clearly</li>
            <li>Need to build credibility with potential clients</li>
            <li>Need for a scalable foundation as the company grew</li>
          </ul>
        </div>
      ),

      role: (
        <div className="modal-content-text">
          <p>I worked on the strategy, structure, visual direction, and implementation of the website.</p>
          <p>My focus was to create an experience that balanced business goals with user needs — making technical information easier to understand while supporting the company's growth.</p>

          <div className="modal-two-col">
            <div>
              <h4 className="modal-list-title">Contributions</h4>
              <ul className="modal-list">
                <li>Information architecture</li>
                <li>Content organization</li>
                <li>Service hierarchy</li>
                <li>UX decisions</li>
                <li>Visual design</li>
                <li>Responsive experience</li>
                <li>Website implementation</li>
              </ul>
            </div>
            <div>
              <h4 className="modal-list-title">Process</h4>
              <div className="modal-process">
                <span>Research</span>
                <span className="modal-process-arrow">→</span>
                <span>Content & Structure</span>
                <span className="modal-process-arrow">→</span>
                <span>Design Direction</span>
                <span className="modal-process-arrow">→</span>
                <span>Development</span>
              </div>
            </div>
          </div>

          {/* ↓ Replace slot with process / wireframe image */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Process / Wireframes</span></div>
          </figure>
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Turning technical expertise into clear communication</h4>
            <p>Electrical engineering services often involve complex concepts. The website structure was designed to help potential clients quickly understand what Powersis offers and why they can trust the company.</p>
          </div>

          {/* ↓ Replace with full desktop screenshot */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Website — Desktop</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Building credibility through digital presence</h4>
            <p>The visual direction focused on creating a professional and reliable experience that matched the technical nature of the business. The design emphasized:</p>
            <ul className="modal-list">
              <li>Clear hierarchy</li>
              <li>Organized information</li>
              <li>Professional visual language</li>
              <li>Easy navigation</li>
            </ul>
          </div>

          {/* ↓ Replace with mobile + detail side by side */}
          <figure className="modal-media modal-media--half">
            <div className="modal-media-slot"><span>Mobile view</span></div>
            <div className="modal-media-slot"><span>Service page detail</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Designing for growth</h4>
            <p>The website was created not only for the current business stage, but to support future expansion. The structure allows new services, information, and business opportunities to be added as Powersis continues to grow.</p>
          </div>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>The website became the foundation of Powersis' digital presence and supported the company's transition from an independent engineering service into a growing business.</p>
          <p>Since launching its digital presence, Powersis has expanded its operations, works with clients across Rio de Janeiro, and continues to grow with a broader team of professionals.</p>

          {/* ↓ Replace with final website full view */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Final website — Full view</span></div>
          </figure>

          <h4 className="modal-list-title">Results</h4>
          <ul className="modal-list">
            <li>Stronger online presence</li>
            <li>Improved business credibility</li>
            <li>Clearer communication of services</li>
            <li>SEO-oriented website foundation</li>
            <li>Digital structure ready for expansion</li>
          </ul>

          <blockquote className="modal-quote">
            From a solo engineering practice to a growing company serving clients throughout Rio de Janeiro.
          </blockquote>
        </div>
      ),

    },
  },
  {
    num: '02',
    name: 'SPR Capital',
    subtitle: 'Designing a financial experience from research to a scalable digital solution',
    tags: 'UX RESEARCH / PRODUCT STRATEGY / UI DESIGN / RESPONSIVE',
    year: '2024',
    image: null,
    content: {

      problem: (
        <div className="modal-content-text">
          <p>SPR Capital is a financial startup focused on helping companies access capital and connect with investment opportunities.</p>
          <p>Because financial services often involve complex processes, uncertainty, and unfamiliar terminology, the main challenge was creating a digital experience that could build trust, explain the platform's value, and guide users through the journey.</p>
          <p>The goal was not only to design a website, but to understand the needs of the people involved and translate those insights into a clearer, more accessible product experience.</p>

          {/* ↓ Replace with hero / cover image */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Hero / Cover</span></div>
          </figure>

          <h4 className="modal-list-title">Challenges</h4>
          <ul className="modal-list">
            <li>Communicating a complex financial service in a simple way</li>
            <li>Building trust for an early-stage startup</li>
            <li>Helping users understand the process and next steps</li>
            <li>Designing for different audiences with different motivations</li>
            <li>Creating a scalable digital foundation for future growth</li>
          </ul>
        </div>
      ),

      role: (
        <div className="modal-content-text">
          <p>I worked through the UX process from research and problem definition to the final interface design.</p>
          <p>The project started by understanding the ecosystem around the product, identifying user needs, frustrations, and opportunities before defining the solution. My approach focused on connecting business goals with user expectations and creating a structure that could support both the company and its users.</p>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Understanding the users</h4>
            <p>I created user personas to represent the main stakeholders involved in the platform.</p>

            <div className="modal-personas">
              <div className="modal-persona">
                <div className="modal-persona-header">
                  <span className="modal-persona-name">Pedro</span>
                  <span className="modal-persona-role">Entrepreneur seeking investment</span>
                </div>
                <div className="modal-persona-content">
                  <div>
                    <h4 className="modal-list-title">Goals</h4>
                    <ul className="modal-list">
                      <li>Find reliable support to raise capital</li>
                      <li>Understand the investment process</li>
                      <li>Connect with the right opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="modal-list-title">Pain points</h4>
                    <ul className="modal-list">
                      <li>Lack of clarity about where to start</li>
                      <li>Fear of making mistakes</li>
                      <li>Complex financial terms and processes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-persona">
                <div className="modal-persona-header">
                  <span className="modal-persona-name">Eduardo</span>
                  <span className="modal-persona-role">Partner / Referral professional</span>
                </div>
                <div className="modal-persona-content">
                  <div>
                    <h4 className="modal-list-title">Goals</h4>
                    <ul className="modal-list">
                      <li>Recommend companies confidently</li>
                      <li>Have visibility throughout the process</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="modal-list-title">Pain points</h4>
                    <ul className="modal-list">
                      <li>Informal communication channels</li>
                      <li>Lack of transparency and feedback</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Information Architecture</h4>
            <p>The site structure was defined to guide each user type to the right section and specific conversion point.</p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '16px', marginTop: '10px',
              border: '1px solid var(--border)', borderRadius: '6px',
              fontSize: '0.7rem', overflowX: 'auto', flexWrap: 'nowrap'
            }}>
              <div style={{ flexShrink: 0, padding: '6px 12px', border: '1px solid currentColor', borderRadius: '4px', fontWeight: 600 }}>
                Home
              </div>
              <span style={{ flexShrink: 0, opacity: 0.35 }}>→</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
                {['Quem Somos', 'Soluções', 'Contato'].map(n => (
                  <div key={n} style={{ padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', textAlign: 'center', opacity: 0.8 }}>
                    {n}
                  </div>
                ))}
              </div>
              <span style={{ flexShrink: 0, opacity: 0.35 }}>→</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
                {['Empresários', 'Parceiros'].map(n => (
                  <div key={n} style={{ padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', textAlign: 'center', fontWeight: 600 }}>
                    {n}
                  </div>
                ))}
              </div>
              <span style={{ flexShrink: 0, opacity: 0.35 }}>→</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
                {['Formulário específico', 'Formulário específico'].map((n, i) => (
                  <div key={i} style={{ padding: '5px 10px', border: '1px dashed currentColor', borderRadius: '4px', textAlign: 'center', opacity: 0.6 }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ↓ Replace with user journey map / research artifacts */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>User Journey Map</span></div>
          </figure>

          <h4 className="modal-list-title">Methods used</h4>
          <ul className="modal-list">
            <li>User personas</li>
            <li>User journey mapping</li>
            <li>Competitive analysis</li>
            <li>Brainstorming sessions</li>
            <li>Information architecture</li>
            <li>UX strategy</li>
          </ul>
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Turning complexity into clarity</h4>
            <p>The financial space can feel overwhelming for users unfamiliar with investment processes. The experience was designed to simplify the journey by organizing information around user needs:</p>
            <div className="modal-process" style={{ margin: '12px 0 0' }}>
              <span>What is the service?</span>
              <span className="modal-process-arrow">→</span>
              <span>How does it work?</span>
              <span className="modal-process-arrow">→</span>
              <span>Why does it matter?</span>
              <span className="modal-process-arrow">→</span>
              <span>What is the next step?</span>
            </div>

            <h4 className="modal-list-title" style={{ marginTop: '20px' }}>User Flow</h4>
            <p>Two distinct paths were designed based on user type, each ending at a specific contact form to reduce friction and increase conversion intent.</p>
            <div style={{
              marginTop: '10px', padding: '16px',
              border: '1px solid var(--border)', borderRadius: '6px',
              fontSize: '0.7rem', overflowX: 'auto'
            }}>
              {/* Shared entry */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                <div style={{ flexShrink: 0, padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', fontWeight: 600 }}>
                  Home
                </div>
                <span style={{ opacity: 0.35, flexShrink: 0 }}>→</span>
                <div style={{ flexShrink: 0, padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', opacity: 0.7 }}>
                  Navega
                </div>
                <span style={{ opacity: 0.35, flexShrink: 0 }}>→</span>
                <div style={{ flexShrink: 0, padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', fontWeight: 600 }}>
                  Seleciona tipo
                </div>
              </div>
              {/* Two paths */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', paddingLeft: '16px' }}>
                {[
                  { label: 'Empresários', lp: 'LP Empresários' },
                  { label: 'Parceiros',   lp: 'LP Parceiros'   },
                ].map(({ label, lp }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                    <div style={{ padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', fontWeight: 600, flexShrink: 0 }}>
                      {label}
                    </div>
                    <span style={{ opacity: 0.35, flexShrink: 0 }}>→</span>
                    <div style={{ padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', opacity: 0.75, flexShrink: 0 }}>
                      {lp}
                    </div>
                    <span style={{ opacity: 0.35, flexShrink: 0 }}>→</span>
                    <div style={{ padding: '5px 10px', border: '1px solid currentColor', borderRadius: '4px', opacity: 0.75, flexShrink: 0 }}>
                      Formulário
                    </div>
                    <span style={{ opacity: 0.35, flexShrink: 0 }}>→</span>
                    <div style={{ padding: '5px 10px', border: '1px dashed currentColor', borderRadius: '4px', opacity: 0.6, flexShrink: 0 }}>
                      Confirmação
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ↓ Replace with full desktop screenshot */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Website — Desktop</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Designing for trust</h4>
            <p>For financial products, credibility is essential. The interface was designed to communicate professionalism and confidence through:</p>
            <ul className="modal-list">
              <li>Clear content hierarchy</li>
              <li>Structured sections</li>
              <li>Direct messaging</li>
              <li>Consistent visual language</li>
              <li>Frictionless navigation</li>
            </ul>
          </div>

          {/* ↓ Replace with mobile + detail side by side */}
          <figure className="modal-media modal-media--half">
            <div className="modal-media-slot"><span>Mobile view</span></div>
            <div className="modal-media-slot"><span>UI detail</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Creating a foundation for growth</h4>
            <p>As an early-stage startup, SPR Capital needed a digital experience that could evolve. The solution was designed with scalability in mind, allowing new services, information, and future product iterations to be added over time.</p>
          </div>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>The final design transformed SPR Capital's idea into a structured digital experience focused on clarity, trust, and user understanding.</p>
          <p>By combining research, strategy, and interface design, the project created a stronger foundation for communicating the startup's value proposition.</p>

          {/* ↓ Replace with final website full view */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Final website — Full view</span></div>
          </figure>

          <h4 className="modal-list-title">Results</h4>
          <ul className="modal-list">
            <li>User needs translated into product decisions</li>
            <li>Clearer communication of the platform's purpose</li>
            <li>Improved understanding of the user journey</li>
            <li>Stronger trust-building experience</li>
            <li>Responsive and scalable digital solution</li>
          </ul>
        </div>
      ),

    },
  },
  {
    num: '03',
    name: 'Cleear Cosmetics',
    subtitle: 'Creating a cohesive e-commerce experience for a growing beauty brand',
    tags: 'E-COMMERCE DESIGN / UI DESIGN / BRAND FOUNDATION / RESPONSIVE',
    year: '2024',
    image: null,
    content: {

      problem: (
        <div className="modal-content-text">
          <p>Cleear Cosmetics had an existing online presence, but it was not fully supporting the brand's sales process.</p>
          <p>Customers still depended on manual channels to discover products and complete purchases, creating friction and limiting the brand's growth.</p>
          <p>The goal was to create a more structured e-commerce experience while building a stronger and more consistent digital identity.</p>

          {/* ↓ Replace with hero / cover image */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Hero / Cover</span></div>
          </figure>

          <h4 className="modal-list-title">Challenges</h4>
          <ul className="modal-list">
            <li>Existing website with limited functionality</li>
            <li>Sales process dependent on direct communication</li>
            <li>No centralized shopping experience</li>
            <li>Inconsistent visual identity</li>
            <li>Need for a scalable digital foundation</li>
          </ul>
        </div>
      ),

      role: (
        <div className="modal-content-text">
          <p>I worked on transforming the brand's digital experience by combining UX structure, visual strategy, and interface design.</p>
          <p>The project required both defining a clearer brand direction and building a shopping experience that could reduce the dependency on manual sales channels.</p>

          <div className="modal-two-col">
            <div>
              <h4 className="modal-list-title">Contributions</h4>
              <ul className="modal-list">
                <li>E-commerce structure</li>
                <li>User flow organization</li>
                <li>Product presentation</li>
                <li>Brand direction</li>
                <li>UI design</li>
                <li>Responsive experience</li>
              </ul>
            </div>
            <div>
              <h4 className="modal-list-title">Process</h4>
              <div className="modal-process">
                <span>Brand analysis</span>
                <span className="modal-process-arrow">→</span>
                <span>Structure</span>
                <span className="modal-process-arrow">→</span>
                <span>Visual direction</span>
                <span className="modal-process-arrow">→</span>
                <span>UI design</span>
              </div>
            </div>
          </div>

          {/* ↓ Replace with process / wireframe image */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Process / Wireframes</span></div>
          </figure>
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Building a consistent brand foundation</h4>
            <p>The brand had different visual styles, colors, and typography choices across its materials. I created a clearer visual direction to bring consistency across the entire experience.</p>
            <h4 className="modal-list-title" style={{ marginTop: '12px' }}>Brand decisions</h4>
            <ul className="modal-list">
              <li>Defined color palette</li>
              <li>Typography system</li>
              <li>Visual hierarchy</li>
              <li>Image style direction</li>
            </ul>
          </div>

          {/* ↓ Before (mixed styles) + After (palette & typography) */}
          <figure className="modal-media modal-media--half">
            <div className="modal-media-slot"><span>Before — mixed styles</span></div>
            <div className="modal-media-slot"><span>After — palette & typography</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Creating a reusable UI foundation</h4>
            <p>To support consistency and future growth, I organized the interface around reusable elements that could scale as the brand expanded its catalog and channels.</p>
            <ul className="modal-list">
              <li>Buttons</li>
              <li>Cards</li>
              <li>Product sections</li>
              <li>Navigation patterns</li>
              <li>Layout structure</li>
            </ul>
          </div>

          {/* ↓ UI kit components + Buttons / Cards / Product card */}
          <figure className="modal-media modal-media--half">
            <div className="modal-media-slot"><span>UI kit — components</span></div>
            <div className="modal-media-slot"><span>Buttons / Cards / Product card</span></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Simplifying the shopping experience</h4>
            <p>The e-commerce structure was designed to help users move naturally from discovery to purchase without friction.</p>
            <div className="modal-process" style={{ margin: '12px 0 0' }}>
              <span>Discover products</span>
              <span className="modal-process-arrow">→</span>
              <span>Understand options</span>
              <span className="modal-process-arrow">→</span>
              <span>Move toward purchase</span>
            </div>
          </div>

          {/* ↓ Full e-commerce view / product page */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Website — Desktop</span></div>
          </figure>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>The project transformed an informal sales experience into a more structured and professional digital storefront.</p>
          <p>The final solution created a stronger foundation for Cleear Cosmetics to present products, improve customer experience, and continue growing online.</p>

          {/* ↓ Replace with final website full view */}
          <figure className="modal-media">
            <div className="modal-media-slot"><span>Final website — Full view</span></div>
          </figure>

          <h4 className="modal-list-title">Results</h4>
          <ul className="modal-list">
            <li>More organized shopping journey</li>
            <li>Stronger brand consistency</li>
            <li>Improved product presentation</li>
            <li>Scalable UI foundation</li>
            <li>Better foundation for future growth</li>
          </ul>
        </div>
      ),

    },
  },
]

export default function SectionProjects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <>
      <section id="sec-3" className="section-layout layout-grid">

        <div className="col-left">
          <div className="sec-num">03</div>
          <div className="selected-work-label">SELECTED WORK</div>
          <div className="right-jp-text-container">
            <div className="right-jp-text">作品集</div>
            <div className="right-jp-subtext">選ばれたプロジェクト</div>
          </div>
          <div className="bottom-dot">●</div>
        </div>

        <div className="col-center">
          <div className="projects-list">
            {PROJECTS.map((project) => (
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
          <div className="more-projects-label">MORE PROJECTS SOON</div>
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
