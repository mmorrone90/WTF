/*
  # Create Customer and Partner Tables
  
  1. New Tables
    - customers
      - id (uuid, foreign key to auth.users)
      - full_name (text)
      - phone (text)
      - shipping_address (jsonb)
      - preferences (jsonb)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - partners
      - id (uuid, foreign key to auth.users)
      - business_name (text)
      - business_type (text)
      - contact_person (text)
      - business_address (text)
      - phone (text)
      - website_url (text)
      - social_links (jsonb)
      - business_details (jsonb)
      - verification_status (text)
      - created_at (timestamp)
      - updated_at (timestamp)
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  shipping_address JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  business_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  website_url TEXT,
  social_links JSONB DEFAULT '{}',
  business_details JSONB DEFAULT '{}',
  verification_status TEXT DEFAULT 'pending' 
    CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
