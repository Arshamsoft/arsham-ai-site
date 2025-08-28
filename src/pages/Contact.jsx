import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../utils/translateText';

export default function Contact() {
  const { lang } = useContext(LanguageContext);
  const [title, setTitle] = useState('');
  const [namePlaceholder, setNamePlaceholder] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('');
  const [messagePlaceholder, setMessagePlaceholder] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [pageContent, setPageContent] = useState({
    title: 'تماس با من',
    namePlaceholder: 'نام شما',
    emailPlaceholder: 'ایمیل',
    messagePlaceholder: 'پیام شما',
    buttonText: 'ارسال پیام',
    cards: [], // آرایه کارت‌های اضافی (نامحدود)
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent_Contact');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent((prev) => ({ ...prev, ...parsedContent }));
      } catch (err) {
        console.error('خطا در لود محتوای Contact:', err);
      }
    }
  }, []);

  useEffect(() => {
    const translateAll = async () => {
      setTitle(await translateText(pageContent.title, lang));
      setNamePlaceholder(await translateText(pageContent.namePlaceholder, lang));
      setEmailPlaceholder(await translateText(pageContent.emailPlaceholder, lang));
      setMessagePlaceholder(await translateText(pageContent.messagePlaceholder, lang));
      setButtonText(await translateText(pageContent.buttonText, lang));
    };

    translateAll();
  }, [lang, pageContent]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        {title || 'در حال ترجمه...'}
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder={namePlaceholder || '...'}
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          placeholder={emailPlaceholder || '...'}
          className="w-full p-3 border rounded"
        />
        <textarea
          placeholder={messagePlaceholder || '...'}
          className="w-full p-3 border rounded h-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {buttonText || '...'}
        </button>
      </form>

      {/* کارت‌های اضافی (نامحدود) */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {pageContent.cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.title || 'عنوان کارت'}</h3>
            <p className="text-gray-700">{card.desc || 'توضیحات کارت'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}