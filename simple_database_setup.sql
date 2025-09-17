-- Simple Database Setup for LASU Connect Campus
-- This version doesn't use triggers to avoid 500 errors

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  level TEXT, -- For students: 100, 200, 300, 400, 500
  student_id TEXT UNIQUE, -- For students only
  phone TEXT,
  avatar_url TEXT,
  is_online BOOLEAN DEFAULT false,
  department TEXT DEFAULT 'Computer Science',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE, -- e.g., CSC 401
  description TEXT,
  level TEXT NOT NULL, -- 100, 200, 300, 400, 500
  credits INTEGER DEFAULT 3,
  teacher_id UUID REFERENCES profiles(id) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
  UNIQUE(student_id, course_id)
);

-- 4. Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_points INTEGER DEFAULT 100,
  assignment_type TEXT DEFAULT 'homework' CHECK (assignment_type IN ('homework', 'quiz', 'exam', 'project')),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id) NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  grade INTEGER,
  feedback TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
  UNIQUE(assignment_id, student_id)
);

-- 6. Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  recipient_id UUID REFERENCES profiles(id) NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  message_type TEXT DEFAULT 'general' CHECK (message_type IN ('general', 'assignment', 'announcement')),
  related_assignment_id UUID REFERENCES assignments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create study_groups table
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id),
  level TEXT NOT NULL,
  max_members INTEGER DEFAULT 10,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create study_group_members table
CREATE TABLE IF NOT EXISTS study_group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES study_groups(id) NOT NULL,
  member_id UUID REFERENCES profiles(id) NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator')),
  UNIQUE(group_id, member_id)
);

-- 9. Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES profiles(id) NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('assignment', 'grade', 'message', 'announcement', 'system')),
  is_read BOOLEAN DEFAULT false,
  related_id TEXT, -- Can reference any related entity
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create basic RLS policies for courses
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Teachers can manage their own courses" ON courses
  FOR ALL USING (teacher_id = auth.uid());

-- Create basic RLS policies for enrollments
CREATE POLICY "Students can view their own enrollments" ON enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = course_id AND teacher_id = auth.uid()
    )
  );

-- Create basic RLS policies for assignments
CREATE POLICY "Anyone can view published assignments" ON assignments
  FOR SELECT USING (is_published = true);

CREATE POLICY "Teachers can manage assignments for their courses" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = course_id AND teacher_id = auth.uid()
    )
  );

-- Create basic RLS policies for submissions
CREATE POLICY "Students can view their own submissions" ON submissions
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can insert their own submissions" ON submissions
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can view submissions for their assignments" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assignments
      JOIN courses ON assignments.course_id = courses.id
      WHERE assignments.id = assignment_id AND courses.teacher_id = auth.uid()
    )
  );

-- Create basic RLS policies for messages
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Create basic RLS policies for study groups
CREATE POLICY "Anyone can view active study groups" ON study_groups
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create study groups" ON study_groups
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Create basic RLS policies for study group members
CREATE POLICY "Members can view their group memberships" ON study_group_members
  FOR SELECT USING (member_id = auth.uid());

CREATE POLICY "Group creators can manage members" ON study_group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM study_groups
      WHERE id = group_id AND created_by = auth.uid()
    )
  );

-- Create basic RLS policies for consultations
CREATE POLICY "Users can view their own consultations" ON consultations
  FOR SELECT USING (teacher_id = auth.uid() OR student_id = auth.uid());

CREATE POLICY "Users can create consultations" ON consultations
  FOR INSERT WITH CHECK (teacher_id = auth.uid() OR student_id = auth.uid());

-- Create basic RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());
