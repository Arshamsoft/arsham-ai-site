import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useI18n } from '../context/LanguageContext';
import Button from './Button';

function isDarkNow() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

export default function ThemeToggle() {
  const { t } = useI18n();
  const [dark, setDark] = useState(isDarkNow);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      // ذخیره‌ی انتخاب ممکن نبود؛ تم فقط برای همین بازدید عوض می‌شه
    }
  };

  const label = dark ? t('ui.lightMode') : t('ui.darkMode');
  return (
    <Button
      variant="icon"
      onClick={toggle}
      aria-label={label}
      title={label}
      icon={dark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    />
  );
}
