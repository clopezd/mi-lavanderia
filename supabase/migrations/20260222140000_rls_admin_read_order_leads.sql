-- Política SELECT para admins autenticados en order_leads.
-- La tabla ya tiene INSERT anónimo. Esta policy permite que los usuarios
-- con role = 'admin' en la tabla profiles puedan leer todos los leads.
CREATE POLICY "admin_read_order_leads" ON public.order_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
