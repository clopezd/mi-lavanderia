import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import { SectionHeading } from './SectionHeading'
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from './icons'

export function ContactSection() {
  const { contact } = siteConfig

  return (
    <section className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestro equipo est&aacute; aqu&iacute; para ayudar."
          subtitle="&iquest;Tiene alguna pregunta o desea programar una cita? Cont&aacute;ctenos."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-neu bg-neu-bg p-2 h-[400px]">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-transparent shadow-neu-inset">
              <iframe
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${siteConfig.firmName}`}
              />
            </div>
          </div>

          {/* Contact info cards */}
          <div className="space-y-6">
            <div className="bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <MapPinIcon className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">Ubicación de la Oficina</h3>
                  <p className="text-body-sm text-foreground-secondary">{contact.address}</p>
                  <p className="text-body-sm text-foreground-secondary">{contact.city}, {contact.country}</p>
                </div>
              </div>
            </div>

            <div className="bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">Datos de Contacto</h3>
                  <p className="text-body-sm text-foreground-secondary">
                    Llame al <a href={`tel:${contact.phone}`} className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">{contact.phoneDisplay}</a> o envíe un correo a{' '}
                    <a href={`mailto:${contact.email}`} className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">{contact.email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neu-bg rounded-2xl p-6 shadow-neu hover:shadow-neu-inset transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neu-bg shadow-neu-inset rounded-xl flex items-center justify-center shrink-0">
                  <ClockIcon className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-1">Horario Comercial</h3>
                  <p className="text-body-sm text-foreground-secondary">{contact.officeHours}</p>
                </div>
              </div>
            </div>

            <Link
              href="/contacto"
              className="block w-full text-center bg-neu-bg text-cyan-600 font-bold py-4 rounded-2xl transition-shadow text-body-md uppercase tracking-wider shadow-neu hover:shadow-neu-inset active:shadow-neu-inset mt-8"
            >
              Enviar Mensaje
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
