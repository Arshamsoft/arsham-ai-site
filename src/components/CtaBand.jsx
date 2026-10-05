import { FaTelegramPlane } from 'react-icons/fa';
import Tile from './Tile';
import Button from './Button';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { socialLinks, telHref } from '../lib/helpers';

export default function CtaBand() {
  const { content } = useContent();
  const { t } = useI18n();
  const { phone } = useSiteLabels();
  const telegram = socialLinks(content.socialLinks).find((item) => /telegram/i.test(String(item.platform)));

  return (
    <section className="container-x py-20">
      <Reveal>
        <Tile cut={34} tone="night" faceClassName="relative overflow-hidden px-7 py-12 md:px-14 md:py-16">
          <div aria-hidden="true" className="night-pattern" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-[1.5]">{t('cta.title')}</h2>
              <p className="mt-4 max-w-lg text-lg leading-9 text-[#b9c6ee]">{t('cta.text')}</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <a href={telHref(phone)} className="cta-phone" dir="ltr">
                {phone}
              </a>
              {telegram ? (
                <Button
                  href={telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  icon={<FaTelegramPlane aria-hidden="true" />}
                >
                  {t('cta.telegram')}
                </Button>
              ) : null}
            </div>
          </div>
        </Tile>
      </Reveal>
    </section>
  );
}
