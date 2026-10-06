import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import { textOf } from '../lib/helpers';

// مقدار اولیه؛ از «ویرایشگر زنده‌ی سایت» در پنل ادمین قابل تغییره
export const DEFAULT_PHONE = '09333807359';
const PERSIAN = /[\u0600-\u06FF]/;

// منو و اطلاعات تماس: همه از پنل ادمین؛ زبان‌های دیگه از ترجمه‌ی ذخیره‌شده
export default function useSiteLabels() {
  const { content } = useContent();
  const { t, pick, lang } = useI18n();
  const cms = content.header || {};
  const nav = (key) => (lang === 'fa' && textOf(cms[key]) ? textOf(cms[key]) : t(`nav.${key}`));
  const localized = (field, fallbackKey) => {
    if (!textOf(cms[field])) return t(fallbackKey);
    const value = pick({ ...cms, [field]: textOf(cms[field]) }, field);
    return lang !== 'fa' && PERSIAN.test(value) ? t(fallbackKey) : value;
  };
  return {
    nav,
    phone: textOf(cms.phone) || textOf((content.contactInfo || {}).phone) || DEFAULT_PHONE,
    email: textOf(cms.email) || textOf((content.contactInfo || {}).email) || '',
    hours: localized('hours', 'info.hours'),
    location: localized('location', 'info.location'),
  };
}
