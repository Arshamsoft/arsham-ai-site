import { useContext, useState } from 'react';
import { FaClock, FaInfoCircle, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import useTranslated from '../lib/useTranslated';
import { HEADER_DEFAULTS, socialIcon, socialLinks, telHref, textOf } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Reveal from '../components/Reveal';

export default function Contact() {
  const { content } = useContent();
  const { lang } = useContext(LanguageContext);
  const info = content.contactInfo || {};
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const socials = socialLinks(content.socialLinks);

  const title = useTranslated(textOf(info.title) || 'تماس با من', lang);
  const nameLabel = useTranslated(textOf(info.namePlaceholder) || 'نام شما', lang);
  const emailLabel = useTranslated(textOf(info.emailPlaceholder) || 'ایمیل', lang);
  const messageLabel = useTranslated(textOf(info.messagePlaceholder) || 'پیام شما', lang);
  const buttonText = useTranslated(textOf(info.buttonText) || 'ارسال پیام', lang);

  // فرم هنوز به سامانه‌ی دریافت پیام وصل نیست؛ به‌جای وانمود به ارسال، راه تماس مستقیم رو نشون می‌دیم
  const [notice, setNotice] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    setNotice(true);
  };

  return (
    <>
      <PageHead title={title} subtitle="برای سفارش پروژه یا مشاوره، تماس بگیرید یا پیام بدهید." />

      <section className="container-x grid gap-8 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid content-start gap-6">
          <Reveal>
            <Tile cut={24} faceClassName="p-8">
              <p className="text-sm text-muted">شماره‌ی تماس</p>
              <a href={telHref(labels.phone)} dir="ltr" className="mt-2 block font-display text-3xl font-extrabold transition hover:text-turq">
                {labels.phone}
              </a>
              <ul className="mt-8 grid gap-4 text-muted">
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt aria-hidden="true" className="flex-none text-turq" />
                  <span>{labels.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaClock aria-hidden="true" className="mt-2 flex-none text-turq" />
                  <span className="leading-8">{labels.hours}</span>
                </li>
              </ul>
            </Tile>
          </Reveal>

          {socials.length ? (
            <Reveal delay={100}>
              <Tile cut={24} faceClassName="p-8">
                <p className="text-sm text-muted">شبکه‌های اجتماعی</p>
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
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">{nameLabel}</span>
                  <input name="name" type="text" required autoComplete="name" className="field" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">{emailLabel}</span>
                  <input name="email" type="email" required autoComplete="email" dir="ltr" className="field text-left" />
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold">{messageLabel}</span>
                <textarea name="message" rows={6} required className="field resize-y" />
              </label>

              {notice ? (
                <div role="status" className="flex items-start gap-3 border-s-4 border-saffron bg-saffron/10 p-4 leading-8">
                  <FaInfoCircle aria-hidden="true" className="mt-2 flex-none text-saffron" />
                  <p>
                    ارسال پیام از این فرم هنوز فعال نشده و پیام شما فرستاده نشد. لطفاً با شماره‌ی{' '}
                    <a href={telHref(labels.phone)} dir="ltr" className="font-bold underline underline-offset-4">
                      {labels.phone}
                    </a>{' '}
                    تماس بگیرید.
                  </p>
                </div>
              ) : null}

              <div>
                <Button type="submit" icon={<FaPaperPlane aria-hidden="true" />}>
                  {buttonText}
                </Button>
              </div>
            </form>
          </Tile>
        </Reveal>
      </section>
    </>
  );
}
