/*
  # Update partners table schema
  
  1. Changes
    - Simplify partners table structure
    - Remove unused fields
    - Update trigger function
  
  2. Security
    - Maintain existing RLS policies
*/

-- Update partners table
ALTER TABLE partners 
DROP COLUMN business_type,
DROP COLUMN contact_person,
DROP COLUMN business_address,
DROP COLUMN social_links,
DROP COLUMN business_details,
DROP COLUMN verification_status;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_type TEXT;
BEGIN
  -- Get user type from metadata
  user_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'customer');
  
  -- Create profile record
  INSERT INTO public.profiles (id, email, user_type)
  VALUES (NEW.id, NEW.email, user_type);
  
  -- Create customer or partner record based on user type
  IF user_type = 'customer' THEN
    INSERT INTO public.customers (
      id,
      full_name,
      phone
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'phone', '')
    );
  ELSE
    INSERT INTO public.partners (
      id,
      business_name,
      phone,
      website_url
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'phone', ''),
      COALESCE(NEW.raw_user_meta_data->>'website_url', '')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;