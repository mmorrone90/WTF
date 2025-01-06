/*
  # Create Profile Creation Triggers
  
  1. Add triggers to create customer/partner records
  2. Update handle_new_user function to handle both profiles
*/

-- Update handle_new_user function to create customer/partner records
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
      business_type,
      contact_person,
      business_address,
      phone,
      website_url
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'business_type', ''),
      COALESCE(NEW.raw_user_meta_data->>'contact_person', ''),
      COALESCE(NEW.raw_user_meta_data->>'business_address', ''),
      COALESCE(NEW.raw_user_meta_data->>'phone', ''),
      COALESCE(NEW.raw_user_meta_data->>'website_url', '')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
