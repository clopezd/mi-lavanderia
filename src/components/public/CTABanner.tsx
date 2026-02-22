import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { PhoneIcon } from './icons'

export function CTABanner() {
  return (
    <section className="relative bg-neu-bg overflow-hidden border-t border-gray-100">
      {/* Decorative pattern for light background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230891b2' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l-5-5h2l5 5 5-5h2l-5 5v2h20v2H24v2.5l5 5h-2l-5-5-5 5h-2l5-5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-display-sm md:text-display-md text-cyan-800 mb-3">
              ¿Listo para disfrutar de tu tiempo libre?
            </h2>
            <p className="text-body-lg text-cyan-700">
              Nos encargamos de tu ropa. Estamos listos para ayudarte.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-3 bg-neu-bg text-cyan-600 font-heading font-bold text-display-xs px-8 py-4 rounded-2xl hover:shadow-neu-inset active:shadow-neu-inset transition-shadow shadow-neu"
            >
              <PhoneIcon className="w-6 h-6" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Link
              href="/contacto"
              className="bg-neu-bg text-cyan-700 font-bold px-8 py-4 rounded-2xl shadow-neu hover:shadow-neu-inset active:shadow-neu-inset transition-shadow uppercase tracking-wider text-body-sm flex items-center justify-center"
            >
              Solicitar Recolección
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
