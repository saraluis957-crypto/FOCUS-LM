-- ==========================================
-- SCRIPT DE BASE DE DATOS PARA CREACIONES MOLLY'S
-- Ejecutar en el SQL Editor de Supabase
-- ==========================================

-- 1. Tabla de Categorías (Anchetas, Flores, etc.)
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Productos
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  image_url text, -- URL de la imagen del producto
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Pedidos (Orders)
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending, completed, cancelled
  total_price numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Detalles del Pedido (Order Items)
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1,
  price_at_time numeric NOT NULL, -- El precio en el momento exacto de la compra
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security - RLS)
-- ==========================================

-- Activar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para Categorías: Todos pueden verlas (Select)
CREATE POLICY "Lectura pública de categorias" ON categories
  FOR SELECT USING (true);

-- Políticas para Productos: Todos pueden verlos (Select)
CREATE POLICY "Lectura pública de productos" ON products
  FOR SELECT USING (true);

-- Políticas para Pedidos: Todos pueden crear un pedido (Insert)
CREATE POLICY "Creación anónima de pedidos" ON orders
  FOR INSERT WITH CHECK (true);

-- Políticas para Detalles de Pedido: Todos pueden agregar detalles a un pedido (Insert)
CREATE POLICY "Creación anónima de detalles de pedido" ON order_items
  FOR INSERT WITH CHECK (true);


-- ==========================================
-- DATOS INICIALES (Semilla)
-- ==========================================

-- Insertar las categorías predeterminadas basadas en el diseño
INSERT INTO categories (name) VALUES 
  ('Anchetas'),
  ('Decoraciones'),
  ('Flores'),
  ('Cajas sorpresa');
