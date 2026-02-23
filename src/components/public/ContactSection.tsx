import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, WhatsAppIcon } from './icons'

export function ContactSection() {
  const { contact } = siteConfig

  return (
    <section className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestro equipo est&aacute; aqu&iacute; para ayudar."
          subtitle="&iquest;Tiene alguna pregunta o desea programar una cita? Cont&aacute;ctenos."
        />

        <div className="max-w-3xl mx-auto mt-14">
          {/* Contact info cards */}
          <div className="space-y-6">
            <a
              href={`mailto:${contact.email}`}
              className="block bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <MailIcon className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">Correo Electrónico</h3>
                  <p className="text-body-sm text-cyan-600 font-medium">{contact.email}</p>
                </div>
              </div>
            </a>

            <a
              href={`https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-body-sm text-green-600 font-medium">{contact.phoneDisplay}</p>
                  <p className="text-body-sm text-foreground-secondary">Escríbenos, respondemos rápido</p>
                </div>
              </div>
            </a>

            <div className="bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <ClockIcon className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">Horario</h3>
                  <p className="text-body-sm text-foreground-secondary">{contact.officeHours}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20solicitar%20una%20recolección`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors text-body-md uppercase tracking-wider mt-8"
            >
              Solicitar Recolección por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
