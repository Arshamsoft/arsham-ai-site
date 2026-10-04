import { FaTelegramPlane } from 'react-icons/fa';
import Tile from './Tile';
import Button from './Button';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, socialLinks, telHref } from '../lib/helpers';

export default function CtaBand() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const telegram = socialLinks(content.socialLinks).find((item) => /telegram/i.test(String(item.platform)));

  return (
    <section className="container-x py-20">
      <Reveal>
        <Tile cut={34} tone="night" faceClassName="relative overflow-hidden px-7 py-12 md:px-14 md:py-16">
          <div aria-hidden="true" className="night-pattern" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-[1.5]">
                پروژه‌تان را با آرشام شروع کنید
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-9 text-[#b9c6ee]">
                درباره‌ی ایده و نیاز کسب‌وکارتان با ما صحبت کنید. برای تماس، روی شماره بزنید.
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <a href={telHref(labels.phone)} className="cta-phone" dir="ltr">
                {labels.phone}
              </a>
              {telegram ? (
                <Button
                  href={telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  icon={<FaTelegramPlane aria-hidden="true" />}
                >
                  پیام در تلگرام
                </Button>
              ) : null}
            </div>
          </div>
        </Tile>
      </Reveal>
    </section>
  );
}
