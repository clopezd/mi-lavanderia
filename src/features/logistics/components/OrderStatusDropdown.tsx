'use client'

import { useTransition, useState } from 'react'
import { updateOrderStatus } from '../services/logisticsService'
import { OrderStatusBadge } from './OrderStatusBadge'
import type { OrderStatus } from '../types'
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from '../types'

interface OrderStatusDropdownProps {
  orderId: string
  currentStatus: OrderStatus
}

export function OrderStatusDropdown({ orderId, currentStatus }: OrderStatusDropdownProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus)
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (newStatus: OrderStatus) => {
    if (newStatus === status) {
      setIsOpen(false)
      return
    }
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus)
      if (!result.error) {
        setStatus(newStatus)
      }
      setIsOpen(false)
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 cursor-pointer disabled:opacity-50"
        aria-label="Cambiar estado del pedido"
      >
        <OrderStatusBadge status={status} />
        {!isPending && (
          <svg
            className={`w-3 h-3 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {isPending && (
          <svg className="w-3 h-3 text-white/40 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-50 w-40 rounded-xl overflow-hidden"
             style={{ background: 'rgba(15, 12, 41, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
          {ORDER_STATUS_FLOW.map((s) => (
            <button
              key={s}
              onClick={() => handleChange(s)}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors
                ${s === status
                  ? 'bg-white/10 text-white/90'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
                }`}
            >
              {ORDER_STATUS_LABELS[s]}
              {s === status && (
                <span className="ml-2 text-cyan-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
