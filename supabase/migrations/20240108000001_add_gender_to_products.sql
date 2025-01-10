-- Add gender column to products table
ALTER TABLE products
ADD COLUMN gender text CHECK (gender IN ('male', 'female', 'unisex'));

-- Update existing products to have a default value
UPDATE products SET gender = 'unisex' WHERE gender IS NULL; 