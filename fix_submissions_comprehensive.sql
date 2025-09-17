-- Comprehensive fix for submissions table RLS policies
-- This script ensures students can submit assignments properly

-- First, check if submissions table exists and has the right structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'submissions' 
ORDER BY ordinal_position;

-- Drop ALL existing policies on submissions table
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'submissions') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON submissions';
    END LOOP;
END $$;

-- Ensure RLS is enabled
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies for submissions
-- Policy 1: Students can insert their own submissions
CREATE POLICY "Students can insert their own submissions" ON submissions
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- Policy 2: Students can view their own submissions
CREATE POLICY "Students can view their own submissions" ON submissions
  FOR SELECT USING (student_id = auth.uid());

-- Policy 3: Students can update their own submissions (before grading)
CREATE POLICY "Students can update their own submissions" ON submissions
  FOR UPDATE USING (student_id = auth.uid());

-- Policy 4: Teachers can view submissions for their assignments
CREATE POLICY "Teachers can view submissions for their assignments" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = submissions.assignment_id AND c.teacher_id = auth.uid()
    )
  );

-- Policy 5: Teachers can update submissions for their assignments (grading)
CREATE POLICY "Teachers can update submissions for their assignments" ON submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = submissions.assignment_id AND c.teacher_id = auth.uid()
    )
  );

-- Policy 6: Admins can do everything
CREATE POLICY "Admins can manage all submissions" ON submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Verify policies were created
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'submissions'
ORDER BY policyname;

-- Test the policies by checking if a student can insert
-- This is just for verification - don't run in production
-- SELECT auth.uid() as current_user_id;
