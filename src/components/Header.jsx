import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-Arsham.png';
import { LanguageContext } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa'; // آیکن زبان

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
   <header className="flex items-center justify-between p-4 bg-white shadow-md relative">
  {/* لوگو سمت راست */}


      {/* منو وسط‌چین */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-700 text-lg font-medium">
        <Link to="/contact">{pageContent.contact}</Link>
        <Link to="/about">{pageContent.about}</Link>
        <Link to="/shop">{pageContent.shop}</Link>
        <Link to="/portfolio">{pageContent.portfolio}</Link>
        <Link to="/">{pageContent.home}</Link>
      </nav>

      {/* انتخاب زبان سمت چپ */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800 px-4 py-2 rounded-full shadow hover:from-blue-200 hover:to-blue-400 transition-all"
        >
          <FaGlobe className="text-lg" />
          <span>زبان: {lang}</span>
        </button>

        {open && (
          <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md text-sm z-50 w-32">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('fa'); setOpen(false); }}
            >
              فارسی
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('en'); setOpen(false); }}
            >
              English
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('de'); setOpen(false); }}
            >
              Deutsch
            </li>
          </ul>
        )}
      </div>
   

      {/* کارت‌های اضافی */}
      <div className="mt-8 grid grid-cols-1 gap-6 w-full">
        {pageContent.cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.title || 'عنوان کارت'}</h3>
            <p className="text-gray-700">{card.desc || 'توضیحات کارت'}</p>
          </div>
        ))}
      </div>

            <div className="flex items-center gap-2 flex-shrink-0">
    <img
      src={logo}
      alt="Arsham Logo"
      className="w-[95px] h-[95px]"
      style={{ imageRendering: 'pixelated' }}
    />
  </div>
    </header>
  );
}
