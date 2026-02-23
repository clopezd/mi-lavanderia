import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrderLeadsTable } from './OrderLeadsTable'

export const metadata = {
  title: 'Pedidos Web | C&C Clean Express Admin',
}

export default async function AdminOrderLeadsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  // La policy RLS "admin_read_order_leads" permite SELECT solo a usuarios
  // autenticados con role = 'admin'. Usamos el cliente normal (sesión del admin).
  const { data: leads, error: leadsError } = await supabase
    .from('order_leads')
    .select('id, created_at, nombre, bags_quantity, pickup_day, status')
    .order('created_at', { ascending: false })

  if (leadsError) {
    console.error('[admin/orders] Error fetching order_leads:', leadsError)
  }

  const all = leads ?? []
  const pendiente = all.filter(l => l.status === 'Pendiente').length
  const enCurso = all.filter(l => ['Recogido', 'Lavado', 'Listo'].includes(l.status)).length
  const entregado = all.filter(l => l.status === 'Entregado').length

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/95">Pedidos del Widget</h1>
        <p className="text-white/40 text-sm mt-1">
          Leads recibidos desde la landing page
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pendientes', value: pendiente, color: 'text-amber-300', border: 'border-amber-400/20' },
          { label: 'En curso', value: enCurso, color: 'text-blue-300', border: 'border-blue-400/20' },
          { label: 'Entregados', value: entregado, color: 'text-emerald-300', border: 'border-emerald-400/20' },
        ].map(stat => (
          <div
            key={stat.label}
            className={`rounded-2xl p-5 border ${stat.border}`}
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}
          >
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-white/40 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/70 font-semibold">Todos los pedidos</h2>
          <span className="text-white/30 text-xs">{all.length} total</span>
        </div>
        <OrderLeadsTable initialLeads={all} />
      </div>

    </div>
  )
}
