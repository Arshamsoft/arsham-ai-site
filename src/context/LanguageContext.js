import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LANGUAGES, LANGUAGE_BY_CODE } from '../i18n/languages';
import { MESSAGES } from '../i18n/messages';
import { translateContent, translateContentHtml } from '../i18n/localTranslate';

const STORAGE_KEY = 'arshamai_lang';

function savedLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGE_BY_CODE[saved]) return saved;
  } catch (e) {
    // پیش‌فرض: فارسی
  }
  return 'fa';
}

// زبان و جهت صفحه (راست‌به‌چپ یا چپ‌به‌راست) روی خود <html>
export function applyDocumentLanguage(code) {
  if (typeof document === 'undefined') return;
  const language = LANGUAGE_BY_CODE[code] || LANGUAGE_BY_CODE.fa;
  document.documentElement.setAttribute('lang', language.htmlLang);
  document.documentElement.setAttribute('dir', language.dir);
}

const START = typeof window === 'undefined' ? 'fa' : savedLanguage();
applyDocumentLanguage(START);

function fill(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (vars[key] != null ? String(vars[key]) : match));
}

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(START);

  const setLang = useCallback((code) => {
    if (!LANGUAGE_BY_CODE[code]) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      // فقط برای همین بازدید عوض می‌شه
    }
    applyDocumentLanguage(code);
    setLangState(code);
  }, []);

  const value = useMemo(() => {
    const meta = LANGUAGE_BY_CODE[lang];
    const dictionary = MESSAGES[lang] || MESSAGES.fa;
    const t = (key, vars) => fill(dictionary[key] ?? MESSAGES.fa[key] ?? key, vars);
    const number = (input) => {
      const n = Number(input || 0);
      return Number.isFinite(n) ? n.toLocaleString(meta.locale) : '';
    };
    const date = (input) => {
      if (!input) return '';
      const d = new Date(input);
      if (Number.isNaN(d.getTime())) return '';
      try {
        return d.toLocaleDateString(meta.locale, { year: 'numeric', month: 'long', day: 'numeric' });
      } catch (e) {
        return d.toLocaleDateString();
      }
    };
    return {
      lang,
      setLang,
      meta,
      languages: LANGUAGES,
      isRtl: meta.dir === 'rtl',
      t,
      tr: (text) => translateContent(lang, text),
      trHtml: (html) => translateContentHtml(lang, html),
      number,
      date,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used inside LanguageProvider');
  return context;
}
