'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Order } from '../types'
import { OrderStatusBadge, OrderSourceBadge } from './OrderStatusBadge'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div
      className="rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.10]"
      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <OrderStatusBadge status={order.status} />
            <OrderSourceBadge source={order.source ?? 'web'} />
          </div>
          <p className="text-white/90 text-sm font-medium truncate">
            {order.collection_address}
          </p>
          {order.collection_notes && (
            <p className="text-white/40 text-xs mt-1 truncate">{order.collection_notes}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-white/40 text-xs">{formatDate(order.collection_date)}</p>
          {order.total_amount && (
            <p className="text-emerald-300 text-sm font-semibold mt-1">
              ${order.total_amount.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <svg className="w-9 h-9 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      </div>
      <p className="text-white/60 font-medium">Aún no tienes pedidos</p>
      <p className="text-white/30 text-sm mt-1">Crea tu primer pedido con el botón de arriba</p>
    </div>
  )
}

interface ClientOrdersListProps {
  initialOrders: Order[]
  userId: string
}

export function ClientOrdersList({ initialOrders, userId }: ClientOrdersListProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('client-orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `client_id=eq.${userId}`,
        },
        (payload) => {
          setOrders((prev) => [payload.new as Order, ...prev])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `client_id=eq.${userId}`,
        },
        (payload) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === payload.new.id ? (payload.new as Order) : o))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  if (orders.length === 0) return <EmptyState />

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
