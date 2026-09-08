-- 个人主页背景图。若「我的主页」封面上传失败，在 Supabase SQL Editor 执行一次。
alter table public.profiles
  add column if not exists cover_url text;
