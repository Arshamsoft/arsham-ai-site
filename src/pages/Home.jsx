import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAndroid, FaBolt, FaChevronLeft, FaChevronRight, FaLanguage, FaPhoneAlt, FaRegGem } from 'react-icons/fa';
import image7 from '../assets/YY2.png';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { DEFAULT_SKILLS, HERO_DEFAULTS, asList, phrases, sentences, serviceIcon, serviceItems, textOf } from '../lib/helpers';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import ServiceTile from '../components/ServiceTile';
import TechRibbon from '../components/TechRibbon';
import CtaBand from '../components/CtaBand';
import { LogoMark } from '../components/Logo';
import { StarHalo } from '../components/Star';

const PILLAR_ICONS = [FaBolt, FaLanguage, FaRegGem];
const SECTION_TITLE = 'font-display text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold';

export default function Home() {
  const { content } = useContent();
  const { t, tr, pick } = useI18n();
  const { nav } = useSiteLabels();

  const hero = content.hero || {};
  const card1 = textOf(hero.card1) || HERO_DEFAULTS.card1;
  const card2 = textOf(hero.card2) || HERO_DEFAULTS.card2;
  const lines = sentences(card2);

  const headline = pick({ translations: hero.translations, title: (textOf(hero.title) || lines[0] || card2).replace(/[.]+$/, '') }, 'title');
  const pitch = pick({ translations: hero.translations, card1 }, 'card1');
  const customPillars = asList(hero.pillars).map(textOf).filter(Boolean);
  const pillars = customPillars.length ? customPillars : phrases(lines.slice(1).join(' '));

  const slides = asList(hero.sliderImages).map(textOf).filter(Boolean);
  const services = serviceItems(content.services);
  const skills = asList((content.about || {}).skills, DEFAULT_SKILLS).map(textOf).filter(Boolean);

  return (
    <>
      <section className="relative">
        <div className="container-x grid items-center gap-16 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-24">
          <div className="relative z-10">
            <h1 className="hero-in font-display text-[clamp(2.1rem,5vw,3.8rem)] font-extrabold leading-[1.38]">{headline}</h1>
            <p
              className="hero-in mt-7 max-w-xl text-lg leading-9 text-muted md:text-[1.2rem] md:leading-10"
              style={{ '--d': '140ms' }}
            >
              {pitch}
            </p>
            <div className="hero-in mt-10 flex flex-wrap items-center gap-4" style={{ '--d': '280ms' }}>
              <Button to="/contact" icon={<FaPhoneAlt aria-hidden="true" />}>
                {t('home.ctaContact')}
              </Button>
              <Button to="/portfolio" variant="ghost">
                {t('home.ctaProjects')}
              </Button>
            </div>
          </div>

          <div className="hero-in" style={{ '--d': '220ms' }}>
            <HeroShowcase slides={slides} chips={services.slice(0, 2)} />
          </div>
        </div>
      </section>

      <TechRibbon items={skills} />

      {pillars.length >= 2 && pillars.length <= 4 ? (
        <section className="container-x pt-20" aria-label={t('home.features')}>
          <Reveal>
            <Tile cut={26} faceClassName="grid md:grid-flow-col md:auto-cols-fr">
              {pillars.map((text, index) => {
                const Icon = PILLAR_ICONS[index] || FaRegGem;
                return (
                  <div
                    key={text}
                    className={`flex items-center gap-5 p-7 md:p-9 ${index ? 'border-t border-line/60 md:border-s md:border-t-0' : ''}`}
                  >
                    <span className="icon-cell">
                      <Icon aria-hidden="true" />
                    </span>
                    <p className="font-display text-lg font-bold leading-8 md:text-xl">
                      {customPillars.length ? pick({ translations: hero.translations, [`pillar${index}`]: text }, `pillar${index}`) : tr(text)}
                    </p>
                  </div>
                );
              })}
            </Tile>
          </Reveal>
        </section>
      ) : null}

      {/* پروژه‌ها قبل از فهرست خدمات: اول نمونه‌ی کار، بعد جزئیات */}
      <section className="container-x pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal as="h2" className={SECTION_TITLE}>
            {t('home.projectsTitle')}
          </Reveal>
          <Link to="/portfolio" className="font-semibold text-lapis underline-offset-8 transition hover:underline dark:text-turq">
            {nav('portfolio')}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[7fr_5fr]">
          <Reveal className="h-full">
            <Tile as={Link} to="/android" hover cut={30} className="group h-full" faceClassName="grid h-full sm:grid-cols-[1fr_1.15fr]">
              <div className="relative min-h-[17rem] overflow-hidden bg-raised">
                <img
                  src={image7}
                  alt={t('home.androidAlt')}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col p-8">
                <span className="icon-cell">
                  <FaAndroid aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold leading-10">{t('home.androidTitle')}</h3>
                <p className="mt-3 leading-8 text-muted">{t('home.androidText')}</p>
                <span className="mt-auto pt-8 font-semibold text-lapis dark:text-turq">{t('home.androidLink')}</span>
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <Tile as={Link} to="/portfolio" hover cut={30} className="group h-full" faceClassName="flex h-full flex-col">
              <BrowserArt />
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-2xl font-bold leading-10">{t('home.webTitle')}</h3>
                <p className="mt-3 leading-8 text-muted">{t('home.webText')}</p>
                <span className="mt-auto pt-8 font-semibold text-lapis dark:text-turq">{t('home.webLink')}</span>
              </div>
            </Tile>
          </Reveal>
        </div>
      </section>

      <section className="container-x pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal as="h2" className={SECTION_TITLE}>
            {nav('services')}
          </Reveal>
          <Link to="/services" className="font-semibold text-lapis underline-offset-8 transition hover:underline dark:text-turq">
            {t('home.allServices')}
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((item, index) => (
            <Reveal key={item.value} delay={index * 70} className="h-full">
              <ServiceTile name={pick(item, 'value')} source={item.value} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function HeroShowcase({ slides, chips }) {
  const { t, pick, isRtl } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const count = slides.length;

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 6000);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  const go = (step) => setIndex((current) => (current + step + count) % count);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    // راست‌به‌چپ: کشیدن به راست یعنی بعدی؛ چپ‌به‌راست برعکس
    const forward = isRtl ? delta > 0 : delta < 0;
    go(forward ? 1 : -1);
  };

  const PrevIcon = isRtl ? FaChevronRight : FaChevronLeft;
  const NextIcon = isRtl ? FaChevronLeft : FaChevronRight;

  return (
    <div className="relative mx-auto w-full max-w-[38rem] py-8">
      <StarHalo className="absolute left-1/2 top-1/2 aspect-square w-[106%] -translate-x-1/2 -translate-y-1/2" />

      <Tile cut={30} className="relative" faceClassName="p-2.5">
        <div
          className="relative aspect-[16/10] overflow-hidden bg-bg"
          role="group"
          aria-roledescription="carousel"
          aria-label={t('home.slider')}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {count ? (
            slides.map((src, slideIndex) => (
              <div
                key={`${src}-${slideIndex}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${slideIndex === index ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={slideIndex === index ? undefined : 'true'}
              >
                <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
                <img
                  src={src}
                  alt={t('home.slide', { n: slideIndex + 1, total: count })}
                  className={`relative h-full w-full object-contain transition-transform duration-[6000ms] ease-linear ${
                    slideIndex === index ? 'scale-[1.04]' : 'scale-100'
                  }`}
                />
              </div>
            ))
          ) : (
            <div className="tile-night grid h-full place-items-center bg-[#0b1a4c]">
              <LogoMark size={128} />
            </div>
          )}
        </div>

        {count > 1 ? (
          <div className="flex items-center justify-between gap-4 px-2 pb-1.5 pt-3.5">
            <div className="flex items-center gap-2">
              {slides.map((src, slideIndex) => (
                <button
                  key={`dot-${src}-${slideIndex}`}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={t('home.goTo', { n: slideIndex + 1 })}
                  aria-current={slideIndex === index ? 'true' : undefined}
                  className={`h-1.5 transition-all duration-500 ${slideIndex === index ? 'w-8 bg-saffron' : 'w-3 bg-line hover:bg-muted'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="icon" onClick={() => go(-1)} aria-label={t('home.prev')} icon={<PrevIcon aria-hidden="true" />} />
              <Button variant="icon" onClick={() => go(1)} aria-label={t('home.next')} icon={<NextIcon aria-hidden="true" />} />
            </div>
          </div>
        ) : null}
      </Tile>

      {chips.map((item, chipIndex) => {
        const Icon = serviceIcon(item.value);
        return (
          <Tile
            key={item.value}
            cut={9}
            className={`bob absolute z-20 hidden sm:flex ${chipIndex === 0 ? '-top-1 end-4' : 'bottom-2 start-[-1rem]'}`}
            style={{ animationDelay: `${chipIndex * -3.5}s` }}
            faceClassName="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold"
            aria-hidden="true"
          >
            <Icon className="text-turq" />
            <span>{pick(item, 'value')}</span>
          </Tile>
        );
      })}
    </div>
  );
}

function BrowserArt() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-raised/70 px-8 pt-8">
      <div className="mx-auto max-w-sm translate-y-3 border border-line/70 bg-surface shadow-[0_24px_40px_-24px_rgb(var(--c-shadow)/0.6)] transition duration-700 group-hover:translate-y-0">
        <div className="flex items-center gap-1.5 border-b border-line/70 px-3 py-2.5" dir="ltr">
          <span className="h-2 w-2 rounded-full bg-saffron" />
          <span className="h-2 w-2 rounded-full bg-turq" />
          <span className="h-2 w-2 rounded-full bg-lapis" />
          <span className="ms-3 h-2 flex-1 rounded bg-raised" />
        </div>
        <div className="grid gap-3 p-4">
          <div className="h-16 bg-gradient-to-l from-lapis/80 via-lapis/50 to-turq/60" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 bg-raised" />
            <div className="h-10 bg-raised" />
            <div className="h-10 bg-raised" />
          </div>
          <div className="h-2 w-2/3 rounded bg-raised" />
          <div className="h-2 w-1/2 rounded bg-raised" />
        </div>
      </div>
    </div>
  );
}
