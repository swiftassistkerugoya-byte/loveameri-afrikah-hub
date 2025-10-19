-- Drop trigger first, then function, then recreate with proper security
DROP TRIGGER IF EXISTS blog_posts_generate_slug ON public.blog_posts;
DROP FUNCTION IF EXISTS generate_slug_from_title() CASCADE;

-- Recreate function with proper search_path
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER blog_posts_generate_slug
BEFORE INSERT ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION generate_slug_from_title();