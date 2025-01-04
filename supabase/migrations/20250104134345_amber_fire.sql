/*
  # Create RLS Policies for Customers and Partners Tables
  
  1. Enable RLS
    - Enable RLS on customers table
    - Enable RLS on partners table
    
  2. Customer Policies
    - Select: Users can read their own data
    - Insert: Authenticated users can insert their own data
    - Update: Users can update their own data
    - Delete: Users can delete their own data
    
  3. Partner Policies
    - Select: Users can read their own data
    - Insert: Authenticated users can insert their own data
    - Update: Users can update their own data
    - Delete: Users can delete their own data
*/

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Customers Policies
CREATE POLICY "Customers can view own data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Customers can insert own data"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Customers can update own data"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Customers can delete own data"
  ON customers
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Partners Policies
CREATE POLICY "Partners can view own data"
  ON partners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Partners can insert own data"
  ON partners
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Partners can update own data"
  ON partners
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Partners can delete own data"
  ON partners
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);