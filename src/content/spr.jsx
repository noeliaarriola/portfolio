// content/spr.jsx — SPR Capital case study, EN / ES / PT.
import { P, Process, Results } from './rich.jsx'

const STR = {
  en: {
    problem: {
      p1: 'SPR Capital is a financial startup focused on **helping companies access capital and connect with investment opportunities**.',
      p2: "This was a **group project** where I led the UX process. Because financial services often involve complex processes, uncertainty, and unfamiliar terminology, the main challenge was creating a digital experience that could **build trust, explain the platform's value, and guide users through the journey**.",
      p3: 'The goal was not only to design a website, but to **understand the needs of the people involved** and translate those insights into a clearer, more accessible product experience.',
      marketTitle: 'Starting with the market',
      marketp: 'Before designing anything, I ran a **competitive audit** of financial platforms — value propositions, target audiences, strengths, weaknesses, and even their tech stacks — to find where SPR could stand out.',
      challengesTitle: 'Challenges',
      challenges: ['Communicating a complex financial service in a simple way', 'Building trust for an early-stage startup', 'Helping users understand the process and next steps', 'Designing for different audiences with different motivations', 'Creating a scalable digital foundation for future growth'],
    },
    role: {
      p1: 'I worked through the UX process from research and problem definition to the final interface design.',
      p2: 'The project started by understanding the ecosystem around the product, identifying user needs, frustrations, and opportunities before defining the solution. My approach focused on connecting business goals with user expectations and creating a structure that could support both the company and its users.',
      usersTitle: 'Understanding the users',
      usersp: 'I created **two user personas** to represent the main stakeholders involved in the platform, each with their own goals, user stories, and journey.',
      goalsLabel: 'Goals',
      painLabel: 'Pain points',
      personas: [
        { name: 'Pedro', role: 'Entrepreneur seeking investment', goals: ['Find reliable support to raise capital', 'Understand the investment process', 'Connect with the right opportunities'], pain: ['Lack of clarity about where to start', 'Fear of making mistakes', 'Complex financial terms and processes'] },
        { name: 'Eduardo', role: 'Partner / Referral professional', goals: ['Recommend companies confidently', 'Have visibility throughout the process'], pain: ['Informal communication channels', 'Lack of transparency and feedback'] },
      ],
      defineTitle: 'Defining the problem',
      definep: "I mapped each persona's **pain points**, turned them into **problem statements** — Pedro, a mid-size entrepreneur, and Eduardo, a partner lawyer — and defined a **value proposition** for each.",
      methodsTitle: 'Methods used',
      methods: ['User personas', 'User journey mapping', 'Competitive analysis', 'Brainstorming sessions', 'Information architecture', 'UX strategy'],
    },
    decisions: {
      sub1Title: 'Turning complexity into clarity',
      sub1p: 'The financial space can feel overwhelming for users unfamiliar with investment processes. The experience was designed to simplify the journey by organizing information around user needs:',
      sub1Process: ['What is the service?', 'How does it work?', 'Why does it matter?', 'What is the next step?'],
      sub2Title: 'Information Architecture',
      sub2p: 'I structured the whole site to guide **each user type to the right section** and a specific conversion point — separate paths for entrepreneurs and partners.',
      sub3Title: 'User Flow',
      sub3p: 'Two distinct paths were designed based on user type, **each ending at a specific contact form** to reduce friction and increase conversion intent.',
      sub4Title: 'Designing for trust',
      sub4p: 'For financial products, **credibility is essential**. The interface was designed to communicate professionalism and confidence through:',
      sub4List: ['Clear content hierarchy', 'Structured sections', 'Direct messaging', 'Consistent visual language', 'Frictionless navigation'],
      sub5Title: 'Creating a foundation for growth',
      sub5p: 'As an early-stage startup, SPR Capital needed a digital experience that could evolve. The solution was designed with scalability in mind, allowing new services, information, and future product iterations to be added over time.',
    },
    outcome: {
      p1: "The project transformed SPR Capital's idea into a **structured digital experience focused on clarity, trust, and user understanding**.",
      p2: "By combining **research, strategy, and interface design**, it created a stronger foundation for communicating the startup's value proposition — grounded in real user needs, not assumptions.",
      resultsTitle: 'Results',
      results: ['User needs translated into product decisions', "Clearer communication of the platform's purpose", 'Improved understanding of the user journey', 'Stronger trust-building experience', 'Responsive and scalable digital solution'],
      resultsHighlight: 'Two tailored paths: entrepreneurs and partners',
      quote: 'A full UX process — from competitive research to a scalable, trust-first solution.',
    },
  },

  es: {
    problem: {
      p1: 'SPR Capital es una startup financiera enfocada en **ayudar a las empresas a acceder a capital y conectarse con oportunidades de inversión**.',
      p2: 'Fue un **proyecto grupal** en el que lideré el proceso de UX. Como los servicios financieros suelen implicar procesos complejos, incertidumbre y terminología poco familiar, el principal desafío era crear una experiencia digital que pudiera **generar confianza, explicar el valor de la plataforma y guiar a los usuarios a lo largo del recorrido**.',
      p3: 'El objetivo no era solo diseñar un sitio web, sino **entender las necesidades de las personas involucradas** y traducir esos aprendizajes en una experiencia de producto más clara y accesible.',
      marketTitle: 'Empezar por el mercado',
      marketp: 'Antes de diseñar nada, realicé una **auditoría competitiva** de plataformas financieras — propuestas de valor, públicos objetivo, fortalezas, debilidades e incluso sus stacks técnicos — para encontrar dónde SPR podía destacarse.',
      challengesTitle: 'Desafíos',
      challenges: ['Comunicar un servicio financiero complejo de forma simple', 'Generar confianza para una startup en etapa temprana', 'Ayudar a los usuarios a entender el proceso y los próximos pasos', 'Diseñar para distintos públicos con distintas motivaciones', 'Crear una base digital escalable para el crecimiento futuro'],
    },
    role: {
      p1: 'Recorrí el proceso de UX desde la investigación y la definición del problema hasta el diseño final de la interfaz.',
      p2: 'El proyecto comenzó por entender el ecosistema alrededor del producto, identificando necesidades, frustraciones y oportunidades de los usuarios antes de definir la solución. Mi enfoque se centró en conectar los objetivos del negocio con las expectativas de los usuarios y en crear una estructura que pudiera sostener tanto a la empresa como a sus usuarios.',
      usersTitle: 'Entender a los usuarios',
      usersp: 'Creé **dos user personas** para representar a los principales actores de la plataforma, cada uno con sus propios objetivos, user stories y recorrido.',
      goalsLabel: 'Objetivos',
      painLabel: 'Pain points',
      personas: [
        { name: 'Pedro', role: 'Emprendedor que busca inversión', goals: ['Encontrar apoyo confiable para captar capital', 'Entender el proceso de inversión', 'Conectarse con las oportunidades adecuadas'], pain: ['Falta de claridad sobre por dónde empezar', 'Miedo a cometer errores', 'Términos y procesos financieros complejos'] },
        { name: 'Eduardo', role: 'Socio / Profesional que refiere', goals: ['Recomendar empresas con confianza', 'Tener visibilidad durante todo el proceso'], pain: ['Canales de comunicación informales', 'Falta de transparencia y feedback'] },
      ],
      defineTitle: 'Definir el problema',
      definep: 'Mapeé los **pain points** de cada persona, los convertí en **problem statements** — Pedro, un emprendedor de porte medio, y Eduardo, un abogado socio — y definí una **propuesta de valor** para cada uno.',
      methodsTitle: 'Métodos utilizados',
      methods: ['User personas', 'User journey mapping', 'Análisis competitivo', 'Sesiones de brainstorming', 'Arquitectura de información', 'Estrategia UX'],
    },
    decisions: {
      sub1Title: 'Convertir la complejidad en claridad',
      sub1p: 'El mundo financiero puede resultar abrumador para usuarios no familiarizados con los procesos de inversión. La experiencia se diseñó para simplificar el recorrido, organizando la información en torno a las necesidades del usuario:',
      sub1Process: ['¿Qué es el servicio?', '¿Cómo funciona?', '¿Por qué importa?', '¿Cuál es el próximo paso?'],
      sub2Title: 'Arquitectura de información',
      sub2p: 'Estructuré todo el sitio para guiar a **cada tipo de usuario a la sección correcta** y a un punto de conversión específico — caminos separados para emprendedores y socios.',
      sub3Title: 'User Flow',
      sub3p: 'Se diseñaron dos caminos distintos según el tipo de usuario, **cada uno terminando en un formulario de contacto específico** para reducir la fricción y aumentar la intención de conversión.',
      sub4Title: 'Diseñar para la confianza',
      sub4p: 'En los productos financieros, **la credibilidad es esencial**. La interfaz se diseñó para comunicar profesionalismo y seguridad a través de:',
      sub4List: ['Jerarquía de contenido clara', 'Secciones estructuradas', 'Mensajes directos', 'Lenguaje visual consistente', 'Navegación sin fricción'],
      sub5Title: 'Crear una base para el crecimiento',
      sub5p: 'Al ser una startup en etapa temprana, SPR Capital necesitaba una experiencia digital que pudiera evolucionar. La solución se diseñó pensando en la escalabilidad, permitiendo agregar nuevos servicios, información e iteraciones futuras del producto con el tiempo.',
    },
    outcome: {
      p1: 'El proyecto transformó la idea de SPR Capital en una **experiencia digital estructurada, centrada en la claridad, la confianza y la comprensión del usuario**.',
      p2: 'Al combinar **investigación, estrategia y diseño de interfaz**, se creó una base más sólida para comunicar la propuesta de valor de la startup — fundamentada en necesidades reales de los usuarios, no en suposiciones.',
      resultsTitle: 'Resultados',
      results: ['Necesidades de los usuarios traducidas en decisiones de producto', 'Comunicación más clara del propósito de la plataforma', 'Mejor comprensión del recorrido del usuario', 'Experiencia más orientada a generar confianza', 'Solución digital responsiva y escalable'],
      resultsHighlight: 'Dos caminos a medida: emprendedores y socios',
      quote: 'Un proceso de UX completo — desde la investigación competitiva hasta una solución escalable y centrada en la confianza.',
    },
  },

  pt: {
    problem: {
      p1: 'A SPR Capital é uma startup financeira focada em **ajudar empresas a acessar capital e se conectar com oportunidades de investimento**.',
      p2: 'Foi um **projeto em grupo** no qual liderei o processo de UX. Como os serviços financeiros costumam envolver processos complexos, incerteza e terminologia pouco familiar, o principal desafio era criar uma experiência digital capaz de **gerar confiança, explicar o valor da plataforma e guiar os usuários ao longo da jornada**.',
      p3: 'O objetivo não era apenas projetar um site, mas **entender as necessidades das pessoas envolvidas** e traduzir esses aprendizados em uma experiência de produto mais clara e acessível.',
      marketTitle: 'Começar pelo mercado',
      marketp: 'Antes de projetar qualquer coisa, realizei uma **auditoria competitiva** de plataformas financeiras — propostas de valor, públicos-alvo, pontos fortes, pontos fracos e até seus stacks técnicos — para descobrir onde a SPR poderia se destacar.',
      challengesTitle: 'Desafios',
      challenges: ['Comunicar um serviço financeiro complexo de forma simples', 'Gerar confiança para uma startup em estágio inicial', 'Ajudar os usuários a entender o processo e os próximos passos', 'Projetar para públicos diferentes com motivações diferentes', 'Criar uma base digital escalável para o crescimento futuro'],
    },
    role: {
      p1: 'Percorri o processo de UX desde a pesquisa e a definição do problema até o design final da interface.',
      p2: 'O projeto começou por entender o ecossistema em torno do produto, identificando necessidades, frustrações e oportunidades dos usuários antes de definir a solução. Minha abordagem focou em conectar os objetivos do negócio com as expectativas dos usuários e em criar uma estrutura capaz de sustentar tanto a empresa quanto seus usuários.',
      usersTitle: 'Entender os usuários',
      usersp: 'Criei **duas user personas** para representar os principais envolvidos na plataforma, cada uma com seus próprios objetivos, user stories e jornada.',
      goalsLabel: 'Objetivos',
      painLabel: 'Dores',
      personas: [
        { name: 'Pedro', role: 'Empreendedor em busca de investimento', goals: ['Encontrar apoio confiável para captar capital', 'Entender o processo de investimento', 'Conectar-se com as oportunidades certas'], pain: ['Falta de clareza sobre por onde começar', 'Medo de cometer erros', 'Termos e processos financeiros complexos'] },
        { name: 'Eduardo', role: 'Sócio / Profissional que indica', goals: ['Recomendar empresas com confiança', 'Ter visibilidade ao longo de todo o processo'], pain: ['Canais de comunicação informais', 'Falta de transparência e feedback'] },
      ],
      defineTitle: 'Definir o problema',
      definep: 'Mapeei as **dores** de cada persona, transformei-as em **problem statements** — Pedro, um empreendedor de médio porte, e Eduardo, um advogado sócio — e defini uma **proposta de valor** para cada um.',
      methodsTitle: 'Métodos utilizados',
      methods: ['User personas', 'User journey mapping', 'Análise competitiva', 'Sessões de brainstorming', 'Arquitetura de informação', 'Estratégia de UX'],
    },
    decisions: {
      sub1Title: 'Transformar a complexidade em clareza',
      sub1p: 'O universo financeiro pode ser intimidante para usuários não familiarizados com processos de investimento. A experiência foi projetada para simplificar a jornada, organizando a informação em torno das necessidades do usuário:',
      sub1Process: ['O que é o serviço?', 'Como funciona?', 'Por que importa?', 'Qual é o próximo passo?'],
      sub2Title: 'Arquitetura de informação',
      sub2p: 'Estruturei todo o site para guiar **cada tipo de usuário à seção certa** e a um ponto de conversão específico — caminhos separados para empreendedores e parceiros.',
      sub3Title: 'User Flow',
      sub3p: 'Foram projetados dois caminhos distintos conforme o tipo de usuário, **cada um terminando em um formulário de contato específico** para reduzir a fricção e aumentar a intenção de conversão.',
      sub4Title: 'Projetar para a confiança',
      sub4p: 'Em produtos financeiros, **a credibilidade é essencial**. A interface foi projetada para comunicar profissionalismo e segurança por meio de:',
      sub4List: ['Hierarquia de conteúdo clara', 'Seções estruturadas', 'Mensagens diretas', 'Linguagem visual consistente', 'Navegação sem fricção'],
      sub5Title: 'Criar uma base para o crescimento',
      sub5p: 'Por ser uma startup em estágio inicial, a SPR Capital precisava de uma experiência digital capaz de evoluir. A solução foi projetada pensando na escalabilidade, permitindo adicionar novos serviços, informações e iterações futuras do produto ao longo do tempo.',
    },
    outcome: {
      p1: 'O projeto transformou a ideia da SPR Capital em uma **experiência digital estruturada, focada em clareza, confiança e compreensão do usuário**.',
      p2: 'Ao combinar **pesquisa, estratégia e design de interface**, criou-se uma base mais sólida para comunicar a proposta de valor da startup — fundamentada em necessidades reais dos usuários, não em suposições.',
      resultsTitle: 'Resultados',
      results: ['Necessidades dos usuários traduzidas em decisões de produto', 'Comunicação mais clara do propósito da plataforma', 'Melhor compreensão da jornada do usuário', 'Experiência mais voltada a gerar confiança', 'Solução digital responsiva e escalável'],
      resultsHighlight: 'Dois caminhos sob medida: empreendedores e parceiros',
      quote: 'Um processo de UX completo — da pesquisa competitiva a uma solução escalável e centrada na confiança.',
    },
  },
}

function Persona(p, goalsLabel, painLabel) {
  return (
    <div className="modal-persona">
      <div className="modal-persona-header">
        <span className="modal-persona-name">{p.name}</span>
        <span className="modal-persona-role">{p.role}</span>
      </div>
      <div className="modal-persona-content">
        <div>
          <h4 className="modal-list-title">{goalsLabel}</h4>
          <ul className="modal-list">
            {p.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="modal-list-title">{painLabel}</h4>
          <ul className="modal-list">
            {p.pain.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function build(s) {
  return {
    problem: (
      <div className="modal-content-text">
        <P text={s.problem.p1} />
        <P text={s.problem.p2} />
        <P text={s.problem.p3} />

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.problem.marketTitle}</h4>
          <P text={s.problem.marketp} />
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/spr-audit.jpg" alt="SPR Capital — competitive audit comparing Bloxs, BrBatel, Captal and B8 Partners across value proposition, audience, strengths and tech stack" /></div>
        </figure>

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

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.role.usersTitle}</h4>
          <P text={s.role.usersp} />
          <div className="modal-personas">
            {s.role.personas.map((p, i) => <div key={i}>{Persona(p, s.role.goalsLabel, s.role.painLabel)}</div>)}
          </div>
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/spr-personas.jpg" alt="SPR Capital — the two personas with profiles, motivations, needs, user stories and end-to-end journey maps" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.role.defineTitle}</h4>
          <P text={s.role.definep} />
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/spr-define.jpg" alt="SPR Capital — pain points, problem statements for Pedro and Eduardo, and value propositions" /></div>
        </figure>

        <h4 className="modal-list-title">{s.role.methodsTitle}</h4>
        <ul className="modal-list">
          {s.role.methods.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    ),

    decisions: (
      <div className="modal-content-text">
        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub1Title}</h4>
          <P text={s.decisions.sub1p} />
          {Process(s.decisions.sub1Process, { margin: '12px 0 0' })}
        </div>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub2Title}</h4>
          <P text={s.decisions.sub2p} />
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/spr-ia.jpg" alt="SPR Capital — information architecture: Home branching to Quem Somos, Soluções and Contato, then Empresários and Parceiros with specific contact forms" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub3Title}</h4>
          <P text={s.decisions.sub3p} />
        </div>

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot"><img src="/media/spr-userflow.jpg" alt="SPR Capital — user flow from Home through navigation to the Empresários or Parceiros landing pages and confirmation" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub4Title}</h4>
          <P text={s.decisions.sub4p} />
          <ul className="modal-list">
            {s.decisions.sub4List.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub5Title}</h4>
          <P text={s.decisions.sub5p} />
        </div>
      </div>
    ),

    outcome: (
      <div className="modal-content-text">
        <P text={s.outcome.p1} />
        <P text={s.outcome.p2} />

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
