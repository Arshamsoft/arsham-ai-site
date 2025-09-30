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
    cards: [],
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
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-400 text-center">
        {title || 'در حال ترجمه...'}
      </h2>

      <form className="w-full max-w-3xl space-y-4">
        <input
          type="text"
          placeholder={namePlaceholder || '...'}
          className="w-full p-3 border rounded-xl shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          placeholder={emailPlaceholder || '...'}
          className="w-full p-3 border rounded-xl shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-300"
        />
        <textarea
          placeholder={messagePlaceholder || '...'}
          className="w-full p-3 border rounded-xl shadow-lg h-36 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition w-full md:w-auto"
        >
          {buttonText || '...'}
        </button>
      </form>

      <div className="mt-12 w-full max-w-3xl grid grid-cols-1 gap-6">
        {pageContent.cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {card.title || 'عنوان کارت'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{card.desc || 'توضیحات کارت'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
