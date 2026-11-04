// content/powersis.jsx — Powersis case study, EN / ES / PT.
import { P, Process, Results } from './rich.jsx'

const STR = {
  en: {
    problem: {
      p1: 'Powersis started as an independent electrical engineering service with the goal of building a **stronger market presence** and attracting new clients.',
      p2: 'The challenge was not only creating a website, but transforming a technical service into a **clear, trustworthy, and scalable digital experience**.',
      p3: 'The company needed a platform that could communicate complex engineering solutions, **improve online visibility**, and create a stronger foundation for being **discovered through Google search**.',
      challengesTitle: 'Challenges',
      challenges: ['No structured digital presence', 'Limited visibility on search engines', 'Technical services difficult to communicate clearly', 'Need to build credibility with potential clients', 'Need for a scalable foundation as the company grew'],
    },
    role: {
      p1: 'I worked on the **strategy, structure, visual direction, and implementation** of the website.',
      p2: 'My focus was to create an experience that balanced business goals with user needs — **making technical information easier to understand** while supporting the company’s growth.',
      contributionsTitle: 'Contributions',
      contributions: ['Information architecture', 'Content organization', 'Service hierarchy', 'UX decisions', 'Visual design', 'Responsive experience', 'Website implementation'],
      processTitle: 'Process',
      process: ['Research', 'Content & Structure', 'Design Direction', 'Development'],
    },
    decisions: {
      sub1Title: 'Turning technical expertise into clear communication',
      sub1p: 'Electrical engineering services often involve complex concepts. The website structure was designed to help potential clients **quickly understand what Powersis offers** and why they can trust the company.',
      sub2Title: 'Building credibility through digital presence',
      sub2p: 'The visual direction focused on creating a **professional and reliable experience** that matched the technical nature of the business. The design emphasized:',
      sub2List: ['Clear hierarchy', 'Organized information', 'Professional visual language', 'Easy navigation'],
      sub3Title: 'Designing for growth',
      sub3p: 'The website was created not only for the current business stage, but to **support future expansion**. The structure allows new services, information, and business opportunities to be added as Powersis continues to grow.',
    },
    outcome: {
      p1: 'The website became the **foundation of Powersis’ digital presence** and supported the company’s transition from an independent engineering service into a growing business.',
      p2: 'Since launching its digital presence, Powersis has **expanded its operations**, works with clients across Rio de Janeiro, and continues to grow with a broader team of professionals.',
      resultsTitle: 'Results',
      results: ['Stronger online presence', 'Improved business credibility', 'Clearer communication of services', 'SEO-oriented website foundation', 'Digital structure ready for expansion'],
      resultsHighlight: '4 locations across Rio de Janeiro and Paraná today',
      quote: 'From a solo engineering practice to a growing company serving clients throughout Rio de Janeiro.',
    },
  },

  es: {
    problem: {
      p1: 'Powersis nació como un servicio independiente de ingeniería eléctrica, con el objetivo de construir una **presencia de mercado más sólida** y atraer nuevos clientes.',
      p2: 'El desafío no era solo crear un sitio web, sino transformar un servicio técnico en una **experiencia digital clara, confiable y escalable**.',
      p3: 'La empresa necesitaba una plataforma capaz de comunicar soluciones de ingeniería complejas, **mejorar la visibilidad online** y crear una base más sólida para ser **encontrada a través de Google**.',
      challengesTitle: 'Desafíos',
      challenges: ['Sin una presencia digital estructurada', 'Visibilidad limitada en los buscadores', 'Servicios técnicos difíciles de comunicar con claridad', 'Necesidad de generar credibilidad con clientes potenciales', 'Necesidad de una base escalable a medida que la empresa crecía'],
    },
    role: {
      p1: 'Trabajé en la **estrategia, la estructura, la dirección visual y la implementación** del sitio web.',
      p2: 'Mi foco fue crear una experiencia que equilibrara los objetivos del negocio con las necesidades de los usuarios — **haciendo más comprensible la información técnica** mientras acompañaba el crecimiento de la empresa.',
      contributionsTitle: 'Contribuciones',
      contributions: ['Arquitectura de información', 'Organización de contenidos', 'Jerarquía de servicios', 'Decisiones UX', 'Diseño visual', 'Experiencia responsiva', 'Implementación del sitio'],
      processTitle: 'Proceso',
      process: ['Investigación', 'Contenido y estructura', 'Dirección de diseño', 'Desarrollo'],
    },
    decisions: {
      sub1Title: 'Convertir la experticia técnica en comunicación clara',
      sub1p: 'Los servicios de ingeniería eléctrica suelen implicar conceptos complejos. La estructura del sitio se diseñó para ayudar a los clientes potenciales a **entender rápidamente qué ofrece Powersis** y por qué pueden confiar en la empresa.',
      sub2Title: 'Construir credibilidad a través de la presencia digital',
      sub2p: 'La dirección visual se centró en crear una **experiencia profesional y confiable** acorde a la naturaleza técnica del negocio. El diseño priorizó:',
      sub2List: ['Jerarquía clara', 'Información organizada', 'Lenguaje visual profesional', 'Navegación sencilla'],
      sub3Title: 'Diseñar para el crecimiento',
      sub3p: 'El sitio se creó no solo para la etapa actual del negocio, sino para **acompañar su expansión futura**. La estructura permite sumar nuevos servicios, información y oportunidades a medida que Powersis sigue creciendo.',
    },
    outcome: {
      p1: 'El sitio se convirtió en la **base de la presencia digital de Powersis** y acompañó su transición de un servicio de ingeniería independiente a una empresa en crecimiento.',
      p2: 'Desde el lanzamiento de su presencia digital, Powersis **amplió sus operaciones**, trabaja con clientes en todo Río de Janeiro y sigue creciendo con un equipo más amplio de profesionales.',
      resultsTitle: 'Resultados',
      results: ['Mayor presencia online', 'Mayor credibilidad del negocio', 'Comunicación más clara de los servicios', 'Base web orientada al SEO', 'Estructura digital lista para expandirse'],
      resultsHighlight: 'Hoy, 4 sedes entre Río de Janeiro y Paraná',
      quote: 'De una práctica de ingeniería individual a una empresa en crecimiento que atiende clientes en todo Río de Janeiro.',
    },
  },

  pt: {
    problem: {
      p1: 'A Powersis começou como um serviço independente de engenharia elétrica, com o objetivo de construir uma **presença de mercado mais forte** e atrair novos clientes.',
      p2: 'O desafio não era apenas criar um site, mas transformar um serviço técnico em uma **experiência digital clara, confiável e escalável**.',
      p3: 'A empresa precisava de uma plataforma capaz de comunicar soluções de engenharia complexas, **melhorar a visibilidade online** e criar uma base mais sólida para ser **encontrada pelo Google**.',
      challengesTitle: 'Desafios',
      challenges: ['Sem uma presença digital estruturada', 'Visibilidade limitada nos buscadores', 'Serviços técnicos difíceis de comunicar com clareza', 'Necessidade de gerar credibilidade com clientes potenciais', 'Necessidade de uma base escalável conforme a empresa crescia'],
    },
    role: {
      p1: 'Trabalhei na **estratégia, na estrutura, na direção visual e na implementação** do site.',
      p2: 'Meu foco foi criar uma experiência que equilibrasse os objetivos do negócio com as necessidades dos usuários — **tornando a informação técnica mais fácil de entender** enquanto apoiava o crescimento da empresa.',
      contributionsTitle: 'Contribuições',
      contributions: ['Arquitetura de informação', 'Organização de conteúdo', 'Hierarquia de serviços', 'Decisões de UX', 'Design visual', 'Experiência responsiva', 'Implementação do site'],
      processTitle: 'Processo',
      process: ['Pesquisa', 'Conteúdo e estrutura', 'Direção de design', 'Desenvolvimento'],
    },
    decisions: {
      sub1Title: 'Transformar a expertise técnica em comunicação clara',
      sub1p: 'Serviços de engenharia elétrica costumam envolver conceitos complexos. A estrutura do site foi projetada para ajudar os clientes potenciais a **entender rapidamente o que a Powersis oferece** e por que podem confiar na empresa.',
      sub2Title: 'Construir credibilidade pela presença digital',
      sub2p: 'A direção visual focou em criar uma **experiência profissional e confiável**, à altura da natureza técnica do negócio. O design priorizou:',
      sub2List: ['Hierarquia clara', 'Informação organizada', 'Linguagem visual profissional', 'Navegação simples'],
      sub3Title: 'Projetar para o crescimento',
      sub3p: 'O site foi criado não apenas para o estágio atual do negócio, mas para **apoiar a expansão futura**. A estrutura permite adicionar novos serviços, informações e oportunidades conforme a Powersis continua crescendo.',
    },
    outcome: {
      p1: 'O site se tornou a **base da presença digital da Powersis** e apoiou a transição da empresa de um serviço de engenharia independente para um negócio em crescimento.',
      p2: 'Desde o lançamento de sua presença digital, a Powersis **ampliou suas operações**, atende clientes em todo o Rio de Janeiro e segue crescendo com uma equipe maior de profissionais.',
      resultsTitle: 'Resultados',
      results: ['Maior presença online', 'Maior credibilidade do negócio', 'Comunicação mais clara dos serviços', 'Base do site orientada a SEO', 'Estrutura digital pronta para expandir'],
      resultsHighlight: 'Hoje, 4 unidades entre Rio de Janeiro e Paraná',
      quote: 'De uma prática de engenharia individual a uma empresa em crescimento que atende clientes em todo o Rio de Janeiro.',
    },
  },
}

function build(s) {
  return {
    problem: (
      <div className="modal-content-text">
        <P text={s.problem.p1} />
        <P text={s.problem.p2} />
        <P text={s.problem.p3} />
        <h4 className="modal-list-title">{s.problem.challengesTitle}</h4>
        <ul className="modal-list">
          {s.problem.challenges.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    ),

    role: (
      <div className="modal-content-text">
        <P text={s.role.p1} />
        <P text={s.role.p2} />

        <div className="modal-two-col">
          <div>
            <h4 className="modal-list-title">{s.role.contributionsTitle}</h4>
            <ul className="modal-list">
              {s.role.contributions.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="modal-list-title">{s.role.processTitle}</h4>
            {Process(s.role.process)}
          </div>
        </div>

        {/* Responsive experience: the same site on desktop and on a phone, in one
            row at one height. --ar is each screen's width / height. */}
        <figure className="modal-media modal-media--devices">
          <div className="modal-media-slot" style={{ '--ar': 1600 / 911 }}><img src="/media/powersis-hero.jpg" loading="lazy" decoding="async" alt="Powersis — homepage hero: Engenharia Elétrica" /></div>
          <div className="modal-media-slot" style={{ '--ar': 9 / 16 }}><img src="/media/powersis-mobile-hero.jpg" loading="lazy" decoding="async" alt="Powersis on mobile — hero with the 24h emergency bar and the 'Solicitar orçamento' button" loading="lazy" /></div>
          <div className="modal-media-slot" style={{ '--ar': 9 / 16 }}><img src="/media/powersis-mobile-sobre.jpg" loading="lazy" decoding="async" alt="Powersis on mobile — '+12 years in the market', CREA registration, services and the WhatsApp contact button" loading="lazy" /></div>
        </figure>
      </div>
    ),

    decisions: (
      <div className="modal-content-text">
        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub1Title}</h4>
          <P text={s.decisions.sub1p} />
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/powersis-servicos.jpg" loading="lazy" decoding="async" alt="Powersis — 'Nossos Serviços' section with six service cards" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub2Title}</h4>
          <P text={s.decisions.sub2p} />
          <ul className="modal-list">
            {s.decisions.sub2List.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/powersis-sobre.jpg?v=2" loading="lazy" decoding="async" alt="Powersis — office, '+12 years in the market' and CREA registration" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub3Title}</h4>
          <P text={s.decisions.sub3p} />
        </div>
      </div>
    ),

    outcome: (
      <div className="modal-content-text">
        <P text={s.outcome.p1} />
        <P text={s.outcome.p2} />

        {/* The whole homepage in one scrollable window (optimized capture of the
            live site): hero → credentials → services → quote form → clients →
            the four locations in the footer. */}
        <div className="browser-frame">
          <div className="browser-frame-bar">
            <div className="browser-frame-dots"><span /><span /><span /></div>
            <span className="browser-frame-url">powersis.com.br</span>
            <a className="browser-frame-live" href="https://www.powersis.com.br/" target="_blank" rel="noopener noreferrer">Live ↗</a>
          </div>
          <div className="browser-frame-viewport" tabIndex={0} role="region" aria-label="Powersis — full homepage, scrollable">
            <img
              src="/media/powersis-fullpage.jpg"
              alt="Powersis — full homepage: hero, credentials, six services, quote request form, client logos and footer with four locations"
              width="1600"
              height="4433"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <h4 className="modal-list-title">{s.outcome.resultsTitle}</h4>
        {Results(s.outcome.results, s.outcome.resultsHighlight)}

        <blockquote className="modal-quote">
          {s.outcome.quote}
        </blockquote>
      </div>
    ),
  }
}

export default { en: build(STR.en), es: build(STR.es), pt: build(STR.pt) }
