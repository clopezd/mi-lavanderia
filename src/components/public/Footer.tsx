import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { CcCleanLogo } from './CcCleanLogo'

export function Footer() {

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neu-bg text-gray-600 border-t border-gray-200 shadow-neu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <CcCleanLogo className="mb-4" />
          <p className="text-body-sm text-gray-500 leading-relaxed mb-2">
            {siteConfig.firmDescription}
          </p>
          <p className="text-body-sm text-gray-400">
            Servicio profesional de lavandería en Heredia, Costa Rica.
          </p>
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
