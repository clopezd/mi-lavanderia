import { siteConfig } from '@/config/siteConfig'
import { MailIcon, WhatsAppIcon } from './icons'

export function TopBar() {
  const { contact } = siteConfig

  return (
    <div className="hidden md:block bg-cyan-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 text-body-sm">
          <div className="flex items-center gap-6">
            <span className="text-cyan-200 hidden lg:inline">
              Servicio profesional de lavandería en Heredia, Costa Rica
            </span>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <MailIcon className="w-3.5 h-3.5" />
              {contact.email}
            </a>
          </div>
          <a
            href={`https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20cotizar%20un%20servicio`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-body-xs font-bold uppercase tracking-wider px-4 py-1 rounded transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
