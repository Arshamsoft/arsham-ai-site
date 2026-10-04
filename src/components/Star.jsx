import { useId } from 'react';

// ستاره‌ی هشت‌پر (اتصال دو مربع) — نقش اصلی هویت بصری سایت
export function starPoints(cx, cy, outer, ratio = 0.7654, tips = 8) {
  const points = [];
  for (let i = 0; i < tips * 2; i += 1) {
    const angle = (Math.PI / tips) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : outer * ratio;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(' ');
}

const MARK = starPoints(50, 50, 46);

export function StarMark({ size = 20, className = '', strokeWidth = 1.6, filled = false }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <polygon
        points={MARK}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const OUTER = starPoints(200, 200, 196);
const INNER = starPoints(200, 200, 150);

// دو ستاره‌ی تودرتو با چرخش خیلی آرام، پشت قاب صفحه‌ی اصلی و تصویر «درباره ما»
export function StarHalo({ className = '' }) {
  const gradientId = `halo-${useId().replace(/:/g, '')}`;
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="spin-slow absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--c-turq))', stopOpacity: 0.9 }} />
            <stop offset="55%" style={{ stopColor: 'rgb(var(--c-lapis))', stopOpacity: 0.25 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--c-saffron))', stopOpacity: 0.85 }} />
          </linearGradient>
        </defs>
        <polygon points={OUTER} stroke={`url(#${gradientId})`} strokeWidth="1.2" />
      </svg>
      <svg viewBox="0 0 400 400" className="spin-slow-reverse absolute inset-0 h-full w-full" fill="none">
        <polygon points={INNER} style={{ stroke: 'rgb(var(--c-line))' }} strokeWidth="1" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}
