-- =====================================================
-- Migration: notifications table + order_ready trigger
-- C&C Clean Express — 2026-02-22
-- =====================================================

-- 1. Enum notification_type
DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM (
    'appointment_created','appointment_confirmed','appointment_cancelled',
    'appointment_reminder','payment_received','case_update',
    'document_request','order_ready'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. Tabla notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type       notification_type NOT NULL,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  data       JSONB DEFAULT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON public.orders(client_id);

-- 4. RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;
CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- 5. Habilitar Realtime para notifications y orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- 6. Admin RLS en orders (sin esto updateOrderStatus() falla silenciosamente)
DROP POLICY IF EXISTS "Admins can update any order" ON public.orders;
CREATE POLICY "Admins can update any order" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. Función trigger: notificación automática cuando status → LISTO
CREATE OR REPLACE FUNCTION public.notify_order_ready()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'LISTO' AND (OLD.status IS DISTINCT FROM 'LISTO') THEN
    INSERT INTO public.notifications (user_id, type, title, message, data)
    VALUES (
      NEW.client_id,
      'order_ready',
      '¡Tu ropa está lista! 🎉',
      'Tu pedido está listo para ser retirado.',
      jsonb_build_object(
        'order_id',           NEW.id,
        'collection_address', NEW.collection_address
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

-- 8. Trigger en orders
DROP TRIGGER IF EXISTS on_order_status_to_listo ON public.orders;
CREATE TRIGGER on_order_status_to_listo
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_order_ready();
