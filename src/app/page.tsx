import { PublicPageWrapper } from '@/components/public/PublicPageWrapper'
import { HeroSection } from '@/components/public/HeroSection'
import { OrderWidget } from '@/components/public/OrderWidget'
import { ServicesGrid } from '@/components/public/ServicesGrid'
import { ContactSection } from '@/components/public/ContactSection'

export default function HomePage() {
  return (
    <PublicPageWrapper>
      <OrderWidget />
      <HeroSection />
      <ServicesGrid />
      <ContactSection />
    </PublicPageWrapper>
  )
}
