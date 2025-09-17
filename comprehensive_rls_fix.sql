-- Comprehensive RLS Fix for LASU Connect Campus
-- This script fixes all RLS policies to ensure proper access control

-- ==============================================
-- 1. FIX ENROLLMENTS TABLE RLS POLICIES
-- ==============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Students can view their enrollments" ON enrollments;
DROP POLICY IF EXISTS "Teachers can view enrollments for their courses" ON enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON enrollments;
DROP POLICY IF EXISTS "Students can enroll in courses" ON enrollments;
DROP POLICY IF EXISTS "Students can update their enrollments" ON enrollments;

-- Create new policies for enrollments
CREATE POLICY "Students can view their enrollments" ON enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll in courses" ON enrollments
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their enrollments" ON enrollments
  FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = enrollments.course_id AND teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can update enrollments for their courses" ON enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = enrollments.course_id AND teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all enrollments" ON enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ==============================================
-- 2. FIX ASSIGNMENTS TABLE RLS POLICIES
-- ==============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Teachers can manage assignments for their courses" ON assignments;
DROP POLICY IF EXISTS "Students can view published assignments for enrolled courses" ON assignments;
DROP POLICY IF EXISTS "Admins can manage all assignments" ON assignments;

-- Create new policies for assignments
CREATE POLICY "Teachers can manage assignments for their courses" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = assignments.course_id AND teacher_id = auth.uid()
    )
  );

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

CREATE POLICY "Admins can manage all assignments" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ==============================================
-- 3. FIX SUBMISSIONS TABLE RLS POLICIES
-- ==============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Students can manage their submissions" ON submissions;
DROP POLICY IF EXISTS "Teachers can view and grade submissions for their assignments" ON submissions;
DROP POLICY IF EXISTS "Admins can manage all submissions" ON submissions;

-- Create new policies for submissions
CREATE POLICY "Students can manage their submissions" ON submissions
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view and grade submissions for their assignments" ON submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = submissions.assignment_id AND c.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all submissions" ON submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ==============================================
-- 4. FIX COURSES TABLE RLS POLICIES
-- ==============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Teachers can manage their courses" ON courses;
DROP POLICY IF EXISTS "Students can view active courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage all courses" ON courses;

-- Create new policies for courses
CREATE POLICY "Teachers can manage their courses" ON courses
  FOR ALL USING (teacher_id = auth.uid());

CREATE POLICY "Students can view active courses" ON courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ==============================================
-- 5. ENABLE RLS ON ALL TABLES
-- ==============================================

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 6. VERIFY POLICIES WERE CREATED
-- ==============================================

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
WHERE tablename IN ('enrollments', 'assignments', 'submissions', 'courses')
ORDER BY tablename, policyname;
