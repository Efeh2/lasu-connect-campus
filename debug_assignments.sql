-- Debug script to check assignments and enrollments
-- Run this to see what's happening with the data

-- 1. Check if there are any courses
SELECT 'COURSES' as table_name, COUNT(*) as count FROM courses;

-- 2. Check if there are any assignments
SELECT 'ASSIGNMENTS' as table_name, COUNT(*) as count FROM assignments;

-- 3. Check if there are any enrollments
SELECT 'ENROLLMENTS' as table_name, COUNT(*) as count FROM enrollments;

-- 4. Check published assignments
SELECT 'PUBLISHED_ASSIGNMENTS' as table_name, COUNT(*) as count 
FROM assignments 
WHERE is_published = true;

-- 5. Check active enrollments
SELECT 'ACTIVE_ENROLLMENTS' as table_name, COUNT(*) as count 
FROM enrollments 
WHERE status = 'active';

-- 6. Get sample data for debugging
SELECT 
  'SAMPLE_COURSES' as info,
  id,
  title,
  code,
  is_active,
  teacher_id
FROM courses 
LIMIT 5;

SELECT 
  'SAMPLE_ASSIGNMENTS' as info,
  id,
  title,
  course_id,
  is_published,
  created_at
FROM assignments 
LIMIT 5;

SELECT 
  'SAMPLE_ENROLLMENTS' as info,
  id,
  student_id,
  course_id,
  status,
  enrolled_at
FROM enrollments 
LIMIT 5;

-- 7. Check if a specific student has enrollments
-- Replace 'STUDENT_ID_HERE' with the actual student ID
-- SELECT 
--   'STUDENT_ENROLLMENTS' as info,
--   e.id as enrollment_id,
--   e.course_id,
--   e.status,
--   c.title as course_title,
--   c.code as course_code
-- FROM enrollments e
-- JOIN courses c ON e.course_id = c.id
-- WHERE e.student_id = 'STUDENT_ID_HERE';

-- 8. Check if there are assignments for enrolled courses
-- SELECT 
--   'ASSIGNMENTS_FOR_ENROLLED_COURSES' as info,
--   a.id as assignment_id,
--   a.title,
--   a.course_id,
--   a.is_published,
--   c.title as course_title,
--   c.code as course_code
-- FROM assignments a
-- JOIN courses c ON a.course_id = c.id
-- WHERE a.is_published = true
-- AND a.course_id IN (
--   SELECT course_id 
--   FROM enrollments 
--   WHERE status = 'active'
-- );
