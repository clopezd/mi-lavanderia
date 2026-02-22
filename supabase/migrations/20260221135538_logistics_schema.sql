-- 1. profiles: Aseguramos campos adicionales útiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'client', -- roles: 'client', 'driver', 'admin', etc.
  phone TEXT,
  address TEXT, -- Dirección por defecto
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. orders: Tabla principal de pedidos o solicitudes de servicio
CREATE TYPE order_status AS ENUM ('PENDIENTE', 'RECOGIDO', 'LAVANDO', 'LISTO', 'ENTREGADO');

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) NOT NULL,
  status order_status DEFAULT 'PENDIENTE',
  collection_address TEXT NOT NULL,
  collection_date TIMESTAMP WITH TIME ZONE NOT NULL,
  collection_notes TEXT,
  delivery_address TEXT,
  delivery_date TIMESTAMP WITH TIME ZONE,
  total_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. order_items: Detalle de las prendas o servicios por pedido
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL, -- Ej. 'Camisa', 'Pantalón', 'Servicio por Kilo'
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  notes TEXT
);

-- Habilitar RLS (Row Level Security) y crear políticas básicas
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.client_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.client_id = auth.uid()
    )
  );
