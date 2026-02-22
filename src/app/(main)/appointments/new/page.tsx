import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookingWizard } from '@/features/booking/components/BookingWizard'

export const metadata = {
  title: 'Nuevo Pedido | C&C Clean Express'
}

interface PageProps {
  searchParams: Promise<{ lawyer?: string }>
}

export default async function NewAppointmentPage({ searchParams }: PageProps) {
  const params = await searchParams
  const preselectedLawyerId = params.lawyer

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/lawyers">
          <Button variant="ghost" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a encargados
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Nuevo Pedido</h1>
        <p className="text-foreground-secondary mt-1">
          Sigue los pasos para registrar tu pedido de lavado
        </p>
      </div>

      <BookingWizard preselectedLawyerId={preselectedLawyerId} />
    </div>
  )
}
