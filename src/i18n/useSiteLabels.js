import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import { textOf } from '../lib/helpers';

export const DEFAULT_PHONE = '09333807359';

// برچسب‌های منو و اطلاعات تماس: فارسی از پنل ادمین، بقیه‌ی زبان‌ها از ترجمه‌ها
export default function useSiteLabels() {
  const { content } = useContent();
  const { t, tr, lang } = useI18n();
  const cms = content.header || {};
  const nav = (key) => (lang === 'fa' && textOf(cms[key]) ? textOf(cms[key]) : t(`nav.${key}`));
  return {
    nav,
    phone: textOf(cms.phone) || DEFAULT_PHONE,
    hours: textOf(cms.hours) ? tr(textOf(cms.hours)) : t('info.hours'),
    location: textOf(cms.location) ? tr(textOf(cms.location)) : t('info.location'),
  };
}
