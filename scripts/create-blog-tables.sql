-- Blog posts table with SEO fields
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,

  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,

  -- Status and Publishing
  status TEXT NOT NULL DEFAULT 'draft', -- draft, published
  published_at TIMESTAMP WITH TIME ZONE,

  -- Author
  author_name TEXT NOT NULL DEFAULT 'Moto Kurye Gelsin',
  author_email TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- SEO optimization
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = TRUE;

-- RLS Policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Authenticated users can manage all posts (for admin)
CREATE POLICY "Authenticated users can insert"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE
  ON blog_posts FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
