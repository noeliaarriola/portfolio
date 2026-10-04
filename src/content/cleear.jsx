// content/cleear.jsx — Cleear Cosmetics case study, EN / ES / PT.
// Structure is defined once in build(); only the strings differ per language.
import { P, Process } from './rich.jsx'
import JourneyDiagram from '../components/JourneyDiagram.jsx'

const STR = {
  en: {
    journey: {
      labels: { customer: 'Customer', brand: 'Brand', wait: 'wait', waits: 'waits', noWaits: 'no waits', steps: 'steps' },
      before: {
        tag: 'Before', name: 'Selling through messages',
        steps: ['Sees the product on Instagram', 'Asks by Instagram or WhatsApp', 'Replies', 'Orders from the WhatsApp catalog', 'Confirms and arranges shipping'],
      },
      after: {
        tag: 'After', name: 'Online store',
        steps: ['Discovers products', 'Compares options', 'Buys'],
      },
      foot: 'Reconstruction of the previous sales process.',
    },
    problem: {
      p1: "Cleear Cosmetics had an existing online presence, but it was **not fully supporting the brand's sales process**.",
      p2: "Customers still depended on **manual channels** to discover products and complete purchases, creating friction and limiting the brand's growth.",
      p3: "The goal was to create a **more structured e-commerce experience** while building a stronger and **more consistent digital identity**.",
      challengesTitle: 'Challenges',
      challenges: ['Existing website with limited functionality', 'Sales process dependent on direct communication', 'No centralized shopping experience', 'Inconsistent visual identity', 'Need for a scalable digital foundation'],
    },
    role: {
      p1: 'I worked on transforming the brand’s digital experience by combining **UX structure, visual strategy, and interface design**.',
      p2: 'The project required both defining a **clearer brand direction** and building a shopping experience that could **reduce the dependency on manual sales channels**.',
      contributionsTitle: 'Contributions',
      contributions: ['E-commerce structure', 'User flow organization', 'Product presentation', 'Brand direction', 'UI design', 'Responsive experience', 'Shopify store setup'],
      processTitle: 'Process',
      process: ['Brand analysis', 'Structure', 'Visual direction', 'UI design'],
    },
    decisions: {
      sub1Title: 'Building a consistent brand foundation',
      sub1p: 'The brand had different visual styles, colors, and typography choices across its materials. I created a **clearer visual direction** to bring **consistency across the entire experience**.',
      sub1ListTitle: 'Brand decisions',
      sub1List: ['Defined color palette', 'Typography system', 'Visual hierarchy', 'Image style direction'],
      sub2Title: 'Creating a reusable UI foundation',
      sub2p: 'To support consistency and future growth, I organized the interface around **reusable elements** that could scale as the brand expanded its catalog and channels.',
      sub2List: ['Buttons', 'Cards', 'Product sections', 'Navigation patterns', 'Layout structure'],
      sub3Title: 'Simplifying the shopping experience',
      sub3p: 'The e-commerce structure was designed to help users move naturally **from discovery to purchase without friction**.',
    },
    outcome: {
      p1: 'The project transformed an informal sales experience into a **more structured and professional digital storefront**.',
      p2: 'The final solution created a **stronger foundation** for Cleear Cosmetics to present products, improve customer experience, and **continue growing online**.',
      resultsTitle: 'Results',
      results: ['More organized shopping journey', 'Stronger brand consistency', 'Improved product presentation', 'Scalable UI foundation', 'Better foundation for future growth'],
    },
  },

  es: {
    journey: {
      labels: { customer: 'Cliente', brand: 'Marca', wait: 'espera', waits: 'esperas', noWaits: 'sin esperas', steps: 'pasos' },
      before: {
        tag: 'Antes', name: 'Venta por mensajes',
        steps: ['Ve el producto en Instagram', 'Consulta por Instagram o WhatsApp', 'Responde', 'Pide por el catálogo de WhatsApp', 'Confirma y coordina el envío'],
      },
      after: {
        tag: 'Después', name: 'Tienda online',
        steps: ['Descubre productos', 'Compara opciones', 'Compra'],
      },
      foot: 'Reconstrucción del proceso de venta anterior.',
    },
    problem: {
      p1: 'Cleear Cosmetics ya tenía presencia online, pero **no acompañaba del todo el proceso de ventas de la marca**.',
      p2: 'Los clientes seguían dependiendo de **canales manuales** para descubrir productos y completar compras, lo que generaba fricción y limitaba el crecimiento de la marca.',
      p3: 'El objetivo era crear una **experiencia de e-commerce más estructurada** y, a la vez, construir una **identidad digital más consistente**.',
      challengesTitle: 'Desafíos',
      challenges: ['Sitio existente con funcionalidad limitada', 'Proceso de ventas dependiente de la comunicación directa', 'Sin una experiencia de compra centralizada', 'Identidad visual inconsistente', 'Necesidad de una base digital escalable'],
    },
    role: {
      p1: 'Trabajé en transformar la experiencia digital de la marca combinando **estructura UX, estrategia visual y diseño de interfaz**.',
      p2: 'El proyecto requería tanto definir una **dirección de marca más clara** como construir una experiencia de compra que pudiera **reducir la dependencia de los canales de venta manuales**.',
      contributionsTitle: 'Contribuciones',
      contributions: ['Estructura de e-commerce', 'Organización del flujo de usuario', 'Presentación de productos', 'Dirección de marca', 'Diseño UI', 'Experiencia responsiva', 'Configuración de la tienda en Shopify'],
      processTitle: 'Proceso',
      process: ['Análisis de marca', 'Estructura', 'Dirección visual', 'Diseño UI'],
    },
    decisions: {
      sub1Title: 'Construir una base de marca consistente',
      sub1p: 'La marca tenía distintos estilos visuales, colores y tipografías en sus materiales. Creé una **dirección visual más clara** para lograr **consistencia en toda la experiencia**.',
      sub1ListTitle: 'Decisiones de marca',
      sub1List: ['Paleta de colores definida', 'Sistema tipográfico', 'Jerarquía visual', 'Dirección de estilo de imágenes'],
      sub2Title: 'Crear una base de UI reutilizable',
      sub2p: 'Para sostener la consistencia y el crecimiento futuro, organicé la interfaz en torno a **elementos reutilizables** que pudieran escalar a medida que la marca ampliaba su catálogo y sus canales.',
      sub2List: ['Botones', 'Tarjetas', 'Secciones de producto', 'Patrones de navegación', 'Estructura de layout'],
      sub3Title: 'Simplificar la experiencia de compra',
      sub3p: 'La estructura de e-commerce se diseñó para que los usuarios avanzaran naturalmente **del descubrimiento a la compra sin fricción**.',
    },
    outcome: {
      p1: 'El proyecto transformó una experiencia de ventas informal en una **tienda digital más estructurada y profesional**.',
      p2: 'La solución final creó una **base más sólida** para que Cleear Cosmetics presente sus productos, mejore la experiencia del cliente y **siga creciendo online**.',
      resultsTitle: 'Resultados',
      results: ['Recorrido de compra más organizado', 'Mayor consistencia de marca', 'Mejor presentación de productos', 'Base de UI escalable', 'Mejor base para el crecimiento futuro'],
    },
  },

  pt: {
    journey: {
      labels: { customer: 'Cliente', brand: 'Marca', wait: 'espera', waits: 'esperas', noWaits: 'sem esperas', steps: 'passos' },
      before: {
        tag: 'Antes', name: 'Venda por mensagens',
        steps: ['Vê o produto no Instagram', 'Pergunta pelo Instagram ou WhatsApp', 'Responde', 'Pede pelo catálogo do WhatsApp', 'Confirma e combina o envio'],
      },
      after: {
        tag: 'Depois', name: 'Loja online',
        steps: ['Descobre produtos', 'Compara opções', 'Compra'],
      },
      foot: 'Reconstrução do processo de venda anterior.',
    },
    problem: {
      p1: 'A Cleear Cosmetics já tinha presença online, mas ela **não sustentava totalmente o processo de vendas da marca**.',
      p2: 'Os clientes ainda dependiam de **canais manuais** para descobrir produtos e concluir compras, o que gerava fricção e limitava o crescimento da marca.',
      p3: 'O objetivo era criar uma **experiência de e-commerce mais estruturada** e, ao mesmo tempo, construir uma **identidade digital mais consistente**.',
      challengesTitle: 'Desafios',
      challenges: ['Site existente com funcionalidade limitada', 'Processo de vendas dependente da comunicação direta', 'Sem uma experiência de compra centralizada', 'Identidade visual inconsistente', 'Necessidade de uma base digital escalável'],
    },
    role: {
      p1: 'Trabalhei na transformação da experiência digital da marca combinando **estrutura UX, estratégia visual e design de interface**.',
      p2: 'O projeto exigia tanto definir uma **direção de marca mais clara** quanto construir uma experiência de compra capaz de **reduzir a dependência dos canais de venda manuais**.',
      contributionsTitle: 'Contribuições',
      contributions: ['Estrutura de e-commerce', 'Organização do fluxo do usuário', 'Apresentação de produtos', 'Direção de marca', 'Design de UI', 'Experiência responsiva', 'Configuração da loja na Shopify'],
      processTitle: 'Processo',
      process: ['Análise da marca', 'Estrutura', 'Direção visual', 'Design de UI'],
    },
    decisions: {
      sub1Title: 'Construir uma base de marca consistente',
      sub1p: 'A marca tinha diferentes estilos visuais, cores e tipografias em seus materiais. Criei uma **direção visual mais clara** para trazer **consistência a toda a experiência**.',
      sub1ListTitle: 'Decisões de marca',
      sub1List: ['Paleta de cores definida', 'Sistema tipográfico', 'Hierarquia visual', 'Direção de estilo das imagens'],
      sub2Title: 'Criar uma base de UI reutilizável',
      sub2p: 'Para apoiar a consistência e o crescimento futuro, organizei a interface em torno de **elementos reutilizáveis** que pudessem escalar conforme a marca ampliava seu catálogo e seus canais.',
      sub2List: ['Botões', 'Cards', 'Seções de produto', 'Padrões de navegação', 'Estrutura de layout'],
      sub3Title: 'Simplificar a experiência de compra',
      sub3p: 'A estrutura de e-commerce foi projetada para que os usuários avançassem naturalmente **da descoberta à compra sem fricção**.',
    },
    outcome: {
      p1: 'O projeto transformou uma experiência de vendas informal em uma **loja digital mais estruturada e profissional**.',
      p2: 'A solução final criou uma **base mais sólida** para a Cleear Cosmetics apresentar produtos, melhorar a experiência do cliente e **continuar crescendo online**.',
      resultsTitle: 'Resultados',
      results: ['Jornada de compra mais organizada', 'Maior consistência de marca', 'Melhor apresentação de produtos', 'Base de UI escalável', 'Melhor base para o crescimento futuro'],
    },
  },
}

// Who acts at each step of the journey diagram ('c' customer, 'b' brand) and its icon.
// The texts come from STR[lang].journey, in the same order.
const JOURNEY_SHAPE = {
  before: [['c', 'eye'], ['c', 'msg'], ['b', 'reply'], ['c', 'bag'], ['b', 'check']],
  after: [['c', 'grid'], ['c', 'list'], ['c', 'bag']],
}

const journeyLane = (lane, shape) => ({
  ...lane,
  steps: shape.map(([who, icon], i) => ({ who, icon, text: lane.steps[i] })),
})

function build(s) {
  const before = journeyLane(s.journey.before, JOURNEY_SHAPE.before)
  const after = journeyLane(s.journey.after, JOURNEY_SHAPE.after)

  return {
    problem: (
      <div className="modal-content-text">
        <P text={s.problem.p1} />
        <P text={s.problem.p2} />

        {/* The problem as it was: selling through messages */}
        <JourneyDiagram labels={s.journey.labels} before={before} foot={s.journey.foot} />

        <P text={s.problem.p3} />

        <figure className="modal-media modal-media--full">
          <div className="modal-media-slot">
            <video
              src="/media/cleear-mobile.mp4"
              poster="/media/cleear-mobile-poster.jpg"
              aria-label="Cleear Cosmetics — mobile screens of the store in motion"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
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
      </div>
    ),

    decisions: (
      <div className="modal-content-text">
        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub1Title}</h4>
          <P text={s.decisions.sub1p} />
          <h4 className="modal-list-title" style={{ marginTop: '12px' }}>{s.decisions.sub1ListTitle}</h4>
          <ul className="modal-list">
            {s.decisions.sub1List.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <figure className="modal-media modal-media--doc">
          <div className="modal-media-slot"><img src="/media/cleear-design-system.png" alt="Cleear Cosmetics — design system: color palette, typography, buttons and product card" /></div>
        </figure>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub2Title}</h4>
          <P text={s.decisions.sub2p} />
          <ul className="modal-list">
            {s.decisions.sub2List.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div className="modal-subsection">
          <h4 className="modal-subsection-title">{s.decisions.sub3Title}</h4>
          <P text={s.decisions.sub3p} />

          {/* The answer to the diagram in section 01: same scale, shorter path */}
          <JourneyDiagram
            labels={s.journey.labels}
            after={after}
            compare={before}
            accent="#B69D62" /* Cleear gold, from the brand's design system */
          />
        </div>
      </div>
    ),

    outcome: (
      <div className="modal-content-text">
        <P text={s.outcome.p1} />
        <P text={s.outcome.p2} />

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

        <h4 className="modal-list-title">{s.outcome.resultsTitle}</h4>
        <ul className="modal-list">
          {s.outcome.results.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    ),
  }
}

export default { en: build(STR.en), es: build(STR.es), pt: build(STR.pt) }
