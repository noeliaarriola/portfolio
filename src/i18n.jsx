// i18n.jsx
// Minimal language system: a context holding the active language (persisted to
// localStorage), a useT() hook returning the active dictionary, and a compact
// EN/ES/PT switch for the nav. The H1 "THINKING WHILE BUILDING." is intentionally
// never translated — it's a brand element and lives directly in SectionHome.
import { createContext, useContext, useEffect, useState } from 'react'

const DICT = {
  en: {
    label: 'EN',
    dateLocale: 'en-US',
    nav: { home: 'HOME', about: 'ABOUT', projects: 'PROJECTS', contact: 'CONTACT' },
    home: {
      chips: ['UX DESIGNER', 'COMPUTER SCIENCE', 'Argentinian', 'Based in Brazil', 'Always learning'],
      tagline: 'A UX Design Portfolio by Noelia Limp A.',
      viewWork: 'VIEW WORK ↓',
      contact: 'CONTACT',
    },
    about: {
      focus: 'FOCUS',
      tools: 'TOOLS',
      focusItems: ['UX Design', 'Interaction', 'Systems', 'Frontend'],
      headlinePre: 'Precision in\nevery ',
      headlineEm: 'detail.',
      bio: 'I believe UX design is not just about how things look, but how they function, adapt, and feel. My work lies at the intersection of systematic logic and human emotion, translating complex technical frameworks into simple, intuitive, and delightful digital experiences.',
    },
    contact: {
      connect: "LET'S CONNECT",
      headlinePre: "Let's build something\n",
      headlineEm: 'meaningful.',
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      behance: 'BEHANCE',
      contactMe: 'contact me ↗',
      backToTop: 'BACK TO TOP ●',
    },
    projects: {
      selectedWork: 'SELECTED WORK',
      moreSoon: 'MORE PROJECTS SOON',
      subtitles: {
        'Cleear Cosmetics': 'Creating a cohesive e-commerce experience for a growing beauty brand',
        'Powersis': 'Building the digital foundation for a growing engineering company',
        'AppBiT — B2G': 'Designing an AI-powered public data platform during a 5-week hackathon',
        'SPR Capital': 'A group project — designing a financial experience from UX research to a scalable solution',
      },
    },
    tags: {
      'E-COMMERCE DESIGN': 'E-COMMERCE DESIGN',
      'UI DESIGN': 'UI DESIGN',
      'UX/UI DESIGN': 'UX/UI DESIGN',
      'BRAND FOUNDATION': 'BRAND FOUNDATION',
      'RESPONSIVE': 'RESPONSIVE',
      'UX STRATEGY': 'UX STRATEGY',
      'WEB DESIGN': 'WEB DESIGN',
      'SEO': 'SEO',
      'DESIGN SYSTEM': 'DESIGN SYSTEM',
      'DATA VISUALIZATION': 'DATA VISUALIZATION',
      'FRONTEND': 'FRONTEND',
      'UX RESEARCH': 'UX RESEARCH',
      'PRODUCT STRATEGY': 'PRODUCT STRATEGY',
    },
    modal: {
      sections: {
        problem:   { label: 'Product',        title: 'The Problem', accent: 'Worth Solving' },
        role:      { label: 'Team & Process', title: 'My Role &',   accent: 'Contribution' },
        decisions: { label: 'Design Craft',   title: 'Key Design',  accent: 'Decisions' },
        outcome:   { label: 'Impact',         title: 'The',         accent: 'Outcome' },
      },
      soon: '— Content coming soon',
      close: 'Close ✕',
    },
  },

  es: {
    label: 'ES',
    dateLocale: 'es-ES',
    nav: { home: 'INICIO', about: 'SOBRE', projects: 'PROYECTOS', contact: 'CONTACTO' },
    home: {
      chips: ['DISEÑADORA UX', 'CIENCIAS DE LA COMPUTACIÓN', 'Argentina', 'Radicada en Brasil', 'Siempre aprendiendo'],
      tagline: 'Un portfolio de diseño UX creado por Noelia Limp A.',
      viewWork: 'VER TRABAJO ↓',
      contact: 'CONTACTO',
    },
    about: {
      focus: 'ENFOQUE',
      tools: 'HERRAMIENTAS',
      focusItems: ['Diseño UX', 'Interacción', 'Sistemas', 'Frontend'],
      headlinePre: 'Precisión en\ncada ',
      headlineEm: 'detalle.',
      bio: 'Creo que el diseño UX no se trata solo de cómo se ven las cosas, sino de cómo funcionan, se adaptan y se sienten. Mi trabajo está en la intersección entre la lógica sistemática y la emoción humana, traduciendo marcos técnicos complejos en experiencias digitales simples, intuitivas y placenteras.',
    },
    contact: {
      connect: 'CONECTEMOS',
      headlinePre: 'Construyamos algo\n',
      headlineEm: 'con sentido.',
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      behance: 'BEHANCE',
      contactMe: 'escríbeme ↗',
      backToTop: 'VOLVER ARRIBA ●',
    },
    projects: {
      selectedWork: 'TRABAJO SELECCIONADO',
      moreSoon: 'MÁS PROYECTOS PRONTO',
      subtitles: {
        'Cleear Cosmetics': 'Creando una experiencia de e-commerce coherente para una marca de belleza en crecimiento',
        'Powersis': 'Construyendo la base digital de una empresa de ingeniería en crecimiento',
        'AppBiT — B2G': 'Diseñando una plataforma de datos públicos con IA en una hackathon de 5 semanas',
        'SPR Capital': 'Un proyecto grupal — diseñando una experiencia financiera desde la investigación UX hasta una solución escalable',
      },
    },
    tags: {
      'E-COMMERCE DESIGN': 'DISEÑO E-COMMERCE',
      'UI DESIGN': 'DISEÑO UI',
      'UX/UI DESIGN': 'DISEÑO UX/UI',
      'BRAND FOUNDATION': 'IDENTIDAD DE MARCA',
      'RESPONSIVE': 'RESPONSIVO',
      'UX STRATEGY': 'ESTRATEGIA UX',
      'WEB DESIGN': 'DISEÑO WEB',
      'SEO': 'SEO',
      'DESIGN SYSTEM': 'SISTEMA DE DISEÑO',
      'DATA VISUALIZATION': 'VISUALIZACIÓN DE DATOS',
      'FRONTEND': 'FRONTEND',
      'UX RESEARCH': 'INVESTIGACIÓN UX',
      'PRODUCT STRATEGY': 'ESTRATEGIA DE PRODUCTO',
    },
    modal: {
      sections: {
        problem:   { label: 'Producto',           title: 'El Problema', accent: 'a Resolver' },
        role:      { label: 'Equipo y Proceso',   title: 'Mi Rol y',    accent: 'Contribución' },
        decisions: { label: 'Craft de Diseño',    title: 'Decisiones de', accent: 'Diseño Clave' },
        outcome:   { label: 'Impacto',            title: 'El',          accent: 'Resultado' },
      },
      soon: '— Contenido próximamente',
      close: 'Cerrar ✕',
    },
  },

  pt: {
    label: 'PT',
    dateLocale: 'pt-BR',
    nav: { home: 'INÍCIO', about: 'SOBRE', projects: 'PROJETOS', contact: 'CONTATO' },
    home: {
      chips: ['DESIGNER UX', 'CIÊNCIA DA COMPUTAÇÃO', 'Argentina', 'Radicada no Brasil', 'Sempre aprendendo'],
      tagline: 'Um portfólio de UX Design, feito por Noelia Limp A.',
      viewWork: 'VER TRABALHOS ↓',
      contact: 'CONTATO',
    },
    about: {
      focus: 'FOCO',
      tools: 'FERRAMENTAS',
      focusItems: ['Design UX', 'Interação', 'Sistemas', 'Frontend'],
      headlinePre: 'Precisão em\ncada ',
      headlineEm: 'detalhe.',
      bio: 'Acredito que o design UX não é apenas sobre como as coisas parecem, mas como elas funcionam, se adaptam e se sentem. Meu trabalho está na interseção entre a lógica sistemática e a emoção humana, traduzindo estruturas técnicas complexas em experiências digitais simples, intuitivas e agradáveis.',
    },
    contact: {
      connect: 'VAMOS CONECTAR',
      headlinePre: 'Vamos construir algo\n',
      headlineEm: 'com significado.',
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      behance: 'BEHANCE',
      contactMe: 'fale comigo ↗',
      backToTop: 'VOLTAR AO TOPO ●',
    },
    projects: {
      selectedWork: 'TRABALHOS SELECIONADOS',
      moreSoon: 'MAIS PROJETOS EM BREVE',
      subtitles: {
        'Cleear Cosmetics': 'Criando uma experiência de e-commerce coesa para uma marca de beleza em crescimento',
        'Powersis': 'Construindo a base digital de uma empresa de engenharia em crescimento',
        'AppBiT — B2G': 'Projetando uma plataforma de dados públicos com IA em um hackathon de 5 semanas',
        'SPR Capital': 'Um projeto em grupo — projetando uma experiência financeira da pesquisa UX até uma solução escalável',
      },
    },
    tags: {
      'E-COMMERCE DESIGN': 'DESIGN DE E-COMMERCE',
      'UI DESIGN': 'DESIGN DE UI',
      'UX/UI DESIGN': 'DESIGN UX/UI',
      'BRAND FOUNDATION': 'IDENTIDADE DE MARCA',
      'RESPONSIVE': 'RESPONSIVO',
      'UX STRATEGY': 'ESTRATÉGIA UX',
      'WEB DESIGN': 'DESIGN WEB',
      'SEO': 'SEO',
      'DESIGN SYSTEM': 'DESIGN SYSTEM',
      'DATA VISUALIZATION': 'VISUALIZAÇÃO DE DADOS',
      'FRONTEND': 'FRONTEND',
      'UX RESEARCH': 'PESQUISA UX',
      'PRODUCT STRATEGY': 'ESTRATÉGIA DE PRODUTO',
    },
    modal: {
      sections: {
        problem:   { label: 'Produto',            title: 'O Problema', accent: 'a Resolver' },
        role:      { label: 'Equipe e Processo',  title: 'Meu Papel e', accent: 'Contribuição' },
        decisions: { label: 'Craft de Design',    title: 'Principais Decisões', accent: 'de Design' },
        outcome:   { label: 'Impacto',            title: 'O',          accent: 'Resultado' },
      },
      soon: '— Conteúdo em breve',
      close: 'Fechar ✕',
    },
  },
}

const LANGS = ['en', 'es', 'pt']
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('lang')
    return LANGS.includes(saved) ? saved : 'en'
  })

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICT[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Returns the active dictionary. Falls back to English if used outside a provider.
export function useT() {
  const ctx = useContext(LanguageContext)
  return ctx ? ctx.t : DICT.en
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  return ctx || { lang: 'en', setLang: () => {}, t: DICT.en }
}

// Compact EN · ES · PT switch for the nav.
export function LanguageSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGS.map((code) => (
        <button
          key={code}
          className={'lang-option' + (lang === code ? ' is-active' : '')}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {DICT[code].label}
        </button>
      ))}
    </div>
  )
}
