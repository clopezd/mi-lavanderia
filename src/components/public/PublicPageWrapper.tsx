import { TopBar } from './TopBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppIcon } from './icons'
import { siteConfig } from '@/config/siteConfig'

interface PublicPageWrapperProps {
  children: React.ReactNode
}

export function PublicPageWrapper({ children }: PublicPageWrapperProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber?.replace(/[^0-9]/g, '')}`

  return (
    <div className="min-h-screen flex flex-col relative">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      {siteConfig.contact.whatsappNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all hover:scale-105 z-50 flex items-center justify-center animate-bounce group"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsAppIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-100"></span>
          </span>
        </a>
      )}
    </div>
  )
}
