// ============================================================
// SITE CONFIG - Lavandería Carlos Mario
// ============================================================

export interface ServiceItem {
  icon: 'divorce' | 'custody' | 'alimony' | 'mediation' | 'domestic-violence' | 'separation' | 'contracts' | 'corporate' | 'real-estate' | 'criminal' | 'immigration' | 'labor' | 'custom' | 'lavado' | 'planchado' | 'delivery'
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  specialties: string[]
  imageUrl?: string
  bookingSlug?: string
}

export interface Testimonial {
  name: string
  quote: string
  rating: number
  caseType?: string
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface SiteConfig {
  firmName: string
  firmSlogan: string
  firmDescription: string
  founderName: string
  founderTitle: string
  founderBio: string
  yearsExperience: number
  yearFounded: number

  contact: {
    phone: string
    phoneDisplay: string
    email: string
    address: string
    city: string
    country: string
    googleMapsEmbedUrl: string
    whatsappNumber?: string
    officeHours: string
  }

  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }

  navigation: {
    items: NavItem[]
  }

  hero: {
    headline: string
    subheadline: string
    ctaText: string
    ctaHref: string
    backgroundImageUrl?: string
  }

  values: Array<{
    icon: 'respect' | 'quality' | 'team' | 'experience' | 'confidential' | 'results'
    title: string
    description: string
  }>

  services: ServiceItem[]

  tabs: Array<{
    title: string
    content: string
  }>

  team: TeamMember[]

  testimonials: Testimonial[]

  booking: {
    enabled: boolean
    ctaText: string
    mainLawyerSlug?: string
  }

  seo: {
    siteTitle: string
    titleTemplate: string
    defaultDescription: string
    locale: string
    ogImageUrl?: string
  }

  legal: {
    privacyLastUpdated: string
    termsLastUpdated: string
  }

  theme?: {
    primaryColor?: string
    accentColor?: string
  }
}

// ============================================================
// CONFIGURACIÓN: Lavandería Carlos Mario
// ============================================================

export const siteConfig: SiteConfig = {
  firmName: 'C&C Clean Express',
  firmSlogan: 'Tu ropa impecable, siempre fresca',
  firmDescription: 'Servicio profesional de lavandería, planchado y entrega a domicilio. Cuidamos tus prendas con los mejores productos para garantizar limpieza y frescura.',
  founderName: 'Carlos Mario',
  founderTitle: 'Fundador y Gerente',
  founderBio: 'Con más de 10 años de experiencia en el cuidado textil, Carlos Mario fundó esta lavandería con un objetivo claro: ofrecer un servicio de alta calidad que devuelva el tiempo libre a las personas. Su pasión por el detalle y la atención al cliente ha convertido a C&C Clean Express en la opción preferida de la comunidad.',
  yearsExperience: 10,
  yearFounded: 2014,

  contact: {
    phone: '+50660691570',
    phoneDisplay: '+506 6069-1570',
    email: 'cyccleanexpress@gmail.com',
    address: 'Santa Lucia',
    city: 'Barva, Heredia',
    country: 'Costa Rica',
    googleMapsEmbedUrl: '', // Servicio 100% ONLINE
    whatsappNumber: '+50660691570',
    officeHours: 'Lunes a Sábado, 8:00 a.m. a 6:00 p.m.',
  },

  social: {
    facebook: 'https://facebook.com/cccleanexpress',
    instagram: 'https://instagram.com/cccleanexpress',
  },

  navigation: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },

  hero: {
    headline: 'Tu ropa impecable y fresca, sin salir de casa',
    subheadline: 'Servicio profesional de lavandería, planchado y entrega a domicilio. Confía tus prendas a los expertos y disfruta de tu tiempo libre.',
    ctaText: 'Solicitar Recolección',
    ctaHref: '/contacto',
  },

  values: [
    {
      icon: 'quality',
      title: 'Máxima Calidad',
      description: 'Utilizamos productos premium que cuidan las fibras de tu ropa, manteniéndola como nueva por más tiempo.',
    },
    {
      icon: 'respect',
      title: 'Cuidado Puntual',
      description: 'Respetamos tu tiempo. Nuestro servicio de entrega a domicilio funciona con puntualidad suiza.',
    },
    {
      icon: 'experience',
      title: 'Experiencia Comprobada',
      description: 'Más de una década tratando todo tipo de telas y manchas difíciles nos respalda.',
    },
  ],

  services: [
    {
      icon: 'lavado',
      title: 'Lavado (Por bolsa)',
      slug: 'lavado-bolsa',
      shortDescription: 'Higiene y frescura para tu ropa diaria.',
      fullDescription: 'Clasificamos tus prendas, aplicamos los mejores detergentes y suavizantes, y te las devolvemos perfectamente dobladas y con un aroma fresco y duradero.',
    },
    {
      icon: 'planchado',
      title: 'Planchado Profesional',
      slug: 'planchado',
      shortDescription: 'Acabado impecable para tus prendas especiales.',
      fullDescription: 'Utilizamos equipos industriales y técnicas específicas para cada tipo de tela. Tus camisas, pantalones y trajes quedarán listos para cualquier ocasión, sin una sola arruga.',
    },
    {
      icon: 'delivery',
      title: 'Delivery',
      slug: 'delivery',
      shortDescription: 'Recogemos y entregamos en la puerta de tu negocio.',
      fullDescription: 'Coordina la recolección por WhatsApp y nosotros hacemos el resto. Recogemos tu ropa sucia y te la devolvemos limpia, fresca y empacada directamente en tu puerta.',
    },
  ],

  tabs: [
    {
      title: 'Servicio Express',
      content: '¿Necesitas tu ropa limpia con urgencia? Ofrecemos un servicio express con entrega en 24 horas para lavado por libra y planchado. Ideal para viajeros, imprevistos o simplemente cuando olvidaste lavar tu uniforme.',
    },
    {
      title: 'Cuidado Ecológico',
      content: 'Nos preocupamos por el medio ambiente tanto como por tu ropa. Utilizamos detergentes biodegradables, optimizamos el uso de agua en nuestros ciclos de lavado y mantenemos programas de reciclaje de ganchos y plásticos.',
    },
    {
      title: 'Planes Mensuales',
      content: 'Para familias u oficinas con alto volumen de lavado, ofrecemos planes mensuales con suscripción que incluyen recolección y entrega semanal a precios preferenciales. Olvídate de lavar por completo y disfruta de tu fin de semana.',
    },
  ],

  team: [
    {
      name: 'Carlos Mario',
      title: 'Gerente General y Especialista Textil',
      bio: 'Fundador de la lavandería, supervisa los estándares de calidad en todos los procesos de limpieza y planchado.',
      specialties: ['Lavado en Seco', 'Desmanchado', 'Control de Calidad'],
    },
    {
      name: 'Ana Pérez',
      title: 'Jefa de Operaciones',
      bio: 'Coordina la logística de recolección y entrega, asegurando que tu ropa llegue a tiempo, siempre.',
      specialties: ['Atención al Cliente', 'Logística', 'Servicio Express'],
    },
    {
      name: 'Mario Ruiz',
      title: 'Especialista en Planchado',
      bio: 'Con manos mágicas para las arrugas, Mario asegura que cada camisa y pantalón quede con un acabado profesional de tintorería.',
      specialties: ['Planchado Industrial', 'Trato de Telas Delicadas'],
    },
  ],

  testimonials: [
    {
      name: 'María L.',
      quote: 'Excelente servicio. Solicitamos el servicio a domicilio y en 48 horas teníamos toda nuestra ropa limpia, con un olor riquísimo y perfectamente doblada. Recomendado al 100%.',
      rating: 5,
      caseType: 'Lavado por Libra',
    },
    {
      name: 'Carlos R.',
      quote: 'Mis camisas de trabajo siempre quedan impecables. Me ahorran horas de estar planchando los fines de semana.',
      rating: 5,
      caseType: 'Planchado',
    },
    {
      name: 'Ana P.',
      quote: 'Lograron quitar una mancha de vino de mi vestido favorito que creí perdido. Son unos profesionales.',
      rating: 5,
      caseType: 'Lavado en Seco',
    },
    {
      name: 'José M.',
      quote: 'Los edredones quedaron como nuevos. El servicio al cliente por WhatsApp es muy rápido y amable.',
      rating: 5,
      caseType: 'Edredones',
    },
    {
      name: 'Laura S.',
      quote: 'Puntualidad total en la recolección y entrega. Es un alivio no tener que preocuparme por lavar ropa.',
      rating: 5,
      caseType: 'Domicilio',
    },
  ],

  booking: {
    enabled: true,
    ctaText: 'Solicitar Recolección',
  },

  seo: {
    siteTitle: 'C&C Clean Express | Lavado, Planchado y Domicilio',
    titleTemplate: '%s | C&C Clean Express',
    defaultDescription: 'Servicio profesional de lavandería, planchado y entrega a domicilio. Cuidamos tus prendas con calidad. Solicita recolección hoy.',
    locale: 'es_CR',
  },

  legal: {
    privacyLastUpdated: '2026-02-22',
    termsLastUpdated: '2026-02-22',
  },
}
