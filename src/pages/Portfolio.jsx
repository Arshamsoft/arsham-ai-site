import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { listFrom } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import SkeletonGrid from '../components/SkeletonGrid';
import StateMessage from '../components/StateMessage';
import CtaBand from '../components/CtaBand';

export default function Portfolio() {
  const { t, tr } = useI18n();
  const { nav } = useSiteLabels();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    api
      .get('/portfolio', { params: { limit: 100 } })
      .then((res) => {
        if (!alive) return;
        setItems(listFrom(res));
        setStatus('ready');
      })
      .catch(() => {
        if (alive) setStatus('error');
      });
    return () => {
      alive = false;
    };
  }, [attempt]);

  const categories = useMemo(() => [...new Set(items.map((item) => item.category).filter(Boolean))], [items]);
  const visible = category ? items.filter((item) => item.category === category) : items;

  return (
    <>
      <PageHead title={nav('portfolio')} subtitle={t('page.projectsSubtitle')} />

      <section className="container-x">
        {status === 'ready' && categories.length > 1 ? (
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={t('ui.category')}>
            <button type="button" className={`chip${category ? '' : ' chip-on'}`} onClick={() => setCategory('')} aria-pressed={!category}>
              {t('ui.all')}
            </button>
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                className={`chip${category === name ? ' chip-on' : ''}`}
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
              >
                {tr(name)}
              </button>
            ))}
          </div>
        ) : null}

        {status === 'loading' ? <SkeletonGrid /> : null}

        {status === 'error' ? (
          <StateMessage
            title={t('page.projectsError')}
            text={t('ui.loadError')}
            action={
              <Button variant="ghost" onClick={() => setAttempt((n) => n + 1)}>
                {t('ui.retry')}
              </Button>
            }
          />
        ) : null}

        {status === 'ready' && !items.length ? (
          <StateMessage
            title={t('page.projectsEmpty')}
            text={t('page.projectsEmptyText')}
            action={<Button to="/android">{t('nav.android')}</Button>}
          />
        ) : null}

        {visible.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((item, index) => (
              <Reveal key={item._id || item.title} delay={(index % 3) * 80} className="h-full">
                <ProjectCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      <CtaBand />
    </>
  );
}
