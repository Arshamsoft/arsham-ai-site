import { useI18n } from '../context/LanguageContext';
import { DEFAULT_SKILLS } from '../lib/helpers';
import { StarMark } from './Star';

// نوار متحرک فناوری‌ها؛ نسخه‌ی دوم فقط برای حلقه‌ی بی‌وقفه است و از صفحه‌خوان پنهانه
export default function TechRibbon({ items = [] }) {
  const { t } = useI18n();
  const list = items.length ? items : DEFAULT_SKILLS;
  const base = list.length < 12 ? [...list, ...list] : list;
  const loop = [...base, ...base];

  return (
    <section aria-label={t('ui.technologies')} className="border-y border-line/60 bg-surface/40 py-5">
      <div className="marquee" dir="ltr">
        <ul className="marquee-track">
          {loop.map((name, index) => (
            <li key={`${name}-${index}`} className="marquee-item" aria-hidden={index >= base.length ? 'true' : undefined}>
              <StarMark size={13} strokeWidth={2} className="text-saffron" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
