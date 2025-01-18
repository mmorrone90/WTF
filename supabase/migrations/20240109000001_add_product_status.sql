/*
  # Add Status Column to Products Table
  
  1. Add status column with CHECK constraint
  2. Set default value to 'draft'
  3. Update existing products to have status = 'active'
*/

-- Add status column to products table
ALTER TABLE products 
ADD COLUMN status text NOT NULL DEFAULT 'draft'
CHECK (status IN ('active', 'draft'));

-- Update existing products to be active
UPDATE products SET status = 'active' WHERE status = 'draft';

-- Update public read access policy to only show active products
DROP POLICY IF EXISTS "Anyone can view products" ON products;
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active'); 