-- Fix RLS policies for assignments table
-- This script ensures students can view published assignments for their enrolled courses

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Teachers can manage assignments for their courses" ON assignments;
DROP POLICY IF EXISTS "Students can view published assignments for enrolled courses" ON assignments;
DROP POLICY IF EXISTS "Admins can manage all assignments" ON assignments;

-- Create new policies for assignments table
-- Allow teachers to manage assignments for their courses
CREATE POLICY "Teachers can manage assignments for their courses" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = assignments.course_id AND teacher_id = auth.uid()
    )
  );

-- Allow students to view published assignments for enrolled courses
CREATE POLICY "Students can view published assignments for enrolled courses" ON assignments
  FOR SELECT USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE course_id = assignments.course_id 
      AND student_id = auth.uid() 
      AND status = 'active'
    )
  );

-- Allow admins to manage all assignments
CREATE POLICY "Admins can manage all assignments" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure RLS is enabled on the assignments table
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'assignments';
