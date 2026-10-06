import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';
import { adminOrigins, isPreview } from '../lib/preview';
import { useI18n } from './LanguageContext';

const ContentContext = createContext({ content: {}, loading: true });

// محتوای سایت (هدر، فوتر، صفحه اصلی و...) فقط یک بار از بک‌اند گرفته می‌شه.
// داخل ویرایشگر زنده‌ی پنل ادمین، پیش‌نویس‌ها بلافاصله روی همین صفحه نمایش داده می‌شن.
export function ContentProvider({ children }) {
  const [state, setState] = useState({ content: {}, loading: true });
  const [draft, setDraft] = useState(null);
  const { setTextOverrides } = useI18n();

  useEffect(() => {
    let alive = true;
    api
      .get('/content')
      .then((res) => {
        const data = res && res.data && typeof res.data === 'object' ? res.data : {};
        if (alive) setState({ content: data, loading: false });
      })
      .catch(() => {
        if (alive) setState({ content: {}, loading: false });
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!isPreview()) return undefined;
    const allowed = adminOrigins();
    const onMessage = (event) => {
      if (!allowed.includes(event.origin)) return;
      const data = event.data || {};
      if (data.type === 'arshamai:preview' && data.content && typeof data.content === 'object') setDraft(data.content);
    };
    window.addEventListener('message', onMessage);
    allowed.forEach((origin) => {
      try {
        window.parent.postMessage({ type: 'arshamai:ready' }, origin);
      } catch (e) {
        // فقط برای ادمین مجاز
      }
    });
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const value = draft ? { content: { ...state.content, ...draft }, loading: false } : state;

  useEffect(() => {
    setTextOverrides(Array.isArray(value.content.texts) ? value.content.texts : []);
  }, [value.content.texts, setTextOverrides]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
