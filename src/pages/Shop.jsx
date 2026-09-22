// frontend/src/pages/Shop.js (کامل جایگزین کن)
import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((res) => {
      setProducts(res.data.data || res.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-12">فروشگاه</h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">در حال بارگذاری...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">هنوز محصولی ثبت نشده است.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col">
                {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{p.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {p.price?.toLocaleString('fa-IR')} تومان
                      </span>
                      {p.oldPrice > 0 && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          {p.oldPrice?.toLocaleString('fa-IR')}
                        </span>
                      )}
                    </div>
                    {!p.inStock && (
                      <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded-full">ناموجود</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}