import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LANGUAGES, LANGUAGE_BY_CODE } from '../i18n/languages';
import { MESSAGES } from '../i18n/messages';
import { EXTRA_MESSAGES } from '../i18n/messagesExtra';
import { translateContent, translateContentHtml } from '../i18n/localTranslate';

const STORAGE_KEY = 'arshamai_lang';

function savedLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGE_BY_CODE[stored]) return stored;
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
    const dictionary = { ...(MESSAGES[lang] || MESSAGES.fa), ...(EXTRA_MESSAGES[lang] || EXTRA_MESSAGES.fa) };
    const fallback = { ...MESSAGES.fa, ...EXTRA_MESSAGES.fa };
    const t = (key, vars) => fill(dictionary[key] ?? fallback[key] ?? key, vars);

    // ترجمه‌ای که در پنل ادمین برای همین مورد ذخیره شده (اولویت اول)
    const stored = (entity, field) => {
      const v = entity && entity.translations && entity.translations[lang] && entity.translations[lang][field];
      return typeof v === 'string' && v.trim() ? v : '';
    };
    // فارسی → خود متن؛ زبان‌های دیگه → ترجمه‌ی ذخیره‌شده، وگرنه ترجمه‌ی محلی سایت
    const pick = (entity, field) => {
      if (!entity) return '';
      if (lang === 'fa') return entity[field];
      return stored(entity, field) || translateContent(lang, entity[field]);
    };
    const pickHtml = (entity, field) => {
      if (!entity) return '';
      if (lang === 'fa') return entity[field];
      return stored(entity, field) || translateContentHtml(lang, entity[field]);
    };

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
      pick,
      pickHtml,
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
