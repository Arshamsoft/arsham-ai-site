import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../context/LanguageContext';
import { LogoMark, Wordmark } from './Logo';
import { starPoints } from './Star';
import { isPreview } from '../lib/preview';

const SEEN_KEY = 'arshamai_intro_seen';
const SHOW_MS = 1500;
const LEAVE_MS = 650;
const STAR = starPoints(100, 100, 96);

// فقط اولین بازدید در هر نشست، و نه برای کسانی که «کاهش حرکت» رو روشن کردن
export function shouldShowSplash() {
  if (typeof window === 'undefined' || isPreview()) return false;
  try {
    if (window.sessionStorage.getItem(SEEN_KEY)) return false;
  } catch (e) {
    return false;
  }
  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  return true;
}

export default function Splash() {
  const [phase, setPhase] = useState(() => (shouldShowSplash() ? 'show' : 'gone'));
  const active = useRef(phase === 'show');
  const { t } = useI18n();

  useEffect(() => {
    if (!active.current) return undefined;
    const root = document.documentElement;
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch (e) {
      // بدون sessionStorage هم کار می‌کنه، فقط ممکنه دوباره نمایش داده بشه
    }
    root.classList.add('splash-lock');
    const leave = window.setTimeout(() => setPhase((p) => (p === 'show' ? 'leave' : p)), SHOW_MS);
    const done = window.setTimeout(() => {
      setPhase('gone');
      root.classList.remove('splash-lock');
    }, SHOW_MS + LEAVE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
      root.classList.remove('splash-lock');
    };
  }, []);

  if (phase === 'gone') return null;

  const skip = () => {
    const root = document.documentElement;
    root.classList.remove('splash-lock');
    root.style.setProperty('--hero-delay', '0ms');
    setPhase((p) => (p === 'show' ? 'leave' : p));
  };

  return (
    <div className={`splash${phase === 'leave' ? ' is-leaving' : ''}`} onClick={skip} role="presentation">
      <div className="flex flex-col items-center gap-7 px-6 text-center">
        <div className="relative grid h-48 w-48 place-items-center sm:h-56 sm:w-56">
          <svg viewBox="0 0 200 200" className="splash-star absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <rect className="draw" pathLength="1" x="50" y="50" width="100" height="100" stroke="#40d6c6" strokeWidth="1.2" />
            <rect
              className="draw draw-2"
              pathLength="1"
              x="50"
              y="50"
              width="100"
              height="100"
              stroke="#40d6c6"
              strokeWidth="1.2"
              transform="rotate(45 100 100)"
            />
            <polygon className="draw draw-3" pathLength="1" points={STAR} stroke="#ffb432" strokeWidth="1" />
          </svg>
          <LogoMark size={104} className="splash-logo relative" />
        </div>
        <div className="splash-caption flex flex-col items-center">
          <span className="splash-wordmark">
            <Wordmark height={34} />
          </span>
          <p className="mt-4 text-lg text-[#b9c6ee]">{t('splash.greeting')}</p>
        </div>
        <div className="splash-bar h-[2px] w-40 overflow-hidden bg-white/10">
          <span />
        </div>
      </div>
    </div>
  );
}
