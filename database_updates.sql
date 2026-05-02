-- ==========================================
-- ACTUALIZACIÓN DE POLÍTICAS PARA ADMINISTRADORES
-- Ejecutar en el SQL Editor de Supabase
-- ==========================================

-- Políticas para Pedidos: Los usuarios autenticados (Admin) pueden ver todos los pedidos
CREATE POLICY "Lectura de pedidos para admins" ON orders
  FOR SELECT TO authenticated USING (true);

-- Políticas para Pedidos: Los usuarios autenticados (Admin) pueden actualizar los pedidos (ej. cambiar status)
CREATE POLICY "Actualización de pedidos para admins" ON orders
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Políticas para Detalles de Pedido: Los usuarios autenticados (Admin) pueden ver los detalles de todos los pedidos
CREATE POLICY "Lectura de detalles para admins" ON order_items
  FOR SELECT TO authenticated USING (true);
