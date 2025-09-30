import { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const [pageContent, setPageContent] = useState({
    copyright: `© ${new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام`,
    licenses: ['نماد اعتماد الکترونیکی', 'ساماندهی رسانه‌های دیجیتال', 'عضو اتحادیه کسب‌وکارهای اینترنتی'],
    cards: [],
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent_Footer');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent((prev) => ({ ...prev, ...parsedContent }));
      } catch (err) {
        console.error('خطا در لود محتوای Footer:', err);
      }
    }
  }, []);

  return (
    <footer className="w-full bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-100 mt-auto px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ستون ۱: فرم تماس */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4">تماس</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="نام *"
              className="w-full px-3 py-2 rounded text-black dark:text-gray-100 bg-white dark:bg-gray-700 text-sm text-right"
            />
            <input
              type="email"
              placeholder="پست الکترونیک *"
              className="w-full px-3 py-2 rounded text-black dark:text-gray-100 bg-white dark:bg-gray-700 text-sm text-right"
            />
            <input
              type="text"
              placeholder="موضوع"
              className="w-full px-3 py-2 rounded text-black dark:text-gray-100 bg-white dark:bg-gray-700 text-sm text-right"
            />
            <textarea
              placeholder="پیغام *"
              rows="3"
              className="w-full px-3 py-2 rounded text-black dark:text-gray-100 bg-white dark:bg-gray-700 text-sm text-right"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white px-6 py-2 rounded text-sm transition"
            >
              ارسال
            </button>
          </form>
        </div>

        {/* ستون ۲: خدمات */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4">خدمات</h3>
          <ul className="text-sm border-t border-gray-200 dark:border-gray-600">
            {['ساخت اپلیکیشن اندروید','طراحی سایت','ساخت اپلیکیشن PWA','ساخت مدل هوش مصنوعی','ساخت انواع ربات تلگرامی','انجام پروژه ای دانشگاهی','ساخت اپلیکیشن های ویندوزی','راه اندازی شبکه','پشتیبانی'].map((item, i) => (
              <li key={i} className="border-b border-gray-150 dark:border-gray-600 py-2 pr-2">
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون ۳: شرکت */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4">آرشام سافت</h3>
          <ul className="text-sm border-t border-gray-300 dark:border-gray-600">
            {['وبلاگ','ارتباط با ما','خانه','درباره ما','فروشگاه'].map((item, i) => (
              <li key={i} className="border-b border-gray-150 dark:border-gray-700 py-2">
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون ۴: درباره شرکت */}
        <div className="text-right">
          <h2 className="text-xl font-bold mb-4">آرشام سافت</h2>
          <p className="text-sm leading-6 mb-4">
            طراحی، ساخت، اجرا و پشتیبانی انواع نرم افزارها از صفر تا صد
          </p>
        </div>
      </div>

      {/* بخش پایین فوتر */}
      <div className="border-t border-blue-700 dark:border-gray-700 mt-10 pt-6 text-center">
        {/* آیکن‌های سوشال مدیا */}
        <div className="flex justify-center gap-6 mb-4 text-xl">
          <a href="https://instagram.com/arshamai" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-400 transition" />
          </a>
          <a href="https://linkedin.com/in/arshamai" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-400 transition" />
          </a>
          <a href="https://t.me/arshamai" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="hover:text-sky-400 transition" />
          </a>
          <a href="https://github.com/arshamai" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-200 transition" />
          </a>
        </div>

        {/* متن کپی‌رایت */}
        <p className="text-sm text-gray-300 dark:text-gray-400 mb-4">{pageContent.copyright}</p>

        {/* بخش مجوزها */}
        <div className="flex justify-center items-center gap-4 flex-wrap text-xs text-gray-400 dark:text-gray-500">
          {pageContent.licenses.map((license, index) => (
            <span key={index}>{license}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
