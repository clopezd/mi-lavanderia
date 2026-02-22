-- Fase 3: Preparación para IA (WhatsApp/Voz)
-- Agrega campos source y raw_input a la tabla orders

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS source VARCHAR(20)
  DEFAULT 'web'
  CHECK (source IN ('web', 'whatsapp', 'voice'));

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS raw_input TEXT;

COMMENT ON COLUMN orders.source IS 'Canal de origen: web (formulario), whatsapp (bot), voice (asistente de voz)';
COMMENT ON COLUMN orders.raw_input IS 'Texto crudo recibido del usuario via WhatsApp/Voz antes de parsear';

UPDATE orders SET source = 'web' WHERE source IS NULL;
