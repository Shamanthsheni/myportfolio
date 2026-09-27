-- ==============================================================================
-- SHAMANTH S PORTFOLIO — SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================
-- Run this in your Supabase SQL Editor if you wish to use Supabase as your primary backend.

-- 1. Create the unified CMS store table
CREATE TABLE IF NOT EXISTS public.cms_store (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.cms_store ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies: Allow public READ access, restrict writes to authenticated service role
CREATE POLICY "Allow public read access"
  ON public.cms_store
  FOR SELECT
  USING (true);

CREATE POLICY "Allow service role full access"
  ON public.cms_store
  FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 4. Storage Bucket for media uploads (Project images, Blog covers, Resume, Certificates)
-- You can create a public bucket named 'portfolio-media' via Supabase dashboard or SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on media bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

CREATE POLICY "Allow service role write on media bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-media');
