-- Enable Row Level Security on all tables
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;

-- Devices table policies
-- Anyone can read active devices
CREATE POLICY "Anyone can read active devices" 
ON devices FOR SELECT 
USING (status = 'Active');

-- Only authenticated users can insert devices
CREATE POLICY "Authenticated users can insert devices" 
ON devices FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Only admins can update devices
CREATE POLICY "Admins can update devices" 
ON devices FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Only admins can delete devices
CREATE POLICY "Admins can delete devices" 
ON devices FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Users table policies
-- Users can read their own data
CREATE POLICY "Users can read own data" 
ON users FOR SELECT 
TO authenticated 
USING (id = auth.uid());

-- Admins can read all user data
CREATE POLICY "Admins can read all user data" 
ON users FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Only admins can insert users
CREATE POLICY "Admins can insert users" 
ON users FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Users can update their own data
CREATE POLICY "Users can update own data" 
ON users FOR UPDATE 
TO authenticated 
USING (id = auth.uid());

-- Admins can update any user
CREATE POLICY "Admins can update any user" 
ON users FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Only admins can delete users
CREATE POLICY "Admins can delete users" 
ON users FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Valuations table policies
-- Users can read their own valuations
CREATE POLICY "Users can read own valuations" 
ON valuations FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Admins can read all valuations
CREATE POLICY "Admins can read all valuations" 
ON valuations FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Users can insert their own valuations
CREATE POLICY "Users can insert own valuations" 
ON valuations FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Users can update their own valuations
CREATE POLICY "Users can update own valuations" 
ON valuations FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid());

-- Admins can update any valuation
CREATE POLICY "Admins can update any valuation" 
ON valuations FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- Only admins can delete valuations
CREATE POLICY "Admins can delete valuations" 
ON valuations FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);
