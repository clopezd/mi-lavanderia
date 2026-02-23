-- Tabla de leads públicos desde el widget de la landing page.
-- Separada de "orders" (logística interna) porque no requiere autenticación.
CREATE TABLE IF NOT EXISTS public.order_leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  bags_quantity INTEGER NOT NULL CHECK (bags_quantity BETWEEN 1 AND 10),
  pickup_day  TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
);

-- RLS: solo inserts anónimos están permitidos; nadie puede leer desde el cliente.
-- La lectura y gestión se hace únicamente desde el dashboard de Supabase o backend.
ALTER TABLE public.order_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_widget_insert" ON public.order_leads
  FOR INSERT
  WITH CHECK (true);
