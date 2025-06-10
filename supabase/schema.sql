-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  specs JSONB DEFAULT '{}',
  base_value NUMERIC NOT NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for additional user data beyond auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'User',
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create valuations table
CREATE TABLE IF NOT EXISTS valuations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id),
  user_id UUID REFERENCES users(id),
  value NUMERIC NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_devices_type ON devices(type);
CREATE INDEX IF NOT EXISTS idx_devices_brand ON devices(brand);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_valuations_device_id ON valuations(device_id);
CREATE INDEX IF NOT EXISTS idx_valuations_user_id ON valuations(user_id);

-- Enable Row Level Security
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for devices
CREATE POLICY "Anyone can read active devices" 
ON devices FOR SELECT 
USING (status = 'Active');

CREATE POLICY "Admins can manage devices" 
ON devices 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- RLS Policies for users
CREATE POLICY "Users can read own data" 
ON users FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "Admins can read all user data" 
ON users FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

CREATE POLICY "Users can update own data" 
ON users FOR UPDATE 
USING (id = auth.uid());

CREATE POLICY "Admins can manage users" 
ON users 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

-- RLS Policies for valuations
CREATE POLICY "Users can read own valuations" 
ON valuations FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Admins can read all valuations" 
ON valuations FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);

CREATE POLICY "Users can insert own valuations" 
ON valuations FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage valuations" 
ON valuations 
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'Admin'
  )
);
