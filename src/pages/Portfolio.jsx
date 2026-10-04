import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, listFrom } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import SkeletonGrid from '../components/SkeletonGrid';
import StateMessage from '../components/StateMessage';
import CtaBand from '../components/CtaBand';

export default function Portfolio() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
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
      <PageHead title={labels.portfolio} subtitle="بخشی از پروژه‌هایی که طراحی و اجرا کرده‌ایم" />

      <section className="container-x">
        {status === 'ready' && categories.length > 1 ? (
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="دسته‌بندی">
            <button type="button" className={`chip${category ? '' : ' chip-on'}`} onClick={() => setCategory('')} aria-pressed={!category}>
              همه
            </button>
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                className={`chip${category === name ? ' chip-on' : ''}`}
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
              >
                {name}
              </button>
            ))}
          </div>
        ) : null}

        {status === 'loading' ? <SkeletonGrid /> : null}

        {status === 'error' ? (
          <StateMessage
            title="نمونه‌کارها بارگذاری نشد"
            text="اتصال اینترنت را بررسی کنید و دوباره امتحان کنید."
            action={
              <Button variant="ghost" onClick={() => setAttempt((n) => n + 1)}>
                تلاش دوباره
              </Button>
            }
          />
        ) : null}

        {status === 'ready' && !items.length ? (
          <StateMessage
            title="هنوز نمونه‌کاری ثبت نشده"
            text="اپلیکیشن‌های اندرویدی ما را ببینید."
            action={<Button to="/android">اپلیکیشن‌های اندرویدی</Button>}
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
