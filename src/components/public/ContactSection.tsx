import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'
import { MailIcon, ClockIcon, WhatsAppIcon } from './icons'

export function ContactSection() {
  const { contact } = siteConfig
  const waUrl = `https://wa.me/${contact.whatsappNumber?.replace(/\D/g, '')}?text=Hola,%20quiero%20solicitar%20una%20recolección`

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contáctanos"
          title="Estamos listos para atenderte."
          subtitle="Escríbenos por WhatsApp o correo. Respondemos rápido."
        />

        <div className="max-w-3xl mx-auto mt-14">
          <div className="space-y-5">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 bg-neu-bg rounded-3xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-2xl flex items-center justify-center shrink-0">
                <MailIcon className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <p className="text-body-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Correo electrónico</p>
                <p className="text-body-md font-bold text-cyan-700">{contact.email}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-neu-bg rounded-3xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-2xl flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-body-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">WhatsApp</p>
                <p className="text-body-md font-bold text-green-700">{contact.phoneDisplay}</p>
                <p className="text-body-sm text-gray-400">Escríbenos, respondemos rápido</p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-center gap-4 bg-neu-bg rounded-3xl p-6 shadow-neu">
              <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-2xl flex items-center justify-center shrink-0">
                <ClockIcon className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <p className="text-body-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Horario de atención</p>
                <p className="text-body-md font-medium text-gray-700">{contact.officeHours}</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors text-body-md uppercase tracking-wide shadow-lg shadow-green-200 mt-4"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Solicitar Recolección por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
