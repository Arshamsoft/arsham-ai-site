import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Button from './Button';

function isDarkNow() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

export default function ThemeToggle() {
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

  return (
    <Button
      variant="icon"
      onClick={toggle}
      aria-label={dark ? 'حالت روشن' : 'حالت تیره'}
      title={dark ? 'حالت روشن' : 'حالت تیره'}
      icon={dark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    />
  );
}
