// content/appbit.jsx — AppBiT — B2G case study, EN / ES / PT.
import { P, Process } from './rich.jsx'

const STR = {
  en: {
    problem: {
      p1: "App BiT was a 5-week hackathon by Wongola / Black in Tech, run across **Brazil and Angola** — which is why the product and all of its materials are in Portuguese. Our team took on the B2G challenge: **public managers don't have easy access to cross-referenced data** on urban mobility, employment, and mental health by region to base social-inclusion policies on real evidence.",
      p2: 'Our solution was a responsive web app (PWA) with an **AI agent that answers questions in natural language**, powered by the Vísent CDRView dataset — real data on people concentration and network coverage by region.',
      challengesTitle: 'Challenges',
      challenges: ['Making dense geographic data readable for non-technical decision makers', 'Designing an AI conversation that feels clear and trustworthy', 'Delivering a complete product in 5 weeks with a team of 4', 'Keeping the experience consistent across desktop and mobile', 'Supporting three languages (Portuguese, English, Spanish)'],
    },
    role: {
      p1: 'I was the UX/UI designer in a team of four (frontend, mobile, and backend developers). **I designed the product end to end** — from the design system to every core screen: map, dashboard, reports, alerts, and the mobile AI chat.',
      p2: 'Before drawing a single screen, I mapped the **complete user flow** — visual exploration through the map, direct questions to the AI agent, and the export path to a citable PDF report.',
      p3: "Behind that flow is the primary persona — Carla, a municipal planning coordinator who doesn't write SQL — her pain points, jobs-to-be-done, and the design implication that shaped the whole product: **every interaction must be self-explanatory, in natural language**.",
      p4: "That flow became screens: here, the AI assistant journey — from Carla's first question in natural language to an **evidence-backed answer with citable sources**, in five steps.",
      p5: "I also contributed to the frontend code: **I built the Alerts page in React + TypeScript + Tailwind, working with Claude Code**, following the team's component conventions — and refined the map pin component so its colors mirror the coverage legend.",
      contributionsTitle: 'Contributions',
      contributions: ['User research, persona & user flow', 'Design system & design tokens', 'Interactive map & coverage legend', 'Dashboard & reports screens', 'Alerts experience (design + code)', 'Mobile AI chat design', 'Developer documentation', 'Frontend implementation', 'Demo Day pitch deck'],
      processTitle: 'Process',
      process: ['Understanding the brief', 'Design system', 'Screen design', 'Frontend implementation'],
    },
    decisions: {
      sub1Title: 'A map as the main surface',
      sub1p: 'The core question for public managers is always "where?". The map shows people concentration and network coverage by region, with a color-coded legend — and every pin on the map uses the same color tones as the legend, so the data can be read at a glance.',
      sub2Title: 'Dashboards for evidence-based decisions',
      sub2p: 'Beyond the map, managers need to compare indicators and export findings. The dashboard and reports screens organize the data into clear, comparable views that support policy decisions.',
      sub3Title: 'A conversational AI for non-technical users',
      sub3p: 'Not every manager knows how to query data. The mobile chat lets them ask questions in natural language — "Where are training programs missing for low-income youth?" — and get answers grounded in the dataset.',
      sub4Title: 'A design system built for team speed',
      sub4p: 'With four people and five weeks, consistency couldn\'t depend on reviews. The design system defined tokens for color, typography, and components — no hardcoded values — so design and code stayed aligned as the team moved fast.',
      sub5Title: 'Every flow designed screen by screen',
      sub5p: 'Before implementation, each mobile flow was fully mapped in Figma — **every screen, every state, every transition**. Here, the onboarding flow: splash and institutional login, the first thing a public manager sees.',
    },
    outcome: {
      p1: 'We delivered a **working MVP presented at the hackathon Demo Day** in July 2026: an AI-powered data platform with an interactive map, dashboard, reports, alerts, and a mobile chat experience.',
      p2: 'For me, this project was also a milestone — **my first time designing a product and implementing part of it in production code**, working inside a real cross-functional team. I also designed the pitch deck we presented at Demo Day.',
      resultsTitle: 'Results',
      results: ['Complete design system with reusable tokens and components', 'Interactive map with color-coded coverage legend', 'Alerts page designed and implemented in React + TypeScript', 'Interface localized in Portuguese, English, and Spanish', 'MVP delivered on time by a cross-functional team of four'],
      quote: 'From Figma to production code: designing and building the same product.',
      ctaText: 'Try the interactive Figma prototype ↗',
    },
  },

  es: {
    problem: {
      p1: 'App BiT fue un hackathon de 5 semanas de Wongola / Black in Tech, realizado entre **Brasil y Angola** — por eso el producto y todos sus materiales están en portugués. Nuestro equipo tomó el desafío B2G: **los gestores públicos no tienen acceso fácil a datos cruzados** sobre movilidad urbana, empleo y salud mental por región para basar políticas de inclusión social en evidencia real.',
      p2: 'Nuestra solución fue una aplicación web responsiva (PWA) con un **agente de IA que responde preguntas en lenguaje natural**, impulsado por el dataset Vísent CDRView — datos reales sobre concentración de personas y cobertura de red por región.',
      challengesTitle: 'Desafíos',
      challenges: ['Hacer legibles datos geográficos densos para tomadores de decisión no técnicos', 'Diseñar una conversación con IA que transmita claridad y confianza', 'Entregar un producto completo en 5 semanas con un equipo de 4', 'Mantener la experiencia consistente entre desktop y mobile', 'Dar soporte a tres idiomas (portugués, inglés, español)'],
    },
    role: {
      p1: 'Fui la diseñadora UX/UI en un equipo de cuatro (desarrolladores frontend, mobile y backend). **Diseñé el producto de punta a punta** — desde el design system hasta cada pantalla clave: mapa, dashboard, reportes, alertas y el chat de IA mobile.',
      p2: 'Antes de dibujar una sola pantalla, mapeé el **user flow completo** — la exploración visual a través del mapa, las preguntas directas al agente de IA y el camino de exportación a un reporte PDF citable.',
      p3: 'Detrás de ese flujo está la persona principal — Carla, coordinadora de planificación municipal que no escribe SQL — sus pain points, jobs-to-be-done y la implicación de diseño que dio forma a todo el producto: **cada interacción debe ser autoexplicativa, en lenguaje natural**.',
      p4: 'Ese flujo se convirtió en pantallas: aquí, el recorrido del asistente de IA — desde la primera pregunta de Carla en lenguaje natural hasta una **respuesta respaldada por evidencia con fuentes citables**, en cinco pasos.',
      p5: 'También contribuí al código frontend: **construí la página de Alertas en React + TypeScript + Tailwind, trabajando con Claude Code**, siguiendo las convenciones de componentes del equipo — y refiné el componente del pin del mapa para que sus colores reflejen la leyenda de cobertura.',
      contributionsTitle: 'Contribuciones',
      contributions: ['Investigación de usuarios, persona y user flow', 'Design system y design tokens', 'Mapa interactivo y leyenda de cobertura', 'Pantallas de dashboard y reportes', 'Experiencia de alertas (diseño + código)', 'Diseño del chat de IA mobile', 'Documentación para desarrolladores', 'Implementación frontend', 'Pitch deck del Demo Day'],
      processTitle: 'Proceso',
      process: ['Entender el brief', 'Design system', 'Diseño de pantallas', 'Implementación frontend'],
    },
    decisions: {
      sub1Title: 'El mapa como superficie principal',
      sub1p: 'La pregunta central de los gestores públicos siempre es «¿dónde?». El mapa muestra la concentración de personas y la cobertura de red por región, con una leyenda por colores — y cada pin del mapa usa los mismos tonos que la leyenda, para que los datos se lean de un vistazo.',
      sub2Title: 'Dashboards para decisiones basadas en evidencia',
      sub2p: 'Más allá del mapa, los gestores necesitan comparar indicadores y exportar hallazgos. Las pantallas de dashboard y reportes organizan los datos en vistas claras y comparables que respaldan las decisiones de política pública.',
      sub3Title: 'Una IA conversacional para usuarios no técnicos',
      sub3p: 'No todos los gestores saben consultar datos. El chat mobile les permite hacer preguntas en lenguaje natural — «¿Dónde faltan programas de formación para jóvenes de bajos ingresos?» — y obtener respuestas fundamentadas en el dataset.',
      sub4Title: 'Un design system pensado para la velocidad del equipo',
      sub4p: 'Con cuatro personas y cinco semanas, la consistencia no podía depender de revisiones. El design system definió tokens de color, tipografía y componentes — sin valores fijos en el código — para que diseño y código se mantuvieran alineados mientras el equipo avanzaba rápido.',
      sub5Title: 'Cada flujo diseñado pantalla por pantalla',
      sub5p: 'Antes de la implementación, cada flujo mobile se mapeó por completo en Figma — **cada pantalla, cada estado, cada transición**. Aquí, el flujo de onboarding: splash y login institucional, lo primero que ve un gestor público.',
    },
    outcome: {
      p1: 'Entregamos un **MVP funcional presentado en el Demo Day del hackathon** en julio de 2026: una plataforma de datos con IA, con mapa interactivo, dashboard, reportes, alertas y una experiencia de chat mobile.',
      p2: 'Para mí, este proyecto también fue un hito — **mi primera vez diseñando un producto e implementando parte de él en código de producción**, trabajando dentro de un equipo real y multidisciplinario. También diseñé el pitch deck que presentamos en el Demo Day.',
      resultsTitle: 'Resultados',
      results: ['Design system completo con tokens y componentes reutilizables', 'Mapa interactivo con leyenda de cobertura por colores', 'Página de Alertas diseñada e implementada en React + TypeScript', 'Interfaz localizada en portugués, inglés y español', 'MVP entregado a tiempo por un equipo multidisciplinario de cuatro'],
      quote: 'De Figma al código de producción: diseñar y construir el mismo producto.',
      ctaText: 'Ver el prototipo interactivo en Figma ↗',
    },
  },

  pt: {
    problem: {
      p1: 'O App BiT foi um hackathon de 5 semanas da Wongola / Black in Tech, realizado entre **Brasil e Angola** — por isso o produto e todos os seus materiais estão em português. Nossa equipe assumiu o desafio B2G: **os gestores públicos não têm acesso fácil a dados cruzados** sobre mobilidade urbana, emprego e saúde mental por região para embasar políticas de inclusão social em evidências reais.',
      p2: 'Nossa solução foi um web app responsivo (PWA) com um **agente de IA que responde perguntas em linguagem natural**, alimentado pelo dataset Vísent CDRView — dados reais sobre concentração de pessoas e cobertura de rede por região.',
      challengesTitle: 'Desafios',
      challenges: ['Tornar dados geográficos densos legíveis para tomadores de decisão não técnicos', 'Projetar uma conversa com IA que transmita clareza e confiança', 'Entregar um produto completo em 5 semanas com uma equipe de 4', 'Manter a experiência consistente entre desktop e mobile', 'Dar suporte a três idiomas (português, inglês, espanhol)'],
    },
    role: {
      p1: 'Fui a designer de UX/UI em uma equipe de quatro (desenvolvedores frontend, mobile e backend). **Projetei o produto de ponta a ponta** — do design system a cada tela principal: mapa, dashboard, relatórios, alertas e o chat de IA mobile.',
      p2: 'Antes de desenhar uma única tela, mapeei o **fluxo de usuário completo** — a exploração visual pelo mapa, as perguntas diretas ao agente de IA e o caminho de exportação para um relatório PDF citável.',
      p3: 'Por trás desse fluxo está a persona principal — Carla, coordenadora de planejamento municipal que não escreve SQL — suas dores, jobs-to-be-done e a implicação de design que moldou todo o produto: **cada interação deve ser autoexplicativa, em linguagem natural**.',
      p4: 'Esse fluxo virou telas: aqui, a jornada do assistente de IA — da primeira pergunta de Carla em linguagem natural a uma **resposta embasada em evidências com fontes citáveis**, em cinco passos.',
      p5: 'Também contribuí com o código frontend: **construí a página de Alertas em React + TypeScript + Tailwind, trabalhando com Claude Code**, seguindo as convenções de componentes da equipe — e refinei o componente do pin do mapa para que suas cores refletissem a legenda de cobertura.',
      contributionsTitle: 'Contribuições',
      contributions: ['Pesquisa de usuários, persona e fluxo de usuário', 'Design system e design tokens', 'Mapa interativo e legenda de cobertura', 'Telas de dashboard e relatórios', 'Experiência de alertas (design + código)', 'Design do chat de IA mobile', 'Documentação para desenvolvedores', 'Implementação frontend', 'Pitch deck do Demo Day'],
      processTitle: 'Processo',
      process: ['Entender o brief', 'Design system', 'Design das telas', 'Implementação frontend'],
    },
    decisions: {
      sub1Title: 'O mapa como superfície principal',
      sub1p: 'A pergunta central dos gestores públicos é sempre «onde?». O mapa mostra a concentração de pessoas e a cobertura de rede por região, com uma legenda por cores — e cada pin no mapa usa os mesmos tons da legenda, para que os dados sejam lidos num relance.',
      sub2Title: 'Dashboards para decisões baseadas em evidências',
      sub2p: 'Além do mapa, os gestores precisam comparar indicadores e exportar achados. As telas de dashboard e relatórios organizam os dados em visões claras e comparáveis que apoiam as decisões de política pública.',
      sub3Title: 'Uma IA conversacional para usuários não técnicos',
      sub3p: 'Nem todo gestor sabe consultar dados. O chat mobile permite fazer perguntas em linguagem natural — «Onde faltam programas de formação para jovens de baixa renda?» — e obter respostas fundamentadas no dataset.',
      sub4Title: 'Um design system pensado para a velocidade da equipe',
      sub4p: 'Com quatro pessoas e cinco semanas, a consistência não podia depender de revisões. O design system definiu tokens de cor, tipografia e componentes — sem valores fixos no código — para que design e código permanecessem alinhados enquanto a equipe avançava rápido.',
      sub5Title: 'Cada fluxo projetado tela por tela',
      sub5p: 'Antes da implementação, cada fluxo mobile foi totalmente mapeado no Figma — **cada tela, cada estado, cada transição**. Aqui, o fluxo de onboarding: splash e login institucional, a primeira coisa que um gestor público vê.',
    },
    outcome: {
      p1: 'Entregamos um **MVP funcional apresentado no Demo Day do hackathon** em julho de 2026: uma plataforma de dados com IA, com mapa interativo, dashboard, relatórios, alertas e uma experiência de chat mobile.',
      p2: 'Para mim, este projeto também foi um marco — **minha primeira vez projetando um produto e implementando parte dele em código de produção**, trabalhando dentro de uma equipe real e multidisciplinar. Também desenhei o pitch deck que apresentamos no Demo Day.',
      resultsTitle: 'Resultados',
      results: ['Design system completo com tokens e componentes reutilizáveis', 'Mapa interativo com legenda de cobertura por cores', 'Página de Alertas projetada e implementada em React + TypeScript', 'Interface localizada em português, inglês e espanhol', 'MVP entregue no prazo por uma equipe multidisciplinar de quatro'],
      quote: 'Do Figma ao código de produção: projetar e construir o mesmo produto.',
      ctaText: 'Ver o protótipo interativo no Figma ↗',
    },
  },
}

function build(s) {
  return {
    problem: (
      <div className="modal-content-text">
        <P text={s.problem.p1} />
        <P text={s.problem.p2} />
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

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/appbit-userflow.jpg" loading="lazy" decoding="async" alt="AppBiT — complete user flow: map exploration, AI query loop and PDF export" /></div>
        </figure>

        <P text={s.role.p3} />

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/appbit-research.jpg" loading="lazy" decoding="async" alt="AppBiT — user persona Carla Mendes, usage scenario, pain points and jobs-to-be-done" /></div>
        </figure>

        <P text={s.role.p4} />

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/appbit-flow-assistente.jpg" loading="lazy" decoding="async" alt="AppBiT — AI assistant mobile flow: question, analysis, evidence-backed answer and follow-up" /></div>
        </figure>

        <P text={s.role.p5} />

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

        <figure className="modal-media">
          <div className="modal-media-slot"><img src="/media/appbit-pitch-solucao.png" loading="lazy" decoding="async" alt="Demo Day pitch — the solution: from question to grounded decision" /></div>
        </figure>
      </div>
    ),

    decisions: (
      <div className="modal-content-text">
        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub1Title}</h4>
          <P text={s.decisions.sub1p} />
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
          <h4 className="modal-subsection-title">{s.decisions.sub2Title}</h4>
          <P text={s.decisions.sub2p} />
        </div>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub3Title}</h4>
          <P text={s.decisions.sub3p} />
        </div>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub4Title}</h4>
          <P text={s.decisions.sub4p} />
        </div>

        <figure className="modal-media modal-media--doc">
          <div className="modal-media-slot"><img src="/media/appbit-design-system.jpg" loading="lazy" decoding="async" alt="AppBiT design system — colors, typography and components" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub5Title}</h4>
          <P text={s.decisions.sub5p} />
        </div>

        <figure className="modal-media modal-media--doc">
          <div className="modal-media-slot"><img src="/media/appbit-flow-onboarding.png" loading="lazy" decoding="async" alt="AppBiT — mobile onboarding flow: splash and institutional login screens" /></div>
        </figure>
      </div>
    ),

    outcome: (
      <div className="modal-content-text">
        <P text={s.outcome.p1} />
        <P text={s.outcome.p2} />

        <figure className="modal-media">
          <div className="modal-media-slot"><img src="/media/appbit-pitch-conclusao.png" loading="lazy" decoding="async" alt="Demo Day pitch — closing slide: try the MVP now, with QR code to install" /></div>
        </figure>

        <h4 className="modal-list-title">{s.outcome.resultsTitle}</h4>
        <ul className="modal-list">
          {s.outcome.results.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <blockquote className="modal-quote">
          {s.outcome.quote}
        </blockquote>

        <a
          className="modal-cta"
          href="https://www.figma.com/proto/nohbwrvbhVZ1vfOtT3wWwJ/App-Bit---Hackathon?node-id=261-2243&t=rKF9yaL7LnnQjdwb-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {s.outcome.ctaText}
        </a>
      </div>
    ),
  }
}

export default { en: build(STR.en), es: build(STR.es), pt: build(STR.pt) }
