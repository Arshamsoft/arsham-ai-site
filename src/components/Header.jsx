import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { socialIcon, socialLinks, telHref } from '../lib/helpers';
import Logo from './Logo';
import Tile from './Tile';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { content } = useContent();
  const { t, lang, setLang, languages } = useI18n();
  const { nav, phone, hours, location } = useSiteLabels();
  const { customer } = useCustomer();
  const accountLink = customer ? '/account' : '/login';
  const accountLabel = customer ? t('auth.account') : t('auth.login');
  const socials = socialLinks(content.socialLinks);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: nav('home'), end: true },
    { to: '/services', label: nav('services') },
    { to: '/portfolio', label: nav('portfolio') },
    { to: '/shop', label: nav('shop') },
    { to: '/blog', label: nav('blog') },
    { to: '/about', label: nav('about') },
    { to: '/contact', label: nav('contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open ? 'header-scrolled' : 'border-transparent'
      }`}
    >
      {/* نوار اطلاعات تماس؛ با اسکرول جمع می‌شه */}
      <div
        className={`hidden overflow-hidden text-sm text-muted transition-[max-height,opacity] duration-500 md:block ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="container-x flex h-11 items-center justify-between gap-6 border-b border-line/50">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FaClock aria-hidden="true" className="text-turq" />
              {hours}
            </span>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt aria-hidden="true" className="text-turq" />
              {location}
            </span>
            <a href={telHref(phone)} className="inline-flex items-center gap-2 transition hover:text-fg xl:hidden">
              <FaPhoneAlt aria-hidden="true" className="text-turq" />
              <span dir="ltr">{phone}</span>
            </a>
          </div>
          {socials.length ? (
            <ul className="flex items-center gap-1">
              {socials.map((item) => {
                const Icon = socialIcon(item.platform);
                return (
                  <li key={`${item.platform}-${item.url}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                      className="grid h-8 w-8 place-items-center transition hover:text-turq"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="container-x flex h-[76px] items-center justify-between gap-4">
        <Link to="/" aria-label={t('ui.homeLink')} className="flex-none text-[15px] transition hover:opacity-90">
          <Logo size={44} />
        </Link>

        <nav className="hidden lg:block" aria-label={t('ui.mainMenu')}>
          <ul className="flex items-center gap-0.5">
            {links.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to={accountLink} variant="icon" aria-label={accountLabel} title={accountLabel} icon={<FaUserCircle aria-hidden="true" />} />
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            href={telHref(phone)}
            icon={<FaPhoneAlt aria-hidden="true" />}
            className="hidden xl:inline-flex"
            aria-label={t('ui.callNumber', { phone })}
          >
            <span dir="ltr">{phone}</span>
          </Button>
          <Button
            variant="icon"
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('ui.menuClose') : t('ui.menuOpen')}
            icon={open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          />
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="container-x pb-5 lg:hidden">
          <Tile cut={16} className="menu-in" faceClassName="p-2">
            <nav aria-label={t('ui.mobileMenu')}>
              <ul className="grid">
                {links.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => `mobile-link${isActive ? ' is-active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <NavLink to={accountLink} className={({ isActive }) => `mobile-link${isActive ? ' is-active' : ''}`}>
                {accountLabel}
              </NavLink>
              <NavLink to="/support" className={({ isActive }) => `mobile-link${isActive ? ' is-active' : ''}`}>
                {t('nav.support')}
              </NavLink>
              <a href={telHref(phone)} className="mobile-link">
                <span>{t('ui.call')}</span>
                <span dir="ltr" className="text-saffron">
                  {phone}
                </span>
              </a>
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-1 border-t border-line/60 p-2 sm:grid-cols-4" role="group" aria-label={t('ui.language')}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  lang={language.htmlLang}
                  onClick={() => setLang(language.code)}
                  aria-current={language.code === lang ? 'true' : undefined}
                  className={`lang-option${language.code === lang ? ' is-active' : ''}`}
                >
                  <img src={language.flag} alt="" className="flag" />
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </Tile>
        </div>
      ) : null}
    </header>
  );
}
