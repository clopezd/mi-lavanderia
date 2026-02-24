import { PublicPageWrapper } from '@/components/public/PublicPageWrapper'
import { OrderWidget } from '@/components/public/OrderWidget'
import { ServicesGrid } from '@/components/public/ServicesGrid'
import { ContactSection } from '@/components/public/ContactSection'

export default function HomePage() {
  return (
    <PublicPageWrapper>
      <OrderWidget />
      <ServicesGrid />
      <ContactSection />
    </PublicPageWrapper>
  )
}
