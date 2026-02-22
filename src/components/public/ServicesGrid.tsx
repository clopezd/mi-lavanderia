import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'
import { ServiceIcon, ChevronRightIcon } from './icons'

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Cuidamos tu ropa"
          title="Nuestros servicios de lavandería, planchado y cuidado textil."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {siteConfig.services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios#${service.slug}`}
              className="group bg-neu-bg rounded-2xl p-8 shadow-neu hover:shadow-neu-inset transition-shadow duration-300 border border-transparent"
            >
              <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center mb-6">
                <ServiceIcon icon={service.icon} className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="font-heading text-display-xs text-gray-900 mb-3">{service.title}</h3>
              <p className="text-body-sm text-foreground-secondary leading-relaxed mb-4">
                {service.shortDescription}
              </p>
              <span className="inline-flex items-center text-body-sm font-semibold text-cyan-600 group-hover:text-cyan-700 transition-colors">
                Más información
                <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
