import { createElement } from 'react';

// کاشی لبه‌پخ با سایه‌ی برجسته. as می‌تونه 'div'، 'article' یا Link باشه.
export default function Tile({
  as = 'div',
  cut = 18,
  tone = '',
  hover = false,
  className = '',
  faceClassName = '',
  style,
  children,
  ...rest
}) {
  const classes = ['tile', hover ? 'tile-hover' : '', tone ? `tile-${tone}` : '', className].filter(Boolean).join(' ');

  return createElement(
    as,
    { className: classes, style: { '--cut': `${cut}px`, ...style }, ...rest },
    <div className="tile-edge">
      <div className={`tile-face ${faceClassName}`.trim()}>{children}</div>
    </div>,
  );
}
