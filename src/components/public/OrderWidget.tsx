'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { WhatsAppIcon } from './icons'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const WA_NUMBER = '50660691570'

function buildWaUrl(quantity: number, day: string): string {
  const bags = quantity === 1 ? '1 bolsa' : `${quantity} bolsas`
  const text = `Hola, necesito que recojan ${bags} el día ${day}.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

export function OrderWidget() {
  const [quantity, setQuantity] = useState(1)
  const [day, setDay] = useState('Lunes')

  const waUrl = buildWaUrl(quantity, day)
  const previewText = `"Hola, necesito que recojan ${quantity === 1 ? '1 bolsa' : `${quantity} bolsas`} el día ${day}."`

  function handleOrder() {
    // 1. Abre WhatsApp de inmediato — dentro del gesto del usuario para evitar el bloqueador de popups.
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    // 2. Registra el intento en Supabase en segundo plano. No bloquea el flujo.
    void (async () => {
      try {
        const supabase = createClient()
        await supabase
          .from('order_leads')
          .insert({ bags_quantity: quantity, pickup_day: day })
      } catch {
        // Silencioso: el pedido ya fue enviado por WhatsApp
      }
    })()
  }

  return (
    <section id="pedir" className="py-20 lg:py-28 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-neu-bg rounded-3xl shadow-neu-lg p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block bg-cyan-50 border border-cyan-100 text-cyan-700 text-body-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Pedir ahora
              </span>
              <h2 className="font-heading text-display-sm font-bold text-gray-900">
                ¿Cuándo pasamos?
              </h2>
              <p className="text-body-sm text-gray-500 mt-2">
                Elige cantidad y día. Un mensaje y listo.
              </p>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-body-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Cantidad de bolsas
              </label>
              <div className="flex items-center gap-4 bg-neu-bg rounded-2xl shadow-neu-inset p-4">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  className="w-12 h-12 bg-neu-bg rounded-xl shadow-neu flex items-center justify-center text-2xl font-bold text-cyan-600 hover:shadow-neu-inset active:shadow-neu-inset transition-shadow duration-200 select-none"
                >
                  −
                </button>
                <span className="flex-1 text-center font-heading text-display-md font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  aria-label="Aumentar cantidad"
                  className="w-12 h-12 bg-neu-bg rounded-xl shadow-neu flex items-center justify-center text-2xl font-bold text-cyan-600 hover:shadow-neu-inset active:shadow-neu-inset transition-shadow duration-200 select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Day selector */}
            <div className="mb-8">
              <label className="block text-body-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Día de recolección
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DAYS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`py-3 rounded-xl text-body-xs font-semibold transition-shadow duration-200 select-none ${
                      day === d
                        ? 'shadow-neu-inset text-cyan-700 bg-neu-bg'
                        : 'shadow-neu text-gray-500 bg-neu-bg hover:shadow-neu-inset'
                    }`}
                  >
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleOrder}
              className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-5 rounded-2xl transition-colors text-body-md uppercase tracking-wide shadow-lg shadow-green-200"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Pedir por WhatsApp
            </button>

            {/* Message preview */}
            <p className="text-center text-body-xs text-gray-400 mt-4 leading-relaxed">
              Se enviará: <span className="italic">{previewText}</span>
            </p>

          </div>
        </div>
      </div>
    </section>
  )
}
