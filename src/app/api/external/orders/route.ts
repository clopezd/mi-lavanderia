import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const CreateOrderSchema = z.object({
  client_id: z.string().uuid('client_id debe ser un UUID válido'),
  collection_address: z.string().min(5, 'Dirección muy corta'),
  collection_date: z.string().datetime('Fecha debe ser ISO 8601'),
  collection_notes: z.string().optional(),
  source: z.enum(['whatsapp', 'voice']),
  raw_input: z.string().optional(),
})

export async function POST(request: NextRequest) {
  // Validate API Key
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.EXTERNAL_API_KEY

  if (!expectedKey) {
    console.error('EXTERNAL_API_KEY not set in environment')
    return NextResponse.json({ error: 'Servicio no configurado' }, { status: 500 })
  }

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: 'API key inválida' }, { status: 401 })
  }

  // Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
  }

  // Validate schema
  const parsed = CreateOrderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const {
    client_id,
    collection_address,
    collection_date,
    collection_notes,
    source,
    raw_input,
  } = parsed.data

  const supabase = await createClient()

  // Verify client exists
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', client_id)
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 400 })
  }

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      client_id,
      status: 'PENDIENTE',
      source,
      raw_input: raw_input ?? null,
      collection_address,
      collection_date,
      collection_notes: collection_notes ?? null,
    })
    .select('id, status, source, created_at')
    .single()

  if (error) {
    console.error('Error creating external order:', error)
    return NextResponse.json({ error: 'Error al crear pedido' }, { status: 500 })
  }

  return NextResponse.json(
    { success: true, order_id: order.id, status: order.status, source: order.source },
    { status: 201 }
  )
}
