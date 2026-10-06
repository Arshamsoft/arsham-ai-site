import { Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { DEFAULT_LICENSES, asList, serviceItems, socialIcon, socialLinks, telHref, textOf } from '../lib/helpers';
import Logo from './Logo';

const DEFAULT_COPYRIGHT = /^©\s*\d{4}\s*Arshamai\.com\s*\|\s*طراحی و توسعه توسط ارشام\s*$/;

export default function Footer() {
  const { content } = useContent();
  const { t, tr, pick } = useI18n();
  const { nav, phone, hours, location } = useSiteLabels();
  const footer = content.footer || {};
  const socials = socialLinks(content.socialLinks);
  const services = serviceItems(content.services).slice(0, 8);
  const licenses = asList(footer.licenses, DEFAULT_LICENSES).map(textOf).filter(Boolean);
  const year = new Date().getFullYear();
  const savedCopyright = textOf(footer.copyright);
  const copyright =
    !savedCopyright || DEFAULT_COPYRIGHT.test(savedCopyright) ? t('footer.copyright', { year }) : tr(savedCopyright);

  const pages = [
    { to: '/', label: nav('home') },
    { to: '/services', label: nav('services') },
    { to: '/portfolio', label: nav('portfolio') },
    { to: '/android', label: t('nav.android') },
    { to: '/shop', label: nav('shop') },
    { to: '/blog', label: nav('blog') },
    { to: '/about', label: nav('about') },
    { to: '/contact', label: nav('contact') },
    { to: '/support', label: t('nav.support') },
  ];

  return (
    <footer className="relative border-t border-line/60 bg-surface/50">
      <div aria-hidden="true" className="pattern-band" />

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr]">
        <div>
          <Link to="/" aria-label={t('ui.homeLink')} className="inline-flex text-[17px]">
            <Logo size={54} />
          </Link>
          <p className="mt-6 max-w-xs leading-8 text-muted">{t('footer.blurb')}</p>
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
            {t('footer.pages')}
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
          <h2 className="font-display text-base font-bold">{t('footer.services')}</h2>
          <ul className="mt-5 grid gap-2.5">
            {services.map((item) => (
              <li key={item.value}>
                <Link to="/services" className="text-muted transition hover:text-fg">
                  {pick(item, 'value')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-bold">{t('footer.contact')}</h2>
          <ul className="mt-5 grid gap-4 text-muted">
            <li>
              <a href={telHref(phone)} className="inline-flex items-center gap-3 transition hover:text-fg">
                <FaPhoneAlt aria-hidden="true" className="text-turq" />
                <span dir="ltr">{phone}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt aria-hidden="true" className="flex-none text-turq" />
              <span>{location}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaClock aria-hidden="true" className="mt-2 flex-none text-turq" />
              <span className="leading-8">{hours}</span>
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
                  {tr(name)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
