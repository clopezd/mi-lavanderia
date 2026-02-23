'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type LeadStatus = 'pending' | 'processing' | 'completed'

interface OrderLead {
  id: string
  created_at: string
  bags_quantity: number
  pickup_day: string
  status: LeadStatus
}

interface Props {
  initialLeads: OrderLead[]
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; next: LeadStatus; nextLabel: string; badgeStyle: string; btnStyle: string }> = {
  pending: {
    label: 'Pendiente',
    next: 'processing',
    nextLabel: 'Marcar En proceso',
    badgeStyle: 'bg-amber-400/20 text-amber-300 border border-amber-400/30',
    btnStyle: 'text-amber-300 hover:bg-amber-400/10 border-amber-400/30',
  },
  processing: {
    label: 'En proceso',
    next: 'completed',
    nextLabel: 'Marcar Completado',
    badgeStyle: 'bg-blue-400/20 text-blue-300 border border-blue-400/30',
    btnStyle: 'text-blue-300 hover:bg-blue-400/10 border-blue-400/30',
  },
  completed: {
    label: 'Completado',
    next: 'completed',
    nextLabel: '—',
    badgeStyle: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30',
    btnStyle: 'text-white/20 border-white/10 cursor-default',
  },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function OrderLeadsTable({ initialLeads }: Props) {
  const [leads, setLeads] = useState<OrderLead[]>(initialLeads)
  const [updating, setUpdating] = useState<string | null>(null)

  async function handleAdvanceStatus(lead: OrderLead) {
    const config = STATUS_CONFIG[lead.status]
    if (lead.status === 'completed') return

    setUpdating(lead.id)
    const supabase = createClient()
    const { error } = await supabase
      .from('order_leads')
      .update({ status: config.next })
      .eq('id', lead.id)

    if (!error) {
      setLeads(prev =>
        prev.map(l => l.id === lead.id ? { ...l, status: config.next } : l)
      )
    }
    setUpdating(null)
  }

  if (leads.length === 0) {
    return (
      <div
        className="rounded-2xl p-16 text-center"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-4xl mb-4">📭</div>
        <p className="text-white/50 text-lg font-medium">Esperando nuevos pedidos...</p>
        <p className="text-white/25 text-sm mt-2">Aparecerán aquí en cuanto alguien use el widget de la landing.</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Table header */}
      <div
        className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-3 text-[11px] uppercase tracking-wider text-white/35 font-semibold"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span>Bolsas</span>
        <span>Día</span>
        <span>Recibido</span>
        <span>Estado</span>
        <span>Acción</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.05]">
        {leads.map(lead => {
          const config = STATUS_CONFIG[lead.status]
          const isUpdating = updating === lead.id

          return (
            <div
              key={lead.id}
              className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.02)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
            >
              {/* Bags */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white/90">{lead.bags_quantity}</span>
                <span className="text-white/35 text-xs">bolsa{lead.bags_quantity !== 1 ? 's' : ''}</span>
              </div>

              {/* Day */}
              <span className="text-white/80 font-medium">{lead.pickup_day}</span>

              {/* Date */}
              <span className="text-white/40 text-sm">{formatDate(lead.created_at)}</span>

              {/* Status badge */}
              <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold w-fit ${config.badgeStyle}`}>
                {config.label}
              </span>

              {/* Action */}
              <button
                onClick={() => handleAdvanceStatus(lead)}
                disabled={lead.status === 'completed' || isUpdating}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 whitespace-nowrap ${config.btnStyle} ${isUpdating ? 'opacity-50' : ''}`}
              >
                {isUpdating ? '...' : config.nextLabel}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
