import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaLanguage, FaRegCalendar, FaRegClock, FaUserEdit } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { readingMinutes, stripHtml } from '../lib/helpers';
import { hasPersian } from '../i18n/localTranslate';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import StateMessage from '../components/StateMessage';

export default function BlogPost() {
  const { id } = useParams();
  const { t, tr, pick, pickHtml, date, number, lang } = useI18n();
  const { nav } = useSiteLabels();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    api
      .get(`/articles/${id}`)
      .then((res) => {
        if (!alive) return;
        setArticle(res.data);
        setStatus('ready');
      })
      .catch(() => {
        if (alive) setStatus('missing');
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="container-x py-16" aria-busy="true">
        <div className="skeleton h-5 w-40" />
        <div className="skeleton mt-8 h-12 w-3/4" />
        <div className="skeleton mt-10 aspect-[16/8] w-full" />
      </div>
    );
  }

  if (status === 'missing' || !article) {
    return (
      <>
        <PageHead title={t('blog.notFound')} trail={[{ to: '/blog', label: nav('blog') }]} />
        <section className="container-x pb-24">
          <StateMessage
            title={t('blog.notFoundTitle')}
            text={t('blog.notFoundText')}
            action={<Button to="/blog">{t('blog.back')}</Button>}
          />
        </section>
      </>
    );
  }

  const published = date(article.createdAt);
  const tags = Array.isArray(article.tags) ? article.tags.filter(Boolean) : [];
  const body = pickHtml(article, 'content') || '';
  const persianOnly = lang !== 'fa' && hasPersian(stripHtml(body));

  return (
    <article>
      <PageHead title={pick(article, 'title')} trail={[{ to: '/blog', label: nav('blog') }]} />

      <div className="container-x pb-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
            {article.category ? <span className="chip">{pick(article, 'category')}</span> : null}
            {published ? (
              <span className="inline-flex items-center gap-2">
                <FaRegCalendar aria-hidden="true" />
                {published}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <FaRegClock aria-hidden="true" />
              {t('blog.minutes', { n: number(readingMinutes(article.content)) })}
            </span>
            {article.author ? (
              <span className="inline-flex items-center gap-2">
                <FaUserEdit aria-hidden="true" />
                {tr(article.author)}
              </span>
            ) : null}
          </div>

          {persianOnly ? (
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
              <FaLanguage aria-hidden="true" className="text-turq" />
              {t('blog.persianOnly')}
            </p>
          ) : null}

          {article.image ? (
            <Tile cut={28} className="mt-8" faceClassName="p-2.5">
              <img src={article.image} alt="" className="max-h-[30rem] w-full object-cover" />
            </Tile>
          ) : null}

          <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: body }} />

          {tags.length ? (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label={t('blog.tags')}>
              {tags.map((tag) => (
                <li key={tag} className="chip">
                  #{tr(tag)}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 border-t border-line/60 pt-8">
            <Button to="/blog" variant="ghost">
              {t('blog.back')}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
