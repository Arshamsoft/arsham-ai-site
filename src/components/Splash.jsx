import { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { LanguageContext } from '../context/LanguageContext';
import useTranslated from '../lib/useTranslated';
import { starPoints } from './Star';

const SEEN_KEY = 'arshamai_intro_seen';
const SHOW_MS = 1500;
const LEAVE_MS = 650;
const GREETING = 'به Arshamai خوش آمدید';
const STAR = starPoints(100, 100, 96);

// فقط اولین بازدید در هر نشست، و نه برای کسانی که «کاهش حرکت» رو روشن کردن
export function shouldShowSplash() {
  if (typeof window === 'undefined') return false;
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
  const { lang } = useContext(LanguageContext);
  const greeting = useTranslated(GREETING, lang);

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
        <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
          <svg viewBox="0 0 200 200" className="splash-star absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <rect className="draw" pathLength="1" x="50" y="50" width="100" height="100" stroke="#40d6c6" strokeWidth="1.4" />
            <rect
              className="draw draw-2"
              pathLength="1"
              x="50"
              y="50"
              width="100"
              height="100"
              stroke="#40d6c6"
              strokeWidth="1.4"
              transform="rotate(45 100 100)"
            />
            <polygon className="draw draw-3" pathLength="1" points={STAR} stroke="#ffb432" strokeWidth="1.2" />
          </svg>
          <img src={logo} alt="آرشام" className="splash-logo relative w-24 sm:w-28" />
        </div>
        <p className="splash-caption font-display text-xl font-bold sm:text-2xl">{greeting}</p>
        <div className="splash-bar h-[2px] w-40 overflow-hidden bg-white/10">
          <span />
        </div>
      </div>
    </div>
  );
}
