import { FaClock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { socialIcon, socialLinks, telHref, textOf } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Reveal from '../components/Reveal';
import TicketForm from '../components/TicketForm';

export default function Contact() {
  const { content } = useContent();
  const { t, lang } = useI18n();
  const { phone, email, hours, location } = useSiteLabels();
  const info = content.contactInfo || {};
  const socials = socialLinks(content.socialLinks);

  // متن‌های فرم: فارسی از پنل ادمین، بقیه‌ی زبان‌ها از ترجمه‌ها
  const pick = (cmsKey, key) => (lang === 'fa' && textOf(info[cmsKey]) ? textOf(info[cmsKey]) : t(key));

  return (
    <>
      <PageHead title={pick('title', 'contact.title')} subtitle={t('contact.subtitle')} />

      <section className="container-x grid gap-8 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid content-start gap-6">
          <Reveal>
            <Tile cut={24} faceClassName="p-8">
              <p className="text-sm text-muted">{t('contact.phone')}</p>
              <a href={telHref(phone)} dir="ltr" className="mt-2 block font-display text-3xl font-extrabold transition hover:text-turq">
                {phone}
              </a>
              <ul className="mt-8 grid gap-4 text-muted">
                {email ? (
                  <li className="flex items-center gap-3">
                    <FaEnvelope aria-hidden="true" className="flex-none text-turq" />
                    <a href={`mailto:${email}`} dir="ltr" className="transition hover:text-turq">
                      {email}
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt aria-hidden="true" className="flex-none text-turq" />
                  <span>{location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaClock aria-hidden="true" className="mt-2 flex-none text-turq" />
                  <span className="leading-8">{hours}</span>
                </li>
              </ul>
            </Tile>
          </Reveal>

          {socials.length ? (
            <Reveal delay={100}>
              <Tile cut={24} faceClassName="p-8">
                <p className="text-sm text-muted">{t('contact.social')}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {socials.map((item) => {
                    const Icon = socialIcon(item.platform);
                    return (
                      <li key={`${item.platform}-${item.url}`}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 font-semibold capitalize transition hover:text-turq"
                        >
                          <span className="icon-cell !h-10 !w-10 !text-base">
                            <Icon aria-hidden="true" />
                          </span>
                          <span dir="ltr">{item.platform}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Tile>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={160}>
          <Tile cut={28} faceClassName="p-8 md:p-10">
            <TicketForm source="contact" withSubject={false} sendLabel={pick('buttonText', 'contact.send')} />
          </Tile>
        </Reveal>
      </section>
    </>
  );
}
