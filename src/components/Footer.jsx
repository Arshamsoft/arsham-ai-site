import { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const [pageContent, setPageContent] = useState({
    copyright: `© ${new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام`,
    licenses: ['نماد اعتماد الکترونیکی', 'ساماندهی رسانه‌های دیجیتال', 'عضو اتحادیه کسب‌وکارهای اینترنتی'],
    cards: [], // کارت‌های اضافی (نامحدود)
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
    <footer className="bg-gray-100 border-t mt-12 py-8 px-4 text-center">
      {/* آیکن‌های سوشال مدیا */}
      <div className="flex justify-center gap-6 mb-4 text-blue-600 text-xl">
        <a href="https://instagram.com/arshamai" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
        </a>
        <a href="https://linkedin.com/in/arshamai" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-700 transition" />
        </a>
        <a href="https://t.me/arshamai" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="hover:text-sky-500 transition" />
        </a>
        <a href="https://github.com/arshamai" target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:text-gray-800 transition" />
        </a>
      </div>

      {/* متن کپی‌رایت */}
      <p className="text-sm text-gray-600 mb-4">
        {pageContent.copyright}
      </p>

      {/* بخش مجوزها */}
      <div className="flex justify-center items-center gap-4 flex-wrap text-xs text-gray-500">
        {pageContent.licenses.map((license, index) => (
          <span key={index}>{license}</span>
        ))}
      </div>

      {/* کارت‌های اضافی (نامحدود) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {pageContent.cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.title || 'عنوان کارت'}</h3>
            {card.type === 'image' && card.src ? (
              <img src={card.src} alt={card.title} className="w-full h-auto rounded mb-2" />
            ) : card.type === 'video' && card.src ? (
              <video controls className="w-full h-auto rounded mb-2">
                <source src={card.src} type="video/mp4" />
                مرورگر شما از ویدیو پشتیبانی نمی‌کند.
              </video>
            ) : (
              <p className="text-gray-700">{card.desc || 'توضیحات کارت'}</p>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}