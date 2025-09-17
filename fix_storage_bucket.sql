-- Fix Supabase Storage bucket for assignments
-- This script creates the assignments bucket and sets proper policies

-- Create the assignments bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'assignments',
  'assignments', 
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for assignments bucket
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload assignment files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'assignments' AND 
  auth.role() = 'authenticated'
);

-- Allow users to view their own uploaded files
CREATE POLICY "Users can view their own assignment files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'assignments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own files
CREATE POLICY "Users can update their own assignment files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'assignments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own assignment files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'assignments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'assignments';
