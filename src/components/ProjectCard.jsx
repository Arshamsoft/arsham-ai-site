import { useState } from 'react';
import { FaExternalLinkAlt, FaImage } from 'react-icons/fa';
import { useI18n } from '../context/LanguageContext';
import Tile from './Tile';

// کارت پروژه: تصویر کامل (بدون بریدگی) روی زمینه‌ی محو همان تصویر؛ اگه تصویر خراب بود، طرح جایگزین
export default function ProjectCard({ item }) {
  const { t, tr } = useI18n();
  const [broken, setBroken] = useState(false);
  const technologies = Array.isArray(item.technologies) ? item.technologies.filter(Boolean) : [];
  const title = tr(item.title);
  const showImage = item.image && !broken;

  return (
    <Tile as="article" cut={22} className="h-full" faceClassName="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-raised">
        {showImage ? (
          <>
            <img src={item.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
            <img
              src={item.image}
              alt={title}
              loading="lazy"
              onError={() => setBroken(true)}
              className="relative h-full w-full object-contain p-3"
            />
          </>
        ) : (
          <div className="relative grid h-full place-items-center">
            <div aria-hidden="true" className="pattern absolute inset-0 opacity-70" />
            <FaImage aria-hidden="true" className="relative text-4xl text-muted/60" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {item.category ? <span className="text-sm text-muted">{tr(item.category)}</span> : null}
        <h3 className="mt-1 font-display text-xl font-bold leading-9">{title}</h3>
        {item.description ? <p className="mt-3 leading-8 text-muted">{tr(item.description)}</p> : null}

        {item.video ? (
          <video controls preload="none" poster={showImage ? item.image : undefined} className="mt-5 w-full bg-black/40">
            <source src={item.video} />
            {t('ui.videoUnsupported')}
          </video>
        ) : null}

        {technologies.length ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('ui.technologies')}>
            {technologies.map((tech) => (
              <li key={tech} className="chip" dir="ltr">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        {item.client || item.link ? (
          <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
            <span className="text-muted">{item.client ? t('project.client', { name: tr(item.client) }) : ''}</span>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-lapis transition hover:text-fg dark:text-turq"
              >
                <span>{t('project.view')}</span>
                <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Tile>
  );
}
