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
    content: {

      problem: (
        <div className="modal-content-text">
          <p>Powersis started as an independent electrical engineering service with the goal of building a stronger market presence and attracting new clients.</p>
          <p>The challenge was not only creating a website, but transforming a technical service into a clear, trustworthy, and scalable digital experience.</p>
          <p>The company needed a platform that could communicate complex engineering solutions, improve online visibility, and create a stronger foundation for being discovered through Google search.</p>

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

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/powersis-hero.jpg" alt="Powersis — homepage hero: Engenharia Elétrica" /></div>
          </figure>
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Turning technical expertise into clear communication</h4>
            <p>Electrical engineering services often involve complex concepts. The website structure was designed to help potential clients quickly understand what Powersis offers and why they can trust the company.</p>
          </div>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/powersis-servicos.jpg" alt="Powersis — 'Nossos Serviços' section with six service cards" /></div>
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

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/powersis-sobre.jpg" alt="Powersis — office, '+12 years in the market' and CREA registration" /></div>
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

          <h4 className="modal-list-title">Results</h4>
          <div className="modal-results">
            <div className="modal-results-item">
              <span className="modal-results-num">01</span>
              <span className="modal-results-text">Stronger online presence</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">02</span>
              <span className="modal-results-text">Improved business credibility</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">03</span>
              <span className="modal-results-text">Clearer communication of services</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">04</span>
              <span className="modal-results-text">SEO-oriented website foundation</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">05</span>
              <span className="modal-results-text">Digital structure ready for expansion</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">→</span>
              <span className="modal-results-text">4 locations across Rio de Janeiro and Paraná today</span>
            </div>
          </div>

          <blockquote className="modal-quote">
            From a solo engineering practice to a growing company serving clients throughout Rio de Janeiro.
          </blockquote>
        </div>
      ),

    },
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
    content: {

      problem: (
        <div className="modal-content-text">
          <p>SPR Capital is a financial startup focused on <strong>helping companies access capital and connect with investment opportunities</strong>.</p>
          <p>This was a <strong>group project</strong> where I led the UX process. Because financial services often involve complex processes, uncertainty, and unfamiliar terminology, the main challenge was creating a digital experience that could <strong>build trust, explain the platform's value, and guide users through the journey</strong>.</p>
          <p>The goal was not only to design a website, but to <strong>understand the needs of the people involved</strong> and translate those insights into a clearer, more accessible product experience.</p>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Starting with the market</h4>
            <p>Before designing anything, I ran a <strong>competitive audit</strong> of financial platforms — value propositions, target audiences, strengths, weaknesses, and even their tech stacks — to find where SPR could stand out.</p>
          </div>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/spr-audit.jpg" alt="SPR Capital — competitive audit comparing Bloxs, BrBatel, Captal and B8 Partners across value proposition, audience, strengths and tech stack" /></div>
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
            <p>I created <strong>two user personas</strong> to represent the main stakeholders involved in the platform, each with their own goals, user stories, and journey.</p>

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

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/spr-personas.jpg" alt="SPR Capital — the two personas with profiles, motivations, needs, user stories and end-to-end journey maps" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Defining the problem</h4>
            <p>I mapped each persona's <strong>pain points</strong>, turned them into <strong>problem statements</strong> — Pedro, a mid-size entrepreneur, and Eduardo, a partner lawyer — and defined a <strong>value proposition</strong> for each.</p>
          </div>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/spr-define.jpg" alt="SPR Capital — pain points, problem statements for Pedro and Eduardo, and value propositions" /></div>
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

          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Information Architecture</h4>
            <p>I structured the whole site to guide <strong>each user type to the right section</strong> and a specific conversion point — separate paths for entrepreneurs and partners.</p>
          </div>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/spr-ia.jpg" alt="SPR Capital — information architecture: Home branching to Quem Somos, Soluções and Contato, then Empresários and Parceiros with specific contact forms" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">User Flow</h4>
            <p>Two distinct paths were designed based on user type, <strong>each ending at a specific contact form</strong> to reduce friction and increase conversion intent.</p>
          </div>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/spr-userflow.jpg" alt="SPR Capital — user flow from Home through navigation to the Empresários or Parceiros landing pages and confirmation" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Designing for trust</h4>
            <p>For financial products, <strong>credibility is essential</strong>. The interface was designed to communicate professionalism and confidence through:</p>
            <ul className="modal-list">
              <li>Clear content hierarchy</li>
              <li>Structured sections</li>
              <li>Direct messaging</li>
              <li>Consistent visual language</li>
              <li>Frictionless navigation</li>
            </ul>
          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Creating a foundation for growth</h4>
            <p>As an early-stage startup, SPR Capital needed a digital experience that could evolve. The solution was designed with scalability in mind, allowing new services, information, and future product iterations to be added over time.</p>
          </div>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>The project transformed SPR Capital's idea into a <strong>structured digital experience focused on clarity, trust, and user understanding</strong>.</p>
          <p>By combining <strong>research, strategy, and interface design</strong>, it created a stronger foundation for communicating the startup's value proposition — grounded in real user needs, not assumptions.</p>

          <h4 className="modal-list-title">Results</h4>
          <div className="modal-results">
            <div className="modal-results-item">
              <span className="modal-results-num">01</span>
              <span className="modal-results-text">User needs translated into product decisions</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">02</span>
              <span className="modal-results-text">Clearer communication of the platform's purpose</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">03</span>
              <span className="modal-results-text">Improved understanding of the user journey</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">04</span>
              <span className="modal-results-text">Stronger trust-building experience</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">05</span>
              <span className="modal-results-text">Responsive and scalable digital solution</span>
            </div>
            <div className="modal-results-item">
              <span className="modal-results-num">→</span>
              <span className="modal-results-text">Two tailored paths: entrepreneurs and partners</span>
            </div>
          </div>

          <blockquote className="modal-quote">
            A full UX process — from competitive research to a scalable, trust-first solution.
          </blockquote>
        </div>
      ),

    },
  },
  {
    num: '01',
    name: 'Cleear Cosmetics',
    subtitle: 'Creating a cohesive e-commerce experience for a growing beauty brand',
    tags: 'E-COMMERCE DESIGN / UI DESIGN / BRAND FOUNDATION / RESPONSIVE',
    year: '2024',
    tech: ['Figma', 'Shopify', 'Design Tokens'],
    thumb: '/media/cleear-cover.png',
    image: '/media/cleear-hero.jpg',
    content: {

      problem: (
        <div className="modal-content-text">
          <p>Cleear Cosmetics had an existing online presence, but it was <strong>not fully supporting the brand's sales process</strong>.</p>
          <p>Customers still depended on <strong>manual channels</strong> to discover products and complete purchases, creating friction and limiting the brand's growth.</p>
          <p>The goal was to create a <strong>more structured e-commerce experience</strong> while building a stronger and <strong>more consistent digital identity</strong>.</p>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/cleear-filosofia.jpg" alt="Cleear Cosmetics — 'Filosofia das fórmulas' section with formula comparison slider" /></div>
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
          <p>I worked on transforming the brand's digital experience by combining <strong>UX structure, visual strategy, and interface design</strong>.</p>
          <p>The project required both defining a <strong>clearer brand direction</strong> and building a shopping experience that could <strong>reduce the dependency on manual sales channels</strong>.</p>

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
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Building a consistent brand foundation</h4>
            <p>The brand had different visual styles, colors, and typography choices across its materials. I created a <strong>clearer visual direction</strong> to bring <strong>consistency across the entire experience</strong>.</p>
            <h4 className="modal-list-title" style={{ marginTop: '12px' }}>Brand decisions</h4>
            <ul className="modal-list">
              <li>Defined color palette</li>
              <li>Typography system</li>
              <li>Visual hierarchy</li>
              <li>Image style direction</li>
            </ul>
          </div>

          <figure className="modal-media modal-media--doc">
            <div className="modal-media-slot"><img src="/media/cleear-design-system.png" alt="Cleear Cosmetics — design system: color palette, typography, buttons and product card" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Creating a reusable UI foundation</h4>
            <p>To support consistency and future growth, I organized the interface around <strong>reusable elements</strong> that could scale as the brand expanded its catalog and channels.</p>
            <ul className="modal-list">
              <li>Buttons</li>
              <li>Cards</li>
              <li>Product sections</li>
              <li>Navigation patterns</li>
              <li>Layout structure</li>
            </ul>
          </div>

          <figure className="modal-media modal-media--portrait">
            <div className="modal-media-slot"><img src="/media/cleear-mobile-hero.jpg" alt="Cleear Cosmetics — mobile homepage" /></div>
            <div className="modal-media-slot"><img src="/media/cleear-mobile-produtos.jpg" alt="Cleear Cosmetics — mobile product cards" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Simplifying the shopping experience</h4>
            <p>The e-commerce structure was designed to help users move naturally <strong>from discovery to purchase without friction</strong>.</p>
            <div className="modal-process" style={{ margin: '12px 0 0' }}>
              <span>Discover products</span>
              <span className="modal-process-arrow">→</span>
              <span>Understand options</span>
              <span className="modal-process-arrow">→</span>
              <span>Move toward purchase</span>
            </div>
          </div>

          <figure className="modal-media">
            <div className="modal-media-slot"><img src="/media/cleear-produtos.jpg" alt="Cleear Cosmetics — featured products grid" /></div>
          </figure>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>The project transformed an informal sales experience into a <strong>more structured and professional digital storefront</strong>.</p>
          <p>The final solution created a <strong>stronger foundation</strong> for Cleear Cosmetics to present products, improve customer experience, and <strong>continue growing online</strong>.</p>

          <div className="browser-frame">
            <div className="browser-frame-bar">
              <div className="browser-frame-dots"><span /><span /><span /></div>
              <span className="browser-frame-url">cleearcosmetics.com.br</span>
              <a className="browser-frame-live" href="https://cleearcosmetics.com.br/" target="_blank" rel="noopener noreferrer">Live ↗</a>
            </div>
            <video
              className="browser-frame-video"
              src="/media/cleear-demo.mp4"
              poster="/media/cleear-demo-poster.jpg"
              controls
              muted
              loop
              playsInline
              preload="none"
            />
          </div>

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
    content: {

      problem: (
        <div className="modal-content-text">
          <p>App BiT was a 5-week hackathon by Wongola / Black in Tech, run across <strong>Brazil and Angola</strong> — which is why the product and all of its materials are in Portuguese. Our team took on the B2G challenge: <strong>public managers don't have easy access to cross-referenced data</strong> on urban mobility, employment, and mental health by region to base social-inclusion policies on real evidence.</p>

          <p>Our solution was a responsive web app (PWA) with an <strong>AI agent that answers questions in natural language</strong>, powered by the Vísent CDRView dataset — real data on people concentration and network coverage by region.</p>

          <h4 className="modal-list-title">Challenges</h4>
          <ul className="modal-list">
            <li>Making dense geographic data readable for non-technical decision makers</li>
            <li>Designing an AI conversation that feels clear and trustworthy</li>
            <li>Delivering a complete product in 5 weeks with a team of 4</li>
            <li>Keeping the experience consistent across desktop and mobile</li>
            <li>Supporting three languages (Portuguese, English, Spanish)</li>
          </ul>
        </div>
      ),

      role: (
        <div className="modal-content-text">
          <p>I was the UX/UI designer in a team of four (frontend, mobile, and backend developers). <strong>I designed the product end to end</strong> — from the design system to every core screen: map, dashboard, reports, alerts, and the mobile AI chat.</p>
          <p>Before drawing a single screen, I mapped the <strong>complete user flow</strong> — visual exploration through the map, direct questions to the AI agent, and the export path to a citable PDF report.</p>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/appbit-userflow.jpg" alt="AppBiT — complete user flow: map exploration, AI query loop and PDF export" /></div>
          </figure>

          <p>Behind that flow is the primary persona — Carla, a municipal planning coordinator who doesn't write SQL — her pain points, jobs-to-be-done, and the design implication that shaped the whole product: <strong>every interaction must be self-explanatory, in natural language</strong>.</p>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/appbit-research.jpg" alt="AppBiT — user persona Carla Mendes, usage scenario, pain points and jobs-to-be-done" /></div>
          </figure>

          <p>That flow became screens: here, the AI assistant journey — from Carla's first question in natural language to an <strong>evidence-backed answer with citable sources</strong>, in five steps.</p>

          <figure className="modal-media modal-media--full">
            <div className="modal-media-slot"><img src="/media/appbit-flow-assistente.jpg" alt="AppBiT — AI assistant mobile flow: question, analysis, evidence-backed answer and follow-up" /></div>
          </figure>

          <p>I also contributed to the frontend code: <strong>I built the Alerts page in React + TypeScript + Tailwind, working with Claude Code</strong>, following the team's component conventions — and refined the map pin component so its colors mirror the coverage legend.</p>

          <div className="modal-two-col">
            <div>
              <h4 className="modal-list-title">Contributions</h4>
              <ul className="modal-list">
                <li>User research, persona & user flow</li>
                <li>Design system & design tokens</li>
                <li>Interactive map & coverage legend</li>
                <li>Dashboard & reports screens</li>
                <li>Alerts experience (design + code)</li>
                <li>Mobile AI chat design</li>
                <li>Developer documentation</li>
                <li>Frontend implementation</li>
                <li>Demo Day pitch deck</li>
              </ul>
            </div>
            <div>
              <h4 className="modal-list-title">Process</h4>
              <div className="modal-process">
                <span>Understanding the brief</span>
                <span className="modal-process-arrow">→</span>
                <span>Design system</span>
                <span className="modal-process-arrow">→</span>
                <span>Screen design</span>
                <span className="modal-process-arrow">→</span>
                <span>Frontend implementation</span>
              </div>
            </div>
          </div>

          <figure className="modal-media">
            <div className="modal-media-slot"><img src="/media/appbit-pitch-solucao.png" alt="Demo Day pitch — the solution: from question to grounded decision" /></div>
          </figure>
        </div>
      ),

      decisions: (
        <div className="modal-content-text">
          <div className="modal-subsection">
            <h4 className="modal-subsection-title">A map as the main surface</h4>
            <p>The core question for public managers is always "where?". The map shows people concentration and network coverage by region, with a color-coded legend — and every pin on the map uses the same color tones as the legend, so the data can be read at a glance.</p>
          </div>

          <div className="video-embed">
            <iframe
              src="https://www.youtube-nocookie.com/embed/cg-uaO2qScs?controls=0&rel=0&modestbranding=1&playsinline=1"
              title="AppBiT — product demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Dashboards for evidence-based decisions</h4>
            <p>Beyond the map, managers need to compare indicators and export findings. The dashboard and reports screens organize the data into clear, comparable views that support policy decisions.</p>
          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">A conversational AI for non-technical users</h4>
            <p>Not every manager knows how to query data. The mobile chat lets them ask questions in natural language — "Where are training programs missing for low-income youth?" — and get answers grounded in the dataset.</p>
          </div>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">A design system built for team speed</h4>
            <p>With four people and five weeks, consistency couldn't depend on reviews. The design system defined tokens for color, typography, and components — no hardcoded values — so design and code stayed aligned as the team moved fast.</p>
          </div>

          <figure className="modal-media modal-media--doc">
            <div className="modal-media-slot"><img src="/media/appbit-design-system.jpg" alt="AppBiT design system — colors, typography and components" /></div>
          </figure>

          <div className="modal-subsection">
            <h4 className="modal-subsection-title">Every flow designed screen by screen</h4>
            <p>Before implementation, each mobile flow was fully mapped in Figma - <strong>every screen, every state, every transition</strong>. Here, the onboarding flow: splash and institutional login, the first thing a public manager sees.</p>
          </div>

          <figure className="modal-media modal-media--doc">
            <div className="modal-media-slot"><img src="/media/appbit-flow-onboarding.png" alt="AppBiT — mobile onboarding flow: splash and institutional login screens" /></div>
          </figure>
        </div>
      ),

      outcome: (
        <div className="modal-content-text">
          <p>We delivered a <strong>working MVP presented at the hackathon Demo Day</strong> in July 2026: an AI-powered data platform with an interactive map, dashboard, reports, alerts, and a mobile chat experience.</p>
          <p>For me, this project was also a milestone — <strong>my first time designing a product and implementing part of it in production code</strong>, working inside a real cross-functional team. I also designed the pitch deck we presented at Demo Day.</p>

          <figure className="modal-media">
            <div className="modal-media-slot"><img src="/media/appbit-pitch-conclusao.png" alt="Demo Day pitch — closing slide: try the MVP now, with QR code to install" /></div>
          </figure>

          <h4 className="modal-list-title">Results</h4>
          <ul className="modal-list">
            <li>Complete design system with reusable tokens and components</li>
            <li>Interactive map with color-coded coverage legend</li>
            <li>Alerts page designed and implemented in React + TypeScript</li>
            <li>Interface localized in Portuguese, English, and Spanish</li>
            <li>MVP delivered on time by a cross-functional team of four</li>
          </ul>

          <blockquote className="modal-quote">
            From Figma to production code: Designing and building the same product.
          </blockquote>

          <a
            className="modal-cta"
            href="https://www.figma.com/proto/nohbwrvbhVZ1vfOtT3wWwJ/App-Bit---Hackathon?node-id=261-2243&t=rKF9yaL7LnnQjdwb-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the interactive Figma prototype ↗
          </a>
        </div>
      ),

    },
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
