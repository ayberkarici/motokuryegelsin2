-- Create provinces table
CREATE TABLE IF NOT EXISTS provinces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  center_lng DOUBLE PRECISION NOT NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add province_id to districts table
ALTER TABLE districts ADD COLUMN IF NOT EXISTS province_id UUID REFERENCES provinces(id) ON DELETE CASCADE;

-- Insert Istanbul province
INSERT INTO provinces (name, center_lng, center_lat)
VALUES ('İstanbul', 28.9784, 41.0082)
ON CONFLICT (name) DO NOTHING;

-- Update all existing districts to belong to Istanbul
UPDATE districts
SET province_id = (SELECT id FROM provinces WHERE name = 'İstanbul')
WHERE province_id IS NULL;

-- Make province_id required after data migration
ALTER TABLE districts ALTER COLUMN province_id SET NOT NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_districts_province_id ON districts(province_id);

-- Add RLS policies for provinces table
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;

-- Allow public read access to provinces
CREATE POLICY "Public provinces are viewable by everyone"
ON provinces FOR SELECT
USING (true);

-- Allow authenticated users to insert/update/delete provinces
CREATE POLICY "Authenticated users can insert provinces"
ON provinces FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update provinces"
ON provinces FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete provinces"
ON provinces FOR DELETE
TO authenticated
USING (true);
