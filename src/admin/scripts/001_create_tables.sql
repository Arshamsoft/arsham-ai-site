-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "categories_delete_admin" ON public.categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "posts_select_published" ON public.posts FOR SELECT TO PUBLIC USING (status = 'published');
CREATE POLICY "posts_select_own" ON public.posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "posts_insert_own" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update_own" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_delete_own" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Create pages table for static pages
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on pages
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Pages policies
CREATE POLICY "pages_select_published" ON public.pages FOR SELECT TO PUBLIC USING (status = 'published');
CREATE POLICY "pages_select_own" ON public.pages FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "pages_insert_own" ON public.pages FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "pages_update_own" ON public.pages FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "pages_delete_own" ON public.pages FOR DELETE USING (auth.uid() = author_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'trash')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Comments policies
CREATE POLICY "comments_select_approved" ON public.comments FOR SELECT TO PUBLIC USING (status = 'approved');
CREATE POLICY "comments_insert_public" ON public.comments FOR INSERT TO PUBLIC WITH CHECK (true);
CREATE POLICY "comments_update_admin" ON public.comments FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "comments_delete_admin" ON public.comments FOR DELETE USING (auth.uid() IS NOT NULL);
