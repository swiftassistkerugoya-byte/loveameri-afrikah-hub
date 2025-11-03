-- Allow anyone to view company settings (public information)
CREATE POLICY "Anyone can view company settings"
ON company_settings
FOR SELECT
USING (true);