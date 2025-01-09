/*
  # Add Public Access Policy for Products
  
  1. Add policy to allow public read access to products
    - Anyone can view all products
    - No authentication required
*/

-- Add public read access policy for products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Add public read access policy for product_images
CREATE POLICY "Anyone can view product images"
  ON product_images
  FOR SELECT
  TO anon, authenticated
  USING (true); 