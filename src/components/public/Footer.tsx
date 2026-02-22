import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { ScaleIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from './icons'

export function Footer() {
  const { contact, social, services } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neu-bg text-gray-600 border-t border-gray-200 shadow-neu">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ScaleIcon className="w-7 h-7 text-cyan-600" />
              <span className="font-heading text-lg font-bold text-gray-800">{siteConfig.firmName}</span>
            </Link>
            <p className="text-body-sm text-gray-500 leading-relaxed mb-4">
              {siteConfig.firmDescription}
            </p>
            <p className="text-body-sm text-gray-500">
              Atendemos clientes en {contact.city} y toda {contact.country}.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-gray-800 font-semibold mb-4">Sobre Nosotros</h3>
            <ul className="space-y-2.5">
              {siteConfig.navigation.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-body-sm text-gray-500 hover:text-cyan-600 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacidad" className="text-body-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-body-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
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
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-heading text-gray-800 font-semibold mb-4">Ponte en Contacto</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-body-xs text-gray-400 block">{siteConfig.firmName}</span>
                <div className="flex items-start gap-2 mt-1">
                  <MapPinIcon className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" />
                  <span className="text-body-sm text-gray-600">{contact.address}, {contact.city}, {contact.country}</span>
                </div>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-body-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  <PhoneIcon className="w-4 h-4 text-cyan-600" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-body-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  <MailIcon className="w-4 h-4 text-cyan-600" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-body-sm text-gray-600">
                <ClockIcon className="w-4 h-4 text-cyan-600" />
                {contact.officeHours}
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-neu-bg shadow-neu hover:shadow-neu-inset flex items-center justify-center transition-shadow">
                  <FacebookIcon className="w-5 h-5 text-cyan-600" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-neu-bg shadow-neu hover:shadow-neu-inset flex items-center justify-center transition-shadow">
                  <InstagramIcon className="w-5 h-5 text-cyan-600" />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-neu-bg shadow-neu hover:shadow-neu-inset flex items-center justify-center transition-shadow">
                  <LinkedInIcon className="w-5 h-5 text-cyan-600" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-body-xs text-gray-500">
          <p>Copyright &copy; {currentYear} {siteConfig.firmName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-cyan-600 transition-colors">Política de Privacidad</Link>
            <span>|</span>
            <Link href="/terminos" className="hover:text-cyan-600 transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
