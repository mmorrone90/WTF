/*
  # Product Management Schema

  1. New Tables
    - categories
      - id (uuid, primary key)
      - name (text)
      - partner_id (uuid, foreign key)
      - description (text)
      - created_at (timestamptz)
      
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - size (text[])
      - price (decimal)
      - currency (text)
      - partner_id (uuid, foreign key)
      - category_id (uuid, foreign key)
      - stock (integer)
      - metadata (jsonb)
      - tags (text[])
      - created_at (timestamptz)
      
    - product_images
      - id (uuid, primary key)
      - product_id (uuid, foreign key)
      - image_url (text)
      - is_primary (boolean)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for partner access
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  size TEXT[] NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Remove the CHECK constraint if it exists
ALTER TABLE product_images 
DROP CONSTRAINT IF EXISTS max_images_per_product;

-- Create function to enforce max 5 images per product
CREATE OR REPLACE FUNCTION check_product_images_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM product_images
    WHERE product_id = NEW.product_id
  ) >= 5 THEN
    RAISE EXCEPTION 'Maximum of 5 images allowed per product';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce max images
DROP TRIGGER IF EXISTS enforce_max_images ON product_images;
CREATE TRIGGER enforce_max_images
  BEFORE INSERT ON product_images
  FOR EACH ROW
  EXECUTE FUNCTION check_product_images_count();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Partners can view own categories"
  ON categories FOR SELECT
  TO authenticated
  USING (partner_id = auth.uid());

CREATE POLICY "Partners can insert own categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (partner_id = auth.uid());

CREATE POLICY "Partners can update own categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (partner_id = auth.uid());

CREATE POLICY "Partners can delete own categories"
  ON categories FOR DELETE
  TO authenticated
  USING (partner_id = auth.uid());

-- Create policies for products
CREATE POLICY "Partners can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (partner_id = auth.uid());

CREATE POLICY "Partners can insert own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (partner_id = auth.uid());

CREATE POLICY "Partners can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (partner_id = auth.uid());

CREATE POLICY "Partners can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (partner_id = auth.uid());

-- Create policies for product_images
CREATE POLICY "Partners can view product images"
  ON product_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_id
      AND p.partner_id = auth.uid()
    )
  );

CREATE POLICY "Partners can insert product images"
  ON product_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_id
      AND p.partner_id = auth.uid()
    )
  );

CREATE POLICY "Partners can update product images"
  ON product_images FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_id
      AND p.partner_id = auth.uid()
    )
  );

CREATE POLICY "Partners can delete product images"
  ON product_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_id
      AND p.partner_id = auth.uid()
    )
  );
