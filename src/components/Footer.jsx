import { Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useContent } from '../context/ContentContext';
import {
  DEFAULT_LICENSES,
  DEFAULT_SERVICES,
  HEADER_DEFAULTS,
  asList,
  socialIcon,
  socialLinks,
  telHref,
  textOf,
} from '../lib/helpers';
import Tile from './Tile';

export default function Footer() {
  const { content } = useContent();
  const footer = content.footer || {};
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const socials = socialLinks(content.socialLinks);
  const services = asList(content.services, DEFAULT_SERVICES).map(textOf).filter(Boolean).slice(0, 8);
  const licenses = asList(footer.licenses, DEFAULT_LICENSES).map(textOf).filter(Boolean);
  const copyright = footer.copyright || `© ${new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام`;

  const pages = [
    { to: '/', label: labels.home },
    { to: '/services', label: labels.services },
    { to: '/portfolio', label: labels.portfolio },
    { to: '/android', label: 'اپلیکیشن‌های اندرویدی' },
    { to: '/shop', label: labels.shop },
    { to: '/blog', label: labels.blog },
    { to: '/about', label: labels.about },
    { to: '/contact', label: labels.contact },
  ];

  return (
    <footer className="relative border-t border-line/60 bg-surface/50">
      <div aria-hidden="true" className="pattern-band" />

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr]">
        <div>
          <Tile as={Link} to="/" cut={10} tone="night" className="inline-flex" faceClassName="px-3 py-1.5" aria-label="آرشام، صفحه‌ی اصلی">
            <img src={logo} alt="" className="h-10 w-auto" />
          </Tile>
          <p className="mt-6 max-w-xs leading-8 text-muted">طراحی، ساخت، اجرا و پشتیبانی انواع نرم افزارها از صفر تا صد</p>
          {socials.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((item) => {
                const Icon = socialIcon(item.platform);
                return (
                  <li key={`${item.platform}-${item.url}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                      className="icon-cell !h-10 !w-10 !text-base transition hover:bg-turq hover:!text-ink"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className="font-display text-base font-bold">
            صفحه‌ها
          </h2>
          <ul className="mt-5 grid gap-2.5">
            {pages.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-bold">خدمات</h2>
          <ul className="mt-5 grid gap-2.5">
            {services.map((name) => (
              <li key={name}>
                <Link to="/services" className="text-muted transition hover:text-fg">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-bold">ارتباط با ما</h2>
          <ul className="mt-5 grid gap-4 text-muted">
            <li>
              <a href={telHref(labels.phone)} className="inline-flex items-center gap-3 transition hover:text-fg">
                <FaPhoneAlt aria-hidden="true" className="text-turq" />
                <span dir="ltr">{labels.phone}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt aria-hidden="true" className="flex-none text-turq" />
              <span>{labels.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaClock aria-hidden="true" className="mt-2 flex-none text-turq" />
              <span className="leading-8">{labels.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>
          {licenses.length ? (
            <ul className="flex flex-wrap gap-2">
              {licenses.map((name) => (
                <li key={name} className="chip">
                  {name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
