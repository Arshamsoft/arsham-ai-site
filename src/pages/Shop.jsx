import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../utils/translateText';
import { pages } from '../pagesConfig';

export default function Shop() {
  const { lang } = useContext(LanguageContext);
  const page = pages.find((p) => p.path === '/shop') || { name: 'Shop', fields: {} };
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
                translatedItem[subKey] = await translateText(
                  item[subKey] || page.fields[key].subfields[subKey].default,
                  lang
                );
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
          {lang === 'fa' ? page.name : lang === 'en' ? page.name : page.name}
        </h2>

        {/* فیلدها */}
        {Object.keys(page.fields).map((key) => (
          <div key={key} className="mb-6">
            {page.fields[key].type === 'array' ? (
              <div className="grid md:grid-cols-2 gap-6">
                {(translatedContent[key] || []).map((item, index) => (
                  <div
                    key={`${key}-${index}`}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                  >
                    {Object.keys(page.fields[key].subfields).map((subKey) => (
                      <div key={subKey}>
                        {page.fields[key].subfields[subKey].type === 'textarea' ? (
                          <p className="text-gray-700 dark:text-gray-200 mb-2">{item[subKey]}</p>
                        ) : (
                          <p
                            className={
                              subKey === 'title'
                                ? 'text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400'
                                : 'text-blue-600 font-bold dark:text-blue-300'
                            }
                          >
                            {item[subKey]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p
                className={
                  page.fields[key].type === 'textarea'
                    ? 'text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line'
                    : 'text-gray-700 dark:text-gray-200'
                }
              >
                {translatedContent[key] || 'در حال ترجمه...'}
              </p>
            )}
          </div>
        ))}

        {/* کارت‌ها */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {translatedCards.length > 0 ? (
            translatedCards.map((card, index) => (
              <div
                key={`card-${index}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {card.title || 'عنوان کارت'}
                </h3>
                {card.type === 'image' && card.src ? (
                  <img src={card.src} alt={card.title} className="w-full h-auto rounded mb-2" />
                ) : card.type === 'video' && card.src ? (
                  <video controls className="w-full h-auto rounded mb-2">
                    <source src={card.src} type="video/mp4" />
                    مرورگر شما از ویدیو پشتیبانی نمی‌کند.
                  </video>
                ) : (
                  <p className="text-gray-700 dark:text-gray-200">{card.desc || 'توضیحات کارت'}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">
              هیچ کارتی اضافه نشده است.
            </p>
          )}
        </div>

        {/* کانتینرها */}
        <div className="mt-8">
          {translatedContainers.length > 0 ? (
            translatedContainers.map((container, index) => (
              <div
                key={`container-${index}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl mb-6 transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {container.title || 'عنوان کانتینر'}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">{container.content || 'محتوای کانتینر'}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">هیچ کانتینری اضافه نشده است.</p>
          )}
        </div>
      </div>
    </div>
  );
}
