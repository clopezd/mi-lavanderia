import Image from 'next/image'
import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  lavado: {
    src: 'https://images.unsplash.com/photo-vkpVPcIBU5U?w=800&h=500&fit=crop&q=85&auto=format',
    alt: 'Lavadora de carga frontal blanca en entorno minimalista',
  },
  planchado: {
    src: 'https://images.unsplash.com/photo-vDGpcotaJzE?w=800&h=500&fit=crop&q=85&auto=format',
    alt: 'Pila de toallas blancas perfectamente dobladas',
  },
  delivery: {
    src: 'https://images.unsplash.com/photo-loLfi6a_c9o?w=800&h=500&fit=crop&q=85&auto=format',
    alt: 'Bolsa de papel kraft minimalista sobre fondo neutro',
  },
}

function ServicePhoto({ icon, title }: { icon: string; title: string }) {
  const image = SERVICE_IMAGES[icon] ?? SERVICE_IMAGES['delivery']
  return (
    <Image
      src={image.src}
      alt={image.alt || title}
      width={600}
      height={400}
      className="w-full h-full object-cover"
    />
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
              {/* Service photo */}
              <div className="h-48 overflow-hidden relative">
                <ServicePhoto icon={service.icon} title={service.title} />
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
