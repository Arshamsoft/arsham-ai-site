import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../utils/translateText';
import { pages } from '../pagesConfig';
import { useLocation } from 'react-router-dom';

export default function GenericPage() {
  const { lang } = useContext(LanguageContext);
  const location = useLocation();
  const page = pages.find((p) => p.path === location.pathname) || {
    name: 'Unknown',
    fields: {},
  };
  const [translatedContent, setTranslatedContent] = useState({});
  const [translatedCards, setTranslatedCards] = useState([]);
  const [translatedContainers, setTranslatedContainers] = useState([]);
  const [pageContent, setPageContent] = useState({
    ...Object.keys(page.fields).reduce((acc, key) => {
      acc[key] = page.fields[key].default;
      return acc;
    }, {}),
    cards: [],
    containers: [],
  });

  useEffect(() => {
    const savedContent = localStorage.getItem(`pageContent_${page.name}`);
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent((prev) => ({
          ...prev,
          ...parsedContent,
          cards: parsedContent.cards || [],
          containers: parsedContent.containers || [],
        }));
      } catch (err) {
        console.error(`خطا در لود محتوای ${page.name}:`, err);
      }
    }
  }, [page.name]);

  useEffect(() => {
    const translateAll = async () => {
      const translated = {};
      for (const key of Object.keys(page.fields)) {
        if (page.fields[key].type === 'array') {
          translated[key] = await Promise.all(
            (pageContent[key] || page.fields[key].default).map(async (item) => {
              const translatedItem = {};
              for (const subKey of Object.keys(page.fields[key].subfields)) {
                translatedItem[subKey] = await translateText(item[subKey] || page.fields[key].subfields[subKey].default, lang);
              }
              return translatedItem;
            })
          );
        } else {
          translated[key] = await translateText(pageContent[key] || page.fields[key].default, lang);
        }
      }
      setTranslatedContent(translated);

      const translatedCrds = await Promise.all(
        (pageContent.cards || []).map(async (c) => {
          const title = await translateText(c.title || '', lang);
          const desc = c.type === 'text' ? await translateText(c.desc || '', lang) : c.desc;
          return { ...c, title, desc };
        })
      );
      setTranslatedCards(translatedCrds);

      const translatedCnts = await Promise.all(
        (pageContent.containers || []).map(async (c) => {
          const title = await translateText(c.title || '', lang);
          const content = await translateText(c.content || '', lang);
          return { ...c, title, content };
        })
      );
      setTranslatedContainers(translatedCnts);
    };

    translateAll();
  }, [lang, pageContent, page]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        {lang === 'fa' ? page.name : lang === 'en' ? page.name : page.name}
      </h2>

      {Object.keys(page.fields).map((key) => (
        <div key={key} className="mb-6">
          {page.fields[key].type === 'array' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {(translatedContent[key] || []).map((item, index) => (
                <div key={`${key}-${index}`} className="border p-6 rounded shadow hover:shadow-lg transition">
                  {Object.keys(page.fields[key].subfields).map((subKey) => (
                    <div key={subKey}>
                      {page.fields[key].subfields[subKey].type === 'textarea' ? (
                        <p className="text-gray-700 mb-2">{item[subKey]}</p>
                      ) : (
                        <p className={subKey === 'title' ? 'text-xl font-semibold mb-2' : 'text-blue-600 font-bold'}>
                          {item[subKey]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className={page.fields[key].type === 'textarea' ? 'text-gray-700 leading-relaxed whitespace-pre-line' : 'text-gray-700'}>
              {translatedContent[key] || 'در حال ترجمه...'}
            </p>
          )}
        </div>
      ))}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {translatedCards.length > 0 ? (
          translatedCards.map((card, index) => (
            <div key={`card-${index}`} className="bg-white p-6 rounded-lg shadow-md">
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
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">هیچ کارتی اضافه نشده است.</p>
        )}
      </div>

      <div className="mt-8">
        {translatedContainers.length > 0 ? (
          translatedContainers.map((container, index) => (
            <div key={`container-${index}`} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-2">{container.title || 'عنوان کانتینر'}</h3>
              <p className="text-gray-700">{container.content || 'محتوای کانتینر'}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">هیچ کانتینری اضافه نشده است.</p>
        )}
      </div>
    </div>
  );
}