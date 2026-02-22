import type { OrderStatus, OrderSource } from '../types'
import { ORDER_STATUS_LABELS, ORDER_SOURCE_LABELS } from '../types'

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDIENTE: 'bg-amber-500/20 border border-amber-400/30 text-amber-300',
  RECOGIDO:  'bg-blue-500/20 border border-blue-400/30 text-blue-300',
  LAVANDO:   'bg-cyan-500/20 border border-cyan-400/30 text-cyan-300',
  LISTO:     'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300',
  ENTREGADO: 'bg-white/10 border border-white/20 text-white/55',
}

const STATUS_DOT: Record<OrderStatus, string> = {
  PENDIENTE: 'bg-amber-400',
  RECOGIDO:  'bg-blue-400',
  LAVANDO:   'bg-cyan-400 animate-pulse',
  LISTO:     'bg-emerald-400',
  ENTREGADO: 'bg-white/40',
}

const SOURCE_STYLES: Record<OrderSource, string> = {
  web:       'bg-violet-500/15 border border-violet-400/25 text-violet-300',
  whatsapp:  'bg-green-500/15 border border-green-400/25 text-green-300',
  voice:     'bg-orange-500/15 border border-orange-400/25 text-orange-300',
}

interface OrderStatusBadgeProps {
  status: OrderStatus
  size?: 'sm' | 'md'
}

export function OrderStatusBadge({ status, size = 'md' }: OrderStatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses} ${STATUS_STYLES[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {ORDER_STATUS_LABELS[status]}
    </span>
  )
}

interface OrderSourceBadgeProps {
  source: OrderSource
}

export function OrderSourceBadge({ source }: OrderSourceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${SOURCE_STYLES[source]}`}
    >
      {ORDER_SOURCE_LABELS[source]}
    </span>
  )
}
