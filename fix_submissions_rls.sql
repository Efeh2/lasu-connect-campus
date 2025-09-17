-- Fix RLS policies for submissions table
-- This script ensures students can submit assignments and teachers can grade them

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Students can manage their submissions" ON submissions;
DROP POLICY IF EXISTS "Teachers can view and grade submissions for their assignments" ON submissions;
DROP POLICY IF EXISTS "Admins can manage all submissions" ON submissions;

-- Create new policies for submissions table
-- Allow students to manage their own submissions
CREATE POLICY "Students can manage their submissions" ON submissions
  FOR ALL USING (student_id = auth.uid());

-- Allow teachers to view and grade submissions for their assignments
CREATE POLICY "Teachers can view and grade submissions for their assignments" ON submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = submissions.assignment_id AND c.teacher_id = auth.uid()
    )
  );

-- Allow admins to manage all submissions
CREATE POLICY "Admins can manage all submissions" ON submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure RLS is enabled on the submissions table
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'submissions';
