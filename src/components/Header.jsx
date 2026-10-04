import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, socialIcon, socialLinks, telHref } from '../lib/helpers';
import Tile from './Tile';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const socials = socialLinks(content.socialLinks);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: labels.home, end: true },
    { to: '/services', label: labels.services },
    { to: '/portfolio', label: labels.portfolio },
    { to: '/shop', label: labels.shop },
    { to: '/blog', label: labels.blog },
    { to: '/about', label: labels.about },
    { to: '/contact', label: labels.contact },
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
              {labels.hours}
            </span>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt aria-hidden="true" className="text-turq" />
              {labels.location}
            </span>
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
        <Tile as={Link} to="/" cut={10} tone="night" faceClassName="px-3 py-1.5" aria-label="آرشام، صفحه‌ی اصلی">
          <img src={logo} alt="" className="h-9 w-auto" />
        </Tile>

        <nav className="hidden lg:block" aria-label="منوی اصلی">
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

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button
            href={telHref(labels.phone)}
            icon={<FaPhoneAlt aria-hidden="true" />}
            className="hidden sm:inline-flex"
            aria-label={`تماس با ${labels.phone}`}
          >
            <span dir="ltr">{labels.phone}</span>
          </Button>
          <Button
            variant="icon"
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            icon={open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          />
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="container-x pb-5 lg:hidden">
          <Tile cut={16} className="menu-in" faceClassName="p-2">
            <nav aria-label="منوی موبایل">
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
              <a href={telHref(labels.phone)} className="mobile-link sm:hidden">
                <span>تماس</span>
                <span dir="ltr" className="text-saffron">
                  {labels.phone}
                </span>
              </a>
            </nav>
          </Tile>
        </div>
      ) : null}
    </header>
  );
}
