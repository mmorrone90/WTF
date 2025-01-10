/*
  # Configure Storage Bucket for Product Images
  
  1. Create public storage bucket for product images
    - Allow public read access
    - Restrict file types to images
    - Set size limit
*/

-- Create public bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product_images',
  'product_images',
  true,
  50000000, -- 50MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE
SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product_images');

-- Create policy to allow public to download
CREATE POLICY "Allow public to download images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'product_images');

-- Create policy to allow authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete their own images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'product_images' AND auth.uid()::text = owner); 