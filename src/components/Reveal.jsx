import { createElement, useEffect, useRef, useState } from 'react';

// مدیریت مشترک نمایش هنگام اسکرول.
// علاوه بر IntersectionObserver، هر ۴۰۰ میلی‌ثانیه موقعیت عناصر منتظر هم چک می‌شه؛
// پس حتی اگه مرورگر کند باشه، هیچ بخشی نامرئی نمی‌مونه.
const canAnimate =
  typeof window !== 'undefined' &&
  typeof IntersectionObserver !== 'undefined' &&
  !(typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

if (canAnimate) document.documentElement.classList.add('reveal-on');

const pending = new Map();
let observer = null;
let timer = 0;

function show(element) {
  const callback = pending.get(element);
  if (!callback) return;
  pending.delete(element);
  if (observer) observer.unobserve(element);
  callback();
}

function check() {
  const height = window.innerHeight || document.documentElement.clientHeight;
  pending.forEach((_, element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < height * 0.94 && rect.bottom > 0) show(element);
  });
  if (!pending.size && timer) {
    window.clearInterval(timer);
    timer = 0;
  }
}

function watch(element, callback) {
  pending.set(element, callback);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
      { rootMargin: '0px 0px -6% 0px' },
    );
  }
  observer.observe(element);
  if (!timer) timer = window.setInterval(check, 400);
  check();
  return () => {
    pending.delete(element);
    if (observer) observer.unobserve(element);
  };
}

// وقتی بخش وارد صفحه شد، آرام ظاهر می‌شه. variant: up | fade
export default function Reveal({ as = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(!canAnimate);

  useEffect(() => {
    if (!canAnimate || !ref.current) return undefined;
    return watch(ref.current, () => setShown(true));
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal reveal-${variant}${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`,
      style: delay ? { transitionDelay: `${delay}ms`, ...style } : style,
      ...rest,
    },
    children,
  );
}
