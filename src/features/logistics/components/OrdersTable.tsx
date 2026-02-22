'use client'

import { useState } from 'react'
import type { Order, OrderStatus } from '../types'
import { OrderStatusDropdown } from './OrderStatusDropdown'
import { OrderSourceBadge } from './OrderStatusBadge'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const STATUS_FILTER_OPTIONS: Array<{ value: OrderStatus | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'Todos' },
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'RECOGIDO', label: 'Recogido' },
  { value: 'LAVANDO', label: 'Lavando' },
  { value: 'LISTO', label: 'Listo' },
  { value: 'ENTREGADO', label: 'Entregado' },
]

interface OrdersTableProps {
  initialOrders: Order[]
}

export function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const filtered = initialOrders.filter((o) => {
    const matchStatus = filter === 'ALL' || o.status === filter
    const matchSearch =
      search === '' ||
      o.collection_address.toLowerCase().includes(search.toLowerCase()) ||
      (o.profiles?.full_name ?? '').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Buscar por cliente o dirección..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white/90 placeholder-white/30
                     outline-none transition-all duration-200
                     focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(10px)',
          }}
        />
        {/* Status filter */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value as OrderStatus | 'ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                ${filter === opt.value
                  ? 'bg-cyan-500/25 border border-cyan-400/40 text-cyan-300'
                  : 'text-white/50 border border-white/10 hover:text-white/75 hover:border-white/20'
                }`}
              style={{ backdropFilter: 'blur(10px)', background: filter === opt.value ? undefined : 'rgba(255,255,255,0.04)' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {/* Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-white/8">
          {['Cliente', 'Dirección', 'Fecha', 'Origen', 'Estado'].map((h) => (
            <p key={h} className="text-[10px] uppercase tracking-wider text-white/35 font-semibold">
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-white/35 text-sm">
            No hay pedidos con este filtro
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
            >
              {/* Cliente */}
              <div className="min-w-0">
                <p className="text-white/85 text-sm font-medium truncate">
                  {order.profiles?.full_name ?? 'Cliente'}
                </p>
                <p className="text-white/35 text-xs truncate mt-0.5">
                  {order.profiles?.phone ?? '—'}
                </p>
              </div>
              {/* Dirección */}
              <p className="text-white/65 text-sm truncate self-center">
                {order.collection_address}
              </p>
              {/* Fecha */}
              <p className="text-white/45 text-xs self-center">
                {formatDate(order.collection_date)}
              </p>
              {/* Origen */}
              <div className="self-center">
                <OrderSourceBadge source={order.source ?? 'web'} />
              </div>
              {/* Estado - inline dropdown */}
              <div className="self-center">
                <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      <p className="text-white/30 text-xs text-right">
        {filtered.length} de {initialOrders.length} pedidos
      </p>
    </div>
  )
}
