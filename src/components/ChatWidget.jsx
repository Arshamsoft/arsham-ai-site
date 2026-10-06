import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { telHref } from '../lib/helpers';
import { LogoMark } from './Logo';

const STORE_KEY = 'arshamai_chat_v1';
const TIP_KEY = 'arshamai_chat_tip_closed';
const SUGGESTIONS = ['services', 'price', 'contact', 'portfolio'];

function loadMessages() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

// دستیار هوشمند: در فارسی پایین-راست، در زبان‌های چپ‌به‌راست پایین-چپ (همیشه سمت «شروع» خط)
export default function ChatWidget() {
  const { t, lang, pick, number } = useI18n();
  const { phone, hours, location } = useSiteLabels();
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(false);
  const [messages, setMessages] = useState(loadMessages);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    api
      .get('/settings/public/chatbot')
      .then((res) => setEnabled(res.data.enabled !== false))
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-30)));
    } catch (e) {
      // گفتگو فقط تا بستن صفحه نگه داشته می‌شه
    }
  }, [messages]);

  useEffect(() => {
    let closed = false;
    try {
      closed = window.sessionStorage.getItem(TIP_KEY) === '1';
    } catch (e) {
      closed = false;
    }
    if (closed) return undefined;
    const timer = window.setTimeout(() => setTip(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    setTip(false);
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    if (inputRef.current) inputRef.current.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [open, messages, busy]);

  const closeTip = () => {
    setTip(false);
    try {
      window.sessionStorage.setItem(TIP_KEY, '1');
    } catch (e) {
      // فقط برای همین صفحه بسته می‌شه
    }
  };

  // متن ساده‌ی یک پاسخ آماده، برای ادامه‌ی گفتگو با هوش مصنوعی
  const faqText = useCallback(
    ({ intent, data = {} }) => {
      const names = (list, field) => (list || []).map((item) => pick(item, field)).join('، ');
      switch (intent) {
        case 'services':
          return `${t('chat.a.services')} ${names(data.services, 'value')}`;
        case 'service':
          return t('chat.a.service', { name: pick(data.service || {}, 'value') });
        case 'price':
          return t('chat.a.price');
        case 'contact':
          return t('chat.a.contact', { phone: data.phone || phone });
        case 'hours':
          return hours;
        case 'location':
          return t('chat.a.location', { location });
        case 'portfolio':
          return `${t('chat.a.portfolio')} ${names(data.projects, 'title')}`;
        case 'support':
          return t('chat.a.support');
        case 'greet':
          return t('chat.a.greet');
        case 'thanks':
          return t('chat.a.thanks');
        default:
          return t('chat.a.unknown');
      }
    },
    [t, pick, phone, hours, location],
  );

  const send = async (raw) => {
    const value = String(raw || '').trim();
    if (!value || busy) return;
    const history = [...messages, { role: 'user', content: value }];
    setMessages(history);
    setText('');
    setBusy(true);
    try {
      const payload = history
        .filter((m) => !m.error)
        .map((m) => ({ role: m.role, content: m.faq ? faqText(m.faq) : m.content }))
        .filter((m) => m.content)
        .slice(-12);
      const res = await api.post('/chat', { lang, messages: payload });
      const reply =
        res.data.source === 'ai'
          ? { role: 'assistant', content: res.data.reply }
          : { role: 'assistant', faq: { intent: res.data.intent, data: res.data.data || {} } };
      setMessages((prev) => [...prev, reply]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', error: true }]);
    } finally {
      setBusy(false);
    }
  };

  if (!enabled) return null;

  const suggestions = (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((key) => (
        <button key={key} type="button" className="chip" onClick={() => send(t(`chat.suggest.${key}`))}>
          {t(`chat.suggest.${key}`)}
        </button>
      ))}
    </div>
  );

  const list = (items, field, extra) =>
    items && items.length ? (
      <ul className="mt-2 grid gap-1">
        {items.map((item, index) => (
          <li key={`${item[field]}-${index}`} className="flex gap-2">
            <span aria-hidden="true" className="text-turq">
              ◆
            </span>
            <span>
              {pick(item, field)}
              {extra ? extra(item) : null}
            </span>
          </li>
        ))}
      </ul>
    ) : null;

  const action = (to, label) => (
    <Link to={to} onClick={() => setOpen(false)} className="mt-3 inline-block font-semibold text-lapis underline-offset-4 hover:underline dark:text-turq">
      {label}
    </Link>
  );

  const renderFaq = ({ intent, data = {} }) => {
    switch (intent) {
      case 'services':
        return (
          <>
            <p>{t('chat.a.services')}</p>
            {list(data.services, 'value')}
            {action('/services', t('home.allServices'))}
          </>
        );
      case 'unknown':
        return (
          <>
            <p>{t('chat.a.unknown')}</p>
            <div className="mt-3">{suggestions}</div>
            {action('/support', t('chat.link.support'))}
          </>
        );
      case 'service':
        return (
          <>
            <p>{t('chat.a.service', { name: pick(data.service || {}, 'value') })}</p>
            {action('/support', t('chat.link.support'))}
          </>
        );
      case 'price':
        return (
          <>
            <p>{t('chat.a.price')}</p>
            {data.products && data.products.length ? (
              <>
                <p className="mt-3">{t('chat.a.prices')}</p>
                {list(data.products, 'title', (item) => ` — ${number(item.price)} ${t('shop.currency')}`)}
              </>
            ) : null}
            {action('/support', t('chat.link.support'))}
          </>
        );
      case 'contact':
        return (
          <>
            <p>{t('chat.a.contact', { phone: data.phone || phone })}</p>
            <p className="mt-1 text-sm opacity-80">{hours}</p>
            <a href={telHref(data.phone || phone)} className="mt-3 inline-flex items-center gap-2 font-semibold text-lapis dark:text-turq">
              <FaPhoneAlt aria-hidden="true" /> <span dir="ltr">{data.phone || phone}</span>
            </a>
          </>
        );
      case 'portfolio':
        return (
          <>
            <p>{t('chat.a.portfolio')}</p>
            {list(data.projects, 'title')}
            {action('/portfolio', t('nav.portfolio'))}
          </>
        );
      case 'support':
        return (
          <>
            <p>{t('chat.a.support')}</p>
            {action('/support', t('chat.link.support'))}
          </>
        );
      default:
        return <p>{faqText({ intent, data })}</p>;
    }
  };

  const hasUserMessage = messages.some((m) => m.role === 'user');

  return (
    <div className="chat-root">
      {open ? (
        <div id="chat-panel" role="dialog" aria-label={t('chat.title')} className="chat-panel menu-in">
          <div className="flex items-center justify-between gap-3 border-b border-line/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <LogoMark size={36} />
              <div>
                <p className="font-bold leading-6">{t('chat.title')}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-2 w-2 rounded-full bg-turq" aria-hidden="true" />
                  {t('chat.online')}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t('chat.close')} className="grid h-9 w-9 place-items-center text-muted transition hover:text-fg">
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div ref={listRef} className="chat-list" aria-live="polite">
            <div className="chat-bubble chat-bot">
              <p>{t('chat.welcome')}</p>
              {!hasUserMessage ? <div className="mt-3">{suggestions}</div> : null}
            </div>
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.role === 'user' ? 'chat-user' : 'chat-bot'}`}>
                {message.role === 'user' ? <p className="whitespace-pre-line">{message.content}</p> : null}
                {message.role === 'assistant' && message.error ? <p>{t('chat.error')}</p> : null}
                {message.role === 'assistant' && message.faq ? renderFaq(message.faq) : null}
                {message.role === 'assistant' && !message.faq && !message.error ? <p className="whitespace-pre-line">{message.content}</p> : null}
              </div>
            ))}
            {busy ? (
              <div className="chat-bubble chat-bot" aria-label={t('chat.thinking')}>
                <span className="chat-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            ) : null}
          </div>

          <form
            className="flex items-end gap-2 border-t border-line/60 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(text);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  send(text);
                }
              }}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.placeholder')}
              className="field max-h-32 min-h-[2.75rem] flex-1 resize-none py-2.5"
            />
            <button type="submit" disabled={busy || !text.trim()} aria-label={t('chat.send')} className="chat-send">
              <FaPaperPlane aria-hidden="true" className="rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      ) : null}

      {tip && !open ? (
        <div className="chat-tip" role="status">
          <button type="button" className="text-start" onClick={() => setOpen(true)}>
            {t('chat.tooltip')}
          </button>
          <button type="button" onClick={closeTip} aria-label={t('chat.dismiss')} className="grid h-6 w-6 flex-none place-items-center text-muted hover:text-fg">
            <FaTimes aria-hidden="true" className="text-xs" />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? t('chat.close') : t('chat.open')}
      >
        <span className="chat-pulse" aria-hidden="true" />
        <span className="chat-ring" aria-hidden="true" />
        {open ? <FaTimes aria-hidden="true" className="relative text-xl text-white" /> : <LogoMark size={46} className="chat-mark relative" />}
      </button>
    </div>
  );
}
