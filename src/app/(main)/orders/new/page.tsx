import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RequestCollectionForm from '@/features/logistics/components/RequestCollectionForm'

export const metadata = {
  title: 'Nuevo Pedido | C&C Clean Express',
}

export default async function NewOrderPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') redirect('/admin')

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white/95">Nuevo Pedido</h1>
        <p className="text-white/45 mt-1 text-sm">
          Completa los datos para solicitar la recogida de tus prendas
        </p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      >
        <RequestCollectionForm />
      </div>
    </div>
  )
}
