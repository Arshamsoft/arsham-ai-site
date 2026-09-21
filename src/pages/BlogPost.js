// frontend/src/pages/BlogPost.js (فایل جدید)
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';

export default function BlogPost() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => setArticle(res.data)).catch(() => setError('مقاله پیدا نشد'));
  }, [id]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">{error}</div>;
  if (!article) return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">در حال بارگذاری...</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">← بازگشت به وبلاگ</Link>
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mt-4 mb-6">{article.title}</h1>
        {article.image && <img src={article.image} alt={article.title} className="w-full rounded-lg mb-6 max-h-96 object-cover" />}
        <div className="text-gray-700 dark:text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}