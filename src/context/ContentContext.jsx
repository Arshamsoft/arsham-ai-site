import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

const ContentContext = createContext({ content: {}, loading: true });

// محتوای سایت (هدر، فوتر، صفحه اصلی و...) فقط یک بار از بک‌اند گرفته می‌شه
export function ContentProvider({ children }) {
  const [state, setState] = useState({ content: {}, loading: true });

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

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
