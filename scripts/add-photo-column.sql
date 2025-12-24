-- Add photo_url column to districts table
ALTER TABLE districts 
ADD COLUMN photo_url TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN districts.photo_url IS 'URL of the district hero image for landing page banner';

-- Optional: Add some sample photo URLs (Unsplash Istanbul photos - free to use)
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200' WHERE name = 'Kadıköy';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200' WHERE name = 'Beşiktaş';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200' WHERE name = 'Şişli';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=1200' WHERE name = 'Beyoğlu';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1200' WHERE name = 'Fatih';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200' WHERE name = 'Üsküdar';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1605084924271-6a8ae0655d1f?w=1200' WHERE name = 'Sarıyer';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200' WHERE name = 'Bakırköy';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200' WHERE name = 'Ataşehir';
UPDATE districts SET photo_url = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200' WHERE name = 'Ümraniye';

-- Default photo for districts without specific photo (Istanbul cityscape)
UPDATE districts 
SET photo_url = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200' 
WHERE photo_url IS NULL;

-- Verify the changes
SELECT name, photo_url FROM districts LIMIT 10;
