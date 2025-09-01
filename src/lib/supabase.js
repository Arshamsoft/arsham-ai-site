

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kshugkqzagaoydkmbalz.supabase.co';
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaHVna3F6YWdhb3lka21iYWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NjQ4MjUsImV4cCI6MjA3MjA0MDgyNX0.YlWCfXVe4YKGUivGQH8zqnU7hvsEcKRZ9YpN_XiKak0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL یا ANON KEY پیدا نشد!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
