import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { useI18n } from '../context/LanguageContext';
import Tile from './Tile';

// انتخاب زبان با پرچم؛ در منوی بالای صفحه
export default function LanguageSwitcher() {
  const { lang, setLang, languages, meta, t } = useI18n();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        className="btn btn-icon"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('ui.language')}: ${meta.name}`}
      >
        <span className="btn-edge">
          <span className="btn-face !gap-2 !px-3">
            <img src={meta.flag} alt="" className="flag" />
            <span className="hidden text-sm xl:inline">{meta.name}</span>
            <FaChevronDown aria-hidden="true" className={`text-[0.65rem] transition ${open ? 'rotate-180' : ''}`} />
          </span>
        </span>
      </button>

      {open ? (
        <div className="absolute end-0 top-full z-50 mt-3 w-56">
          <Tile cut={14} className="menu-in" faceClassName="p-1.5">
            <ul aria-label={t('ui.language')}>
              {languages.map((language) => (
                <li key={language.code}>
                  <button
                    type="button"
                    lang={language.htmlLang}
                    onClick={() => {
                      setLang(language.code);
                      setOpen(false);
                    }}
                    aria-current={language.code === lang ? 'true' : undefined}
                    className={`lang-option${language.code === lang ? ' is-active' : ''}`}
                  >
                    <img src={language.flag} alt="" className="flag" />
                    <span>{language.name}</span>
                    {language.code === lang ? <FaCheck aria-hidden="true" className="ms-auto text-xs text-turq" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      ) : null}
    </div>
  );
}
