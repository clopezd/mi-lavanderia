import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { WhatsAppIcon } from './icons'

export function HeroSection() {
  const { hero, contact } = siteConfig
  const waUrl = `https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20solicitar%20una%20recolección`

  return (
    <section className="relative overflow-hidden bg-neu-bg">
      {/* Soft ambient blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-cyan-500 rounded-full" />
            <span className="text-body-sm font-medium text-cyan-700">
              Servicio profesional de lavandería en Heredia, Costa Rica
            </span>
          </div>

          {/* Headline — impactante */}
          <h1 className="font-heading text-display-lg md:text-display-xl lg:text-display-2xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            {hero.headline}
          </h1>

          <p className="text-body-lg md:text-body-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-body-md px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-green-200 uppercase tracking-wide"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Cotizar por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center bg-neu-bg text-cyan-700 font-semibold text-body-md px-8 py-4 rounded-2xl shadow-neu hover:shadow-neu-inset active:shadow-neu-inset transition-shadow duration-200"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
