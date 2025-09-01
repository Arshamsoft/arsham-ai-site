```jsx
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-Arsham.png';
import { LanguageContext } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

export default function Header() {
  const { lang, setLang } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [pageContent, setPageContent] = useState({
    home: 'خانه',
    portfolio: 'محصولات',
    shop: 'فروشگاه',
    about: 'درباره ما',
    contact: 'تماس با ما',
    cards: [],
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent_Header');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent((prev) => ({ ...prev, ...parsedContent }));
      } catch (err) {
        console.error('خطا در لود محتوای Header:', err);
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between w-full">
      {/* انتخاب زبان */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
        >
          <FaGlobe className="text-lg" />
          <span>{lang === 'fa' ? 'فارسی' : lang === 'en' ? 'English' : 'Deutsch'}</span>
        </button>

        {open && (
          <ul className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg text-sm z-50 w-32">
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-200"
              onClick={() => { setLang('fa'); setOpen(false); }}
            >
              فارسی
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-200"
              onClick={() => { setLang('en'); setOpen(false); }}
            >
              English
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-200"
              onClick={() => { setLang('de'); setOpen(false); }}
            >
              Deutsch
            </li>
          </ul>
        )}
      </div>

      {/* منو */}
      <nav className="flex gap-8 text-gray-700 text-lg font-medium justify-center items-center flex-1">
        <Link to="/" className="hover:text-blue-600 transition duration-300">{pageContent.home}</Link>
        <Link to="/portfolio" className="hover:text-blue-600 transition duration-300">{pageContent.portfolio}</Link>
        <Link to="/shop" className="hover:text-blue-600 transition duration-300">{pageContent.shop}</Link>
        <Link to="/about" className="hover:text-blue-600 transition duration-300">{pageContent.about}</Link>
        <Link to="/contact" className="hover:text-blue-600 transition duration-300">{pageContent.contact}</Link>
      </nav>

      {/* لوگو */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Arsham Logo"
          className="w-[95px] h-[95px]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* کارت‌های اضافی (نامحدود) */}
      <div className="mt-8 grid grid-cols-1 gap-6 w-full">
        {pageContent.cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.title || 'عنوان کارت'}</h3>
            <p className="text-gray-700">{card.desc || 'توضیحات کارت'}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
```