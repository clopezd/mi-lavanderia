-- Añadir nombre opcional del cliente al lead del widget.
-- nullable porque los leads existentes no tienen este dato.
ALTER TABLE public.order_leads
  ADD COLUMN IF NOT EXISTS nombre TEXT;
