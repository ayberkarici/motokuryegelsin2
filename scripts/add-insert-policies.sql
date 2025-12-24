-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on districts" ON districts;
DROP POLICY IF EXISTS "Allow public read access on neighborhoods" ON neighborhoods;

-- Create policies for both read and write access
CREATE POLICY "Allow public read access on districts"
  ON districts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on districts"
  ON districts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on districts"
  ON districts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access on neighborhoods"
  ON neighborhoods FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on neighborhoods"
  ON neighborhoods FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on neighborhoods"
  ON neighborhoods FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
