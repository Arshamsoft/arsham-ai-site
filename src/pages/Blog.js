// frontend/src/pages/Blog.js (جایگزین کن)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/articles').then((res) => {
      setArticles(res.data.data || res.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-8">
        <div className="text-center max-w-xl">
          <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">وبلاگ</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            مطالب وبلاگ به‌زودی اضافه می‌شن.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-12">وبلاگ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((a) => (
            <Link key={a._id} to={`/blog/${a._id}`} className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden h-full">
                {a.image && <img src={a.image} alt={a.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{a.title}</h3>
                  {a.excerpt && <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{a.excerpt}</p>}
                  <span className="mt-4 inline-block text-sm text-blue-500 dark:text-blue-300 hover:underline">ادامه مطلب ←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}