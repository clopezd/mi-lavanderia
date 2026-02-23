import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'

function ServiceIllustration({ icon }: { icon: string }) {
  if (icon === 'lavado') {
    return (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Washing machine body */}
        <rect x="55" y="20" width="90" height="100" rx="10" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="2" />
        {/* Door circle */}
        <circle cx="100" cy="80" r="32" fill="white" stroke="#22d3ee" strokeWidth="2.5" />
        <circle cx="100" cy="80" r="24" fill="#e0f2fe" stroke="#06b6d4" strokeWidth="1.5" />
        {/* Clothes / water swirl inside */}
        <path d="M86 80c4-8 14-8 18 0s14 8 18 0" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M82 74c5-5 12-4 16 0s11 5 16 0" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Control panel */}
        <rect x="63" y="28" width="74" height="28" rx="6" fill="white" stroke="#a5f3fc" strokeWidth="1" />
        <circle cx="80" cy="42" r="7" fill="#06b6d4" />
        <rect x="94" y="38" width="30" height="4" rx="2" fill="#a5f3fc" />
        <rect x="94" y="44" width="20" height="3" rx="1.5" fill="#cffafe" />
        {/* Bubbles */}
        <circle cx="138" cy="55" r="5" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="1.5" />
        <circle cx="148" cy="68" r="3.5" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="1.5" />
        <circle cx="52" cy="65" r="4" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="1.5" />
        <circle cx="44" cy="80" r="2.5" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="1" />
      </svg>
    )
  }
  if (icon === 'planchado') {
    return (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Ironing board */}
        <rect x="30" y="90" width="140" height="8" rx="4" fill="#e0f2fe" stroke="#67e8f9" strokeWidth="1.5" />
        {/* Board legs */}
        <line x1="65" y1="98" x2="55" y2="120" stroke="#a5f3fc" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="135" y1="98" x2="145" y2="120" stroke="#a5f3fc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Shirt on board */}
        <path d="M45 90C45 90 55 62 80 62h40c25 0 35 28 35 28H45z" fill="white" stroke="#a5f3fc" strokeWidth="1.5" />
        {/* Shirt collar */}
        <path d="M90 62l10 16 10-16" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Iron */}
        <path d="M110 46h38l-8 22h-38l8-22z" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
        {/* Iron handle */}
        <path d="M140 46v-12a4 4 0 00-4-4h-10a4 4 0 00-4 4v12" fill="#cffafe" stroke="#06b6d4" strokeWidth="1.5" />
        {/* Iron steam holes */}
        <circle cx="124" cy="58" r="1.5" fill="#67e8f9" />
        <circle cx="132" cy="58" r="1.5" fill="#67e8f9" />
        <circle cx="140" cy="58" r="1.5" fill="#67e8f9" />
        {/* Steam lines */}
        <path d="M118 42c0-3 3-3 3-6" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M126 40c0-3 3-3 3-6" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M134 42c0-3 3-3 3-6" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  // delivery
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Road */}
      <rect x="20" y="105" width="160" height="12" rx="6" fill="#e0f2fe" />
      <line x1="70" y1="111" x2="85" y2="111" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
      <line x1="100" y1="111" x2="115" y2="111" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
      {/* Van body */}
      <rect x="30" y="62" width="100" height="48" rx="8" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="2" />
      {/* Cab */}
      <path d="M130 86v24h26a4 4 0 004-4V86a6 6 0 00-4-5.7L138 74a8 8 0 00-8 8v4z" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" />
      {/* Windshield */}
      <path d="M132 80l18 6v10h-18V80z" fill="white" stroke="#a5f3fc" strokeWidth="1" />
      {/* Logo on van */}
      <rect x="50" y="75" width="65" height="22" rx="4" fill="white" stroke="#a5f3fc" strokeWidth="1" />
      <text x="82" y="90" textAnchor="middle" fontSize="9" fontFamily="system-ui" fontWeight="700" fill="#0891b2">C&amp;C</text>
      {/* Wheels */}
      <circle cx="65" cy="110" r="12" fill="#64748b" stroke="#475569" strokeWidth="2" />
      <circle cx="65" cy="110" r="5" fill="#94a3b8" />
      <circle cx="140" cy="110" r="12" fill="#64748b" stroke="#475569" strokeWidth="2" />
      <circle cx="140" cy="110" r="5" fill="#94a3b8" />
      {/* Speed lines */}
      <line x1="18" y1="75" x2="32" y2="75" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="83" x2="30" y2="83" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="91" x2="30" y2="91" stroke="#67e8f9" strokeWidth="1" strokeLinecap="round" />
      {/* Package on van roof */}
      <rect x="68" y="48" width="28" height="20" rx="3" fill="white" stroke="#06b6d4" strokeWidth="1.5" />
      <line x1="82" y1="48" x2="82" y2="68" stroke="#06b6d4" strokeWidth="1" />
      <line x1="68" y1="58" x2="96" y2="58" stroke="#06b6d4" strokeWidth="1" />
    </svg>
  )
}

export function ServicesGrid() {
  const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20cotizar%20un%20servicio`

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Lo que hacemos"
          title="Servicios diseñados para tu comodidad."
          subtitle="Recogemos, lavamos, planchamos y entregamos. Tú solo disfruta de tu tiempo."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {siteConfig.services.map((service) => (
            <div
              key={service.slug}
              className="bg-neu-bg rounded-3xl shadow-neu overflow-hidden flex flex-col group hover:shadow-neu-md transition-shadow duration-300"
            >
              {/* Visual illustration area */}
              <div className="h-48 bg-gradient-to-br from-sky-50 to-cyan-100 flex items-center justify-center p-6">
                <ServiceIllustration icon={service.icon} />
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-heading text-display-xs font-bold tracking-tight text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-body-sm text-gray-500 leading-relaxed mb-6 flex-1">
                  {service.shortDescription}
                </p>
                <a
                  href={`${waUrl}&text=Hola,%20quiero%20solicitar%20el%20servicio%20de%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-neu-bg text-cyan-600 font-semibold text-body-sm px-5 py-3 rounded-2xl shadow-neu hover:shadow-neu-inset active:shadow-neu-inset transition-shadow duration-200"
                >
                  Solicitar Servicio
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-12 text-center">
          <a
            href={`${waUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-2xl transition-colors shadow-lg shadow-green-200 text-body-md"
          >
            Cotizar todos los servicios por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
