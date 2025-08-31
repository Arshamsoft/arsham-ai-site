-- Insert sample categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('برنامه‌نویسی', 'programming', 'آموزش‌های برنامه‌نویسی و توسعه نرم‌افزار', '#3B82F6'),
('طراحی وب', 'web-design', 'طراحی رابط کاربری و تجربه کاربری', '#10B981'),
('فرانت‌اند', 'frontend', 'توسعه فرانت‌اند با React، Vue و Angular', '#F59E0B'),
('بک‌اند', 'backend', 'توسعه بک‌اند و API ها', '#EF4444'),
('دیتابیس', 'database', 'طراحی و مدیریت پایگاه داده', '#8B5CF6'),
('DevOps', 'devops', 'استقرار و مدیریت سرور', '#06B6D4')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample pages
INSERT INTO public.pages (title, slug, content, status, author_id) VALUES
('درباره ما', 'about', 'این صفحه درباره ما است...', 'published', (SELECT id FROM auth.users LIMIT 1)),
('تماس با ما', 'contact', 'راه‌های تماس با ما...', 'published', (SELECT id FROM auth.users LIMIT 1)),
('حریم خصوصی', 'privacy', 'سیاست حریم خصوصی...', 'published', (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT (slug) DO NOTHING;
