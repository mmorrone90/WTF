/*
  # Add Product URL Column
  
  1. Add product_url column to products table
  2. Create function to generate product URL from partner website and product title
  3. Create trigger to automatically update product_url on insert/update
*/

-- Add product_url column
ALTER TABLE products ADD COLUMN product_url TEXT;

-- Create function to generate product URL
CREATE OR REPLACE FUNCTION generate_product_url()
RETURNS TRIGGER AS $$
DECLARE
  partner_website TEXT;
  url_safe_title TEXT;
BEGIN
  -- Get partner's website URL
  SELECT website_url INTO partner_website
  FROM partners
  WHERE id = NEW.partner_id;

  -- Convert title to URL-safe format (lowercase, replace spaces with hyphens)
  url_safe_title := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'));
  
  -- Remove leading/trailing hyphens
  url_safe_title := TRIM(BOTH '-' FROM url_safe_title);

  -- Combine website and title
  IF partner_website IS NOT NULL AND partner_website != '' THEN
    -- Remove trailing slash from website if present
    partner_website := RTRIM(partner_website, '/');
    NEW.product_url := partner_website || '/' || url_safe_title;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for insert/update
CREATE TRIGGER update_product_url
  BEFORE INSERT OR UPDATE OF name
  ON products
  FOR EACH ROW
  EXECUTE FUNCTION generate_product_url();

-- Update existing products
UPDATE products p
SET product_url = (
  SELECT website_url || '/' || TRIM(BOTH '-' FROM LOWER(REGEXP_REPLACE(p.name, '[^a-zA-Z0-9]+', '-', 'g')))
  FROM partners
  WHERE partners.id = p.partner_id
  AND website_url IS NOT NULL
  AND website_url != ''
); 