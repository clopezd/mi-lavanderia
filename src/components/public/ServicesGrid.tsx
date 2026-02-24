import { siteConfig } from '@/config/siteConfig'

export function ServicesGrid() {
  return (
    <section id="servicios" className="py-4 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {siteConfig.services.map((service) => (
            <li key={service.slug} className="text-body-sm text-gray-500">
              {service.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
