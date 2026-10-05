import { Link } from 'react-router-dom';
import { useI18n } from '../context/LanguageContext';
import { StarMark } from './Star';

// سرصفحه‌ی صفحه‌های داخلی: مسیر، تیتر، توضیح کوتاه
export default function PageHead({ title, subtitle, trail = [] }) {
  const { t } = useI18n();
  return (
    <header className="container-x pb-10 pt-12 md:pb-14 md:pt-16">
      <nav aria-label={t('ui.breadcrumb')} className="hero-in text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="transition hover:text-fg">
              {t('nav.home')}
            </Link>
          </li>
          {trail.map((item) => (
            <li key={item.to} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link to={item.to} className="transition hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-fg">
              {title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="mt-6 flex items-end justify-between gap-8">
        <div className="max-w-3xl">
          <h1
            className="hero-in font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.35]"
            style={{ '--d': '80ms' }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="hero-in mt-5 max-w-2xl text-lg leading-9 text-muted" style={{ '--d': '160ms' }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <StarMark size={88} strokeWidth={1.2} className="spin-slow hidden flex-none text-turq/60 md:block" />
      </div>
    </header>
  );
}
