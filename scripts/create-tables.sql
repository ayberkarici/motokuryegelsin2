-- Create districts table
CREATE TABLE IF NOT EXISTS districts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  osm_id BIGINT NOT NULL UNIQUE,
  bbox JSONB NOT NULL,
  geometry JSONB NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  district_id UUID NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  osm_id BIGINT NOT NULL UNIQUE,
  bbox JSONB NOT NULL,
  geometry JSONB NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_district_neighborhood UNIQUE(district_id, name)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_districts_name ON districts(name);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_district_id ON neighborhoods(district_id);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_name ON neighborhoods(name);

-- Enable Row Level Security (RLS)
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on districts"
  ON districts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on neighborhoods"
  ON neighborhoods FOR SELECT
  TO public
  USING (true);

-- Optional: Add comments for documentation
COMMENT ON TABLE districts IS 'İstanbul ilçeleri ve coğrafi sınırları';
COMMENT ON TABLE neighborhoods IS 'İstanbul mahalleleri ve coğrafi sınırları';
