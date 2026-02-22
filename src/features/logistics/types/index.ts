export type OrderStatus = 'PENDIENTE' | 'RECOGIDO' | 'LAVANDO' | 'LISTO' | 'ENTREGADO'
export type OrderSource = 'web' | 'whatsapp' | 'voice'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDIENTE: 'Pendiente',
  RECOGIDO: 'Recogido',
  LAVANDO: 'Lavando',
  LISTO: 'Listo',
  ENTREGADO: 'Entregado',
}

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'PENDIENTE',
  'RECOGIDO',
  'LAVANDO',
  'LISTO',
  'ENTREGADO',
]

export const ORDER_SOURCE_LABELS: Record<OrderSource, string> = {
  web: 'Web',
  whatsapp: 'WhatsApp',
  voice: 'Voz',
}

export interface Order {
  id: string
  client_id: string
  status: OrderStatus
  source: OrderSource
  raw_input: string | null
  collection_address: string
  collection_date: string | null
  collection_notes: string | null
  delivery_address: string | null
  delivery_date: string | null
  total_amount: number | null
  created_at: string
  updated_at: string
  profiles?: {
    full_name: string | null
    phone: string | null
  } | null
}

export interface OrderItem {
  id: string
  order_id: string
  item_name: string
  quantity: number
  unit_price: number
  total_price: number
  notes: string | null
}

export interface AdminMetrics {
  total_today: number
  pending: number
  in_progress: number
  delivered_today: number
}

export interface CreateExternalOrderPayload {
  client_id: string
  collection_address: string
  collection_date: string
  collection_notes?: string
  source: 'whatsapp' | 'voice'
  raw_input?: string
}
