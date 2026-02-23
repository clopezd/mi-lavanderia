import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { MailIcon, ClockIcon, WhatsAppIcon } from './icons'
import { CcCleanLogo } from './CcCleanLogo'

export function Footer() {
  const { contact, services } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neu-bg text-gray-600 border-t border-gray-200 shadow-neu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div>
            <CcCleanLogo className="mb-4" />
            <p className="text-body-sm text-gray-500 leading-relaxed mb-2">
              {siteConfig.firmDescription}
            </p>
            <p className="text-body-sm text-gray-400">
              Servicio profesional de lavandería en Heredia, Costa Rica.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading text-gray-800 font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios#${service.slug}`} className="text-body-sm text-gray-500 hover:text-cyan-600 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5">
              <Link href="/privacidad" className="block text-body-sm text-gray-400 hover:text-cyan-600 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="block text-body-sm text-gray-400 hover:text-cyan-600 transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading text-gray-800 font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-body-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  <MailIcon className="w-4 h-4 text-cyan-600 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-green-600 shrink-0" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-body-sm text-gray-500">
                <ClockIcon className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                {contact.officeHours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-body-xs text-gray-500">
          <p>Copyright &copy; {currentYear} {siteConfig.firmName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-cyan-600 transition-colors">Privacidad</Link>
            <span>|</span>
            <Link href="/terminos" className="hover:text-cyan-600 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
