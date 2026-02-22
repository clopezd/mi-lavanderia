import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getClientOrders } from '@/features/logistics/services/logisticsService'
import { ClientOrdersList } from '@/features/logistics/components/ClientOrdersList'
import Link from 'next/link'
import type { Order } from '@/features/logistics/types'

export const metadata = {
  title: 'Mis Pedidos | C&C Clean Express',
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

function StatsRow({ orders }: { orders: Order[] }) {
  const active = orders.filter((o) =>
    ['PENDIENTE', 'RECOGIDO', 'LAVANDO'].includes(o.status)
  ).length
  const ready = orders.filter((o) => o.status === 'LISTO').length
  const total = orders.length

  const stats = [
    { label: 'Pedidos activos', value: active, accent: 'text-cyan-300', border: 'border-cyan-400/20', icon: '🔄' },
    { label: 'Listos para recoger', value: ready, accent: 'text-emerald-300', border: 'border-emerald-400/20', icon: '✅' },
    { label: 'Total histórico', value: total, accent: 'text-white/70', border: 'border-white/12', icon: '📦' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-2xl p-5 border ${s.border}`}
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <p className="text-2xl mb-1">{s.icon}</p>
          <p className={`text-2xl font-bold ${s.accent}`}>{s.value}</p>
          <p className="text-white/45 text-xs mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // Admin goes to the operations panel
  if (profile?.role === 'admin') {
    redirect('/admin')
  }

  const userName = profile?.full_name || user.email?.split('@')[0] || 'Usuario'
  const greeting = getGreeting()

  const { orders } = await getClientOrders(user.id)

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white/95">
            {greeting}, {userName}
          </h1>
          <p className="text-white/45 mt-1 text-sm">
            Aquí está el estado de tus pedidos de lavado
          </p>
        </div>
        <Link
          href="/orders/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                     transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3) 0%, rgba(0,180,220,0.2) 100%)',
            border: '1px solid rgba(0,212,255,0.35)',
            color: '#00D4FF',
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Pedido
        </Link>
      </div>

      {/* Stats */}
      <StatsRow orders={orders as Order[]} />

      {/* Orders list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/80 font-semibold">Mis Pedidos</h2>
          <span className="text-white/35 text-xs">{orders.length} pedidos</span>
        </div>
        <ClientOrdersList initialOrders={orders as Order[]} userId={user.id} />
      </div>
    </div>
  )
}
