# Supabase Setup Guide

## 🚨 Current Issue

You're getting a `ERR_NAME_NOT_RESOLVED` error because your Supabase environment variables are not configured.

## 📋 Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `lasu-connect-campus` (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be created (this takes a few minutes)

### 2. Get Your Credentials

1. Once your project is ready, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Create Environment File

Create a `.env` file in your project root directory with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

**Replace the values with your actual credentials from step 2.**

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire SQL from `DATABASE_SCHEMA.md` file
3. Paste it into the SQL editor
4. Click "Run" to execute the schema

### 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:8080` (for development)
3. Under **Redirect URLs**, add: `http://localhost:8080/**`
4. Enable **Email** authentication
5. Optionally configure email templates

### 6. Set Up Storage (for file uploads)

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Name it: `assignments`
4. Make it **Public** (so students can access submitted files)
5. Click **Create bucket**

### 7. Restart Your Development Server

After creating the `.env` file:

```bash
bun run dev
```

## ✅ Verification

Once set up correctly, you should see:

- No more `ERR_NAME_NOT_RESOLVED` errors
- Successful signup/login attempts
- Database tables created in Supabase dashboard
- File uploads working for assignments

## 🔧 Troubleshooting

### If you still get errors:

1. **Check your `.env` file** - Make sure it's in the project root
2. **Verify credentials** - Double-check the URL and key from Supabase
3. **Restart the server** - After adding environment variables
4. **Check console** - Look for helpful error messages

### Common Issues:

- **Wrong URL format**: Should be `https://project-id.supabase.co`
- **Missing .env file**: Must be in the same directory as `package.json`
- **Wrong key**: Use the `anon` key, not the `service_role` key
- **CORS issues**: Make sure your redirect URLs are configured

## 📞 Need Help?

If you're still having issues, check:

1. Supabase project is active and running
2. Environment variables are correctly set
3. Database schema has been applied
4. Authentication is enabled
5. Storage bucket is created and public
