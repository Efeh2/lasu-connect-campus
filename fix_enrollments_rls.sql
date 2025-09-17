-- Fix RLS policies for enrollments table
-- This script fixes the row-level security policies to allow students to enroll in courses

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Students can view their enrollments" ON enrollments;
DROP POLICY IF EXISTS "Teachers can view enrollments for their courses" ON enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON enrollments;
DROP POLICY IF EXISTS "Students can enroll in courses" ON enrollments;
DROP POLICY IF EXISTS "Students can drop their enrollments" ON enrollments;

-- Create new policies for enrollments table
-- Allow students to view their own enrollments
CREATE POLICY "Students can view their enrollments" ON enrollments
  FOR SELECT USING (student_id = auth.uid());

-- Allow students to enroll in courses
CREATE POLICY "Students can enroll in courses" ON enrollments
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- Allow students to update their own enrollments (for dropping courses)
CREATE POLICY "Students can update their enrollments" ON enrollments
  FOR UPDATE USING (student_id = auth.uid());

-- Allow teachers to view enrollments for their courses
CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = enrollments.course_id AND teacher_id = auth.uid()
    )
  );

-- Allow teachers to update enrollments for their courses (for administrative purposes)
CREATE POLICY "Teachers can update enrollments for their courses" ON enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = enrollments.course_id AND teacher_id = auth.uid()
    )
  );

-- Allow admins to manage all enrollments
CREATE POLICY "Admins can manage all enrollments" ON enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure RLS is enabled on the enrollments table
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'enrollments';
