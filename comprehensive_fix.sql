-- Comprehensive fix for profile creation issues
-- Run this in your Supabase SQL Editor

-- 1. First, let's check if the trigger exists and recreate it properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- 2. Create a more robust trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table with proper error handling
  INSERT INTO profiles (
    id, 
    first_name, 
    last_name, 
    email, 
    role, 
    level, 
    student_id, 
    phone, 
    department
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'level', NULL),
    COALESCE(NEW.raw_user_meta_data->>'student_id', NULL),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    'Computer Science'
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Fix RLS policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow trigger to insert profiles" ON profiles;

-- Create new policies
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

-- Allow the trigger function to insert profiles (bypass RLS)
CREATE POLICY "Allow trigger to insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- 5. Create a function to manually create profiles for existing users
CREATE OR REPLACE FUNCTION create_profile_for_existing_user(user_id UUID)
RETURNS VOID AS $$
DECLARE
  user_record auth.users%ROWTYPE;
BEGIN
  -- Get user data from auth.users
  SELECT * INTO user_record FROM auth.users WHERE id = user_id;
  
  IF user_record.id IS NOT NULL THEN
    -- Insert profile if it doesn't exist
    INSERT INTO profiles (
      id, 
      first_name, 
      last_name, 
      email, 
      role, 
      level, 
      student_id, 
      phone, 
      department
    )
    VALUES (
      user_record.id,
      COALESCE(user_record.raw_user_meta_data->>'first_name', ''),
      COALESCE(user_record.raw_user_meta_data->>'last_name', ''),
      user_record.email,
      COALESCE(user_record.raw_user_meta_data->>'role', 'student'),
      COALESCE(user_record.raw_user_meta_data->>'level', NULL),
      COALESCE(user_record.raw_user_meta_data->>'student_id', NULL),
      COALESCE(user_record.raw_user_meta_data->>'phone', NULL),
      'Computer Science'
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create profiles for any existing users who don't have them
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT au.id, au.email, au.raw_user_meta_data
    FROM auth.users au
    LEFT JOIN profiles p ON au.id = p.id
    WHERE p.id IS NULL
  LOOP
    PERFORM create_profile_for_existing_user(user_record.id);
  END LOOP;
END $$;
