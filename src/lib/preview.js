// حالت پیش‌نمایش زنده: سایت داخل ویرایشگر پنل ادمین (iframe) باز شده
const DEFAULT_ADMIN = 'https://arsham-admin-panel.vercel.app';

export function adminOrigins() {
  const extra = String(process.env.REACT_APP_ADMIN_URL || '')
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  return [DEFAULT_ADMIN, 'http://localhost:3000', ...extra];
}

export function isPreview() {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top && new URLSearchParams(window.location.search).has('preview');
  } catch (e) {
    return true;
  }
}

export function previewLang() {
  if (!isPreview()) return '';
  return new URLSearchParams(window.location.search).get('lang') || '';
}
