// ============================================================
// SITE CONFIG - Lavandería Carlos Mario
// ============================================================

export interface ServiceItem {
  icon: 'divorce' | 'custody' | 'alimony' | 'mediation' | 'domestic-violence' | 'separation' | 'contracts' | 'corporate' | 'real-estate' | 'criminal' | 'immigration' | 'labor' | 'custom'
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
  firmName: 'Lavandería Carlos Mario',
  firmSlogan: 'Tu ropa impecable, siempre fresca',
  firmDescription: 'Servicio profesional de lavandería, planchado y entrega a domicilio. Cuidamos tus prendas con los mejores productos para garantizar limpieza y frescura.',
  founderName: 'Carlos Mario',
  founderTitle: 'Fundador y Gerente',
  founderBio: 'Con más de 10 años de experiencia en el cuidado textil, Carlos Mario fundó esta lavandería con un objetivo claro: ofrecer un servicio de alta calidad que devuelva el tiempo libre a las personas. Su pasión por el detalle y la atención al cliente ha convertido a la Lavandería Carlos Mario en la opción preferida de la comunidad.',
  yearsExperience: 10,
  yearFounded: 2014,

  contact: {
    phone: '+50588880000',
    phoneDisplay: '+505 8888-0000',
    email: 'contacto@lavanderiacarlosmario.com',
    address: 'Del parque central 2 cuadras al norte',
    city: 'Managua',
    country: 'Nicaragua',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.5!2d-86.27!3d12.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA3JzQ4LjAiTiA4NsKwMTYnMTIuMCJX!5e0!3m2!1ses!2sni!4v1700000000000',
    whatsappNumber: '+50588880000',
    officeHours: 'Lunes a Sábado, 8:00 a.m. a 6:00 p.m.',
  },

  social: {
    facebook: 'https://facebook.com/lavanderiacarlosmario',
    instagram: 'https://instagram.com/lavanderiacarlosmario',
  },

  navigation: {
    items: [
      { label: 'Inicio', href: '/' },
      {
        label: 'Servicios',
        href: '/servicios',
        children: [
          { label: 'Lavado por Libra', href: '/servicios#lavado-libra' },
          { label: 'Planchado Profesional', href: '/servicios#planchado' },
          { label: 'Lavado en Seco', href: '/servicios#lavado-seco' },
          { label: 'Entrega a Domicilio', href: '/servicios#domicilio' },
        ],
      },
      { label: 'Nuestro Equipo', href: '/equipo' },
      { label: 'Por Qué Elegirnos', href: '/#enfoque' },
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
      icon: 'custom',
      title: 'Lavado por Libra',
      slug: 'lavado-libra',
      shortDescription: 'Ideal para tu ropa del día a día. Lavado, secado y doblado profesional.',
      fullDescription: 'Nuestro servicio de lavado por libra es perfecto para la ropa de uso diario. Clasificamos tus prendas por colores y tipo de tela, utilizamos detergentes de alta eficacia y suavizantes que dejan un aroma fresco y duradero. Te entregamos tu ropa perfectamente doblada y lista para guardar.',
    },
    {
      icon: 'custom',
      title: 'Planchado Profesional',
      slug: 'planchado',
      shortDescription: 'Tus camisas y pantalones impecables, sin una sola arruga.',
      fullDescription: 'Devolvemos a tus prendas su aspecto original. Nuestro equipo utiliza equipos de planchado industrial y técnicas específicas para cada tipo de tela, garantizando que tus camisas, pantalones y trajes luzcan perfectos para cualquier ocasión.',
    },
    {
      icon: 'custom',
      title: 'Lavado en Seco',
      slug: 'lavado-seco',
      shortDescription: 'Cuidado especializado para trajes, vestidos florales y telas delicadas.',
      fullDescription: 'Para aquellas prendas que no pueden tocar el agua, ofrecemos un servicio de limpieza en seco seguro y efectivo. Eliminamos manchas profundas y olores sin dañar las fibras más delicadas de tus trajes, vestidos de noche y abrigos.',
    },
    {
      icon: 'custom',
      title: 'Edredones y Ropa de Cama',
      slug: 'edredones',
      shortDescription: 'Limpieza profunda para piezas grandes que no caben en casa.',
      fullDescription: 'Lavamos e higienizamos tus edredones, mantas, sábanas y cortinas utilizando lavadoras de gran capacidad. Eliminamos ácaros y alérgenos para que disfrutes de un descanso verdaderamente reparador.',
    },
    {
      icon: 'custom',
      title: 'Desmanchado Especial',
      slug: 'desmanchado',
      shortDescription: 'Tratamiento localizado para salvar tus prendas favoritas.',
      fullDescription: '¿Manchas de vino, café o aceite? Nuestros expertos evalúan cada mancha y aplican tratamientos específicos para removerlas sin afectar el color original ni la textura de tu ropa.',
    },
    {
      icon: 'custom',
      title: 'Entrega a Domicilio',
      slug: 'domicilio',
      shortDescription: 'Recogemos y entregamos tu ropa en la puerta de tu casa u oficina.',
      fullDescription: 'Ahorra tiempo y esfuerzo. Programa la recolección de tu ropa sucia a través de WhatsApp o nuestra web, y nosotros nos encargamos del resto. Te devolvemos tu ropa limpia, fresca y empacada directamente en tu puerta.',
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
    siteTitle: 'Lavandería Carlos Mario | Lavado, Planchado y Domicilio',
    titleTemplate: '%s | Lavandería Carlos Mario',
    defaultDescription: 'Servicio profesional de lavandería, planchado y entrega a domicilio. Cuidamos tus prendas con calidad. Solicita recolección hoy.',
    locale: 'es_NI',
  },

  legal: {
    privacyLastUpdated: '2026-02-22',
    termsLastUpdated: '2026-02-22',
  },
}
