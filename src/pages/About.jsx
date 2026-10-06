import aboutImage from '../assets/8.png';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { DEFAULT_SKILLS, asList, textOf } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Reveal from '../components/Reveal';
import TechRibbon from '../components/TechRibbon';
import CtaBand from '../components/CtaBand';
import { StarHalo } from '../components/Star';

const DEFAULT_ABOUT = `من ارشام هستم، توسعه‌دهنده‌ی وب و نرم‌افزار با بیش از ۶ سال تجربه در طراحی و توسعه پروژه‌های پیچیده‌ی فرانت‌اند و بک‌اند.
تخصص من شامل طراحی سیستم‌های مقیاس‌پذیر، APIهای امن و رابط‌های کاربری حرفه‌ای است.
تجربه کار با زبان‌های برنامه‌نویسی:
فرانت‌اند: JavaScript, TypeScript, HTML5, CSS3, React, Vue.js
بک‌اند: Node.js, Python, Java, PHP, C#, Go, Ruby
همچنین تجربه در مدیریت پایگاه داده‌ها (MySQL, PostgreSQL, MongoDB)، معماری نرم‌افزار و DevOps را دارم.
تمرکز من بر روی بهینه‌سازی عملکرد، امنیت و تجربه کاربری بی‌نقص است.`;

export default function About() {
  const { content } = useContent();
  const { t, pick } = useI18n();
  const { nav } = useSiteLabels();
  const about = content.about || {};

  const text = pick({ ...about, content: textOf(about.content) || DEFAULT_ABOUT }, 'content');
  const skills = asList(about.skills, DEFAULT_SKILLS).map(textOf).filter(Boolean);
  const image = textOf(about.image) || aboutImage;

  const breakAt = text.indexOf('\n');
  const lead = breakAt > 0 ? text.slice(0, breakAt) : text;
  const rest = breakAt > 0 ? text.slice(breakAt + 1) : '';

  return (
    <>
      <PageHead title={nav('about')} />

      <section className="container-x grid items-center gap-16 pb-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal className="relative mx-auto w-full max-w-md py-10">
          <StarHalo className="absolute left-1/2 top-1/2 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2" />
          <Tile cut={34} className="relative" faceClassName="p-2.5">
            <img src={image} alt={t('about.alt')} className="h-auto w-full" />
          </Tile>
        </Reveal>

        <Reveal delay={120}>
          <Tile cut={28} faceClassName="p-8 md:p-12">
            <p className="font-display text-xl font-bold leading-[2] md:text-2xl md:leading-[2]">{lead}</p>
            {rest ? <p className="mt-6 whitespace-pre-line text-lg leading-[2.1] text-fg/85">{rest}</p> : null}
          </Tile>
        </Reveal>
      </section>

      <TechRibbon items={skills} />
      <CtaBand />
    </>
  );
}
