-- Actualizar estados de order_leads al nuevo flujo operativo:
-- 'Pendiente' → 'Recogido' → 'Lavado' → 'Listo' → 'Entregado'

-- 1. Migrar datos existentes al nuevo valor por defecto
UPDATE public.order_leads
  SET status = 'Pendiente'
  WHERE status = 'pending';

UPDATE public.order_leads
  SET status = 'Recogido'
  WHERE status = 'processing';

UPDATE public.order_leads
  SET status = 'Entregado'
  WHERE status = 'completed';

-- 2. Actualizar el DEFAULT de la columna
ALTER TABLE public.order_leads
  ALTER COLUMN status SET DEFAULT 'Pendiente';

-- 3. Añadir CHECK constraint con los nuevos estados permitidos
ALTER TABLE public.order_leads
  ADD CONSTRAINT order_leads_status_check
  CHECK (status IN ('Pendiente', 'Recogido', 'Lavado', 'Listo', 'Entregado'));
