import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegCalendar, FaRegClock } from 'react-icons/fa';
import api from '../lib/api';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, excerptOf, formatDate, listFrom, readingMinutes, faNumber } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SkeletonGrid from '../components/SkeletonGrid';
import StateMessage from '../components/StateMessage';

export default function Blog() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    api
      .get('/articles', { params: { limit: 100 } })
      .then((res) => {
        if (!alive) return;
        setArticles(listFrom(res));
        setStatus('ready');
      })
      .catch(() => {
        if (alive) setStatus('error');
      });
    return () => {
      alive = false;
    };
  }, [attempt]);

  return (
    <>
      <PageHead title={labels.blog} subtitle="یادداشت‌ها و آموزش‌های آرشام درباره‌ی برنامه‌نویسی و نرم‌افزار" />

      <section className="container-x pb-24">
        {status === 'loading' ? <SkeletonGrid count={4} className="md:grid-cols-2" /> : null}

        {status === 'error' ? (
          <StateMessage
            title="مطالب بارگذاری نشد"
            text="اتصال اینترنت را بررسی کنید و دوباره امتحان کنید."
            action={
              <Button variant="ghost" onClick={() => setAttempt((n) => n + 1)}>
                تلاش دوباره
              </Button>
            }
          />
        ) : null}

        {status === 'ready' && !articles.length ? (
          <StateMessage
            title="هنوز مطلبی منتشر نشده"
            text="به‌زودی اولین مطلب اینجا قرار می‌گیرد. تا آن زمان، خدمات ما را ببینید."
            action={<Button to="/services">دیدن خدمات</Button>}
          />
        ) : null}

        {articles.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <Reveal key={article._id} delay={(index % 2) * 90} className={`h-full ${index === 0 ? 'md:col-span-2' : ''}`}>
                <ArticleCard article={article} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}

function ArticleCard({ article, featured }) {
  const date = formatDate(article.createdAt);
  return (
    <Tile
      as={Link}
      to={`/blog/${article._id}`}
      hover
      cut={24}
      className="group h-full"
      faceClassName={`grid h-full ${featured ? 'lg:grid-cols-[1.15fr_1fr]' : ''}`}
    >
      <div className={`relative overflow-hidden bg-raised ${featured ? 'aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]' : 'aspect-[16/9]'}`}>
        {article.image ? (
          <img src={article.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="pattern absolute inset-0 opacity-70" />
        )}
      </div>
      <div className="flex flex-col p-7 md:p-8">
        {article.category ? <span className="chip self-start">{article.category}</span> : null}
        <h2 className={`mt-4 font-display font-bold ${featured ? 'text-2xl leading-[1.8] md:text-3xl' : 'text-xl leading-9'}`}>{article.title}</h2>
        <p className="mt-3 leading-8 text-muted">{excerptOf(article, featured ? 260 : 150)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-5 pt-6 text-sm text-muted">
          {date ? (
            <span className="inline-flex items-center gap-2">
              <FaRegCalendar aria-hidden="true" />
              {date}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <FaRegClock aria-hidden="true" />
            {faNumber(readingMinutes(article.content))} دقیقه مطالعه
          </span>
        </div>
      </div>
    </Tile>
  );
}
