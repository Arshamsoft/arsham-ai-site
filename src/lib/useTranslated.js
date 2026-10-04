import { useEffect, useState } from 'react';
import { translateText } from '../utils/translateText';

// برای فارسی همون متن رو فوری نشون می‌ده؛ برای زبان‌های دیگه از translateText قبلی سایت استفاده می‌کنه
export default function useTranslated(text, lang) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    setOutput(text);
    if (!text || !lang || lang === 'fa') return undefined;

    let alive = true;
    Promise.resolve(translateText(text, lang))
      .then((result) => {
        if (alive && typeof result === 'string' && result.trim()) setOutput(result);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, [text, lang]);

  return output;
}
