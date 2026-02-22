import type { AdminMetrics } from '../types'

interface MetricCardProps {
  label: string
  value: number
  accent: 'cyan' | 'amber' | 'blue' | 'emerald'
  icon: React.ReactNode
}

const ACCENT_STYLES = {
  cyan:    { card: 'border-cyan-400/20',    text: 'text-cyan-300',    icon: 'bg-cyan-500/20 text-cyan-300' },
  amber:   { card: 'border-amber-400/20',   text: 'text-amber-300',   icon: 'bg-amber-500/20 text-amber-300' },
  blue:    { card: 'border-blue-400/20',    text: 'text-blue-300',    icon: 'bg-blue-500/20 text-blue-300' },
  emerald: { card: 'border-emerald-400/20', text: 'text-emerald-300', icon: 'bg-emerald-500/20 text-emerald-300' },
}

function MetricCard({ label, value, accent, icon }: MetricCardProps) {
  const s = ACCENT_STYLES[accent]
  return (
    <div
      className={`rounded-2xl p-5 border ${s.card} flex items-center gap-4`}
      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.icon}`}>
        {icon}
      </div>
      <div>
        <p className="text-white/50 text-xs font-medium">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${s.text}`}>{value}</p>
      </div>
    </div>
  )
}

export function AdminMetricsRow({ metrics }: { metrics: AdminMetrics }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Pedidos hoy"
        value={metrics.total_today}
        accent="cyan"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      />
      <MetricCard
        label="Pendientes"
        value={metrics.pending}
        accent="amber"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <MetricCard
        label="En proceso"
        value={metrics.in_progress}
        accent="blue"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        }
      />
      <MetricCard
        label="Entregados hoy"
        value={metrics.delivered_today}
        accent="emerald"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  )
}
