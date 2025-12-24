-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set storage policy to allow authenticated users to upload
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow public to view images
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');
