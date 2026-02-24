'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { CloseIcon, MailIcon, WhatsAppIcon } from './icons'
import { CcCleanLogo } from './CcCleanLogo'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-neu-bg shadow-modal animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <CcCleanLogo iconSize="sm" onClick={onClose} />
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700" aria-label="Cerrar menú">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {siteConfig.navigation.items.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              <Link
                href={item.href}
                className="block py-3.5 text-body-md font-medium text-gray-800 hover:text-cyan-600"
                onClick={onClose}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Contact info */}
        <div className="p-4 mx-4 mb-4 bg-cyan-50 rounded-2xl space-y-3">
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-body-sm text-cyan-800">
            <MailIcon className="w-4 h-4 text-cyan-600" />
            {siteConfig.contact.email}
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-body-sm text-green-700"
          >
            <WhatsAppIcon className="w-4 h-4 text-green-600" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        {/* CTA buttons */}
        <div className="p-4 space-y-3">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20cotizar%20un%20servicio`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Cotizar por WhatsApp
          </a>
          <Link
            href="https://saas-factory-setup.vercel.app/admin/orders"
            className="block w-full text-center bg-neu-bg text-cyan-600 font-semibold py-3 rounded-xl shadow-neu hover:shadow-neu-inset transition-shadow"
            onClick={onClose}
          >
            Portal Administrador
          </Link>
        </div>
      </div>
    </div>
  )
}
