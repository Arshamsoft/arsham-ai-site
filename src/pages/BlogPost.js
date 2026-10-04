import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegCalendar, FaRegClock, FaUserEdit } from 'react-icons/fa';
import api from '../lib/api';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, faNumber, formatDate, readingMinutes } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import StateMessage from '../components/StateMessage';

export default function BlogPost() {
  const { id } = useParams();
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
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
        <PageHead title="مقاله پیدا نشد" trail={[{ to: '/blog', label: labels.blog }]} />
        <section className="container-x pb-24">
          <StateMessage
            title="این مقاله وجود ندارد یا حذف شده است"
            text="فهرست مطالب وبلاگ را ببینید."
            action={<Button to="/blog">بازگشت به وبلاگ</Button>}
          />
        </section>
      </>
    );
  }

  const date = formatDate(article.createdAt);
  const tags = Array.isArray(article.tags) ? article.tags.filter(Boolean) : [];

  return (
    <article>
      <PageHead title={article.title} trail={[{ to: '/blog', label: labels.blog }]} />

      <div className="container-x pb-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
            {article.category ? <span className="chip">{article.category}</span> : null}
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
            {article.author ? (
              <span className="inline-flex items-center gap-2">
                <FaUserEdit aria-hidden="true" />
                {article.author}
              </span>
            ) : null}
          </div>

          {article.image ? (
            <Tile cut={28} className="mt-8" faceClassName="p-2.5">
              <img src={article.image} alt="" className="max-h-[30rem] w-full object-cover" />
            </Tile>
          ) : null}

          <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: article.content || '' }} />

          {tags.length ? (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="برچسب‌ها">
              {tags.map((tag) => (
                <li key={tag} className="chip">
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 border-t border-line/60 pt-8">
            <Button to="/blog" variant="ghost">
              بازگشت به وبلاگ
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
