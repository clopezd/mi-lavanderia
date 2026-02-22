import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getAllOrders, getAdminMetrics } from '@/features/logistics/services/logisticsService'
import { AdminMetricsRow } from '@/features/logistics/components/AdminMetricsRow'
import { OrdersTable } from '@/features/logistics/components/OrdersTable'
import type { Order } from '@/features/logistics/types'

export const metadata = {
  title: 'Panel de Operaciones | C&C Clean Express',
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const [{ orders }, metrics] = await Promise.all([
    getAllOrders(),
    getAdminMetrics(),
  ])

  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/95">Panel de Operaciones</h1>
        <p className="text-white/40 mt-1 text-sm capitalize">{today}</p>
      </div>

      {/* Metrics */}
      <AdminMetricsRow metrics={metrics} />

      {/* Orders Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/80 font-semibold">Todos los Pedidos</h2>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-cyan-300"
            style={{ background: 'rgba(0,212,255,0.10)', border: '1px solid rgba(0,212,255,0.20)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            En vivo
          </div>
        </div>
        <OrdersTable initialOrders={orders as Order[]} />
      </div>
    </div>
  )
}
