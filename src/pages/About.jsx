import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../utils/translateText';
import { pages } from '../pagesConfig';
import aboutImage from '../assets/8.png'; // تصویر کنار متن

export default function About() {
  const { lang } = useContext(LanguageContext);
  const page = pages.find((p) => p.path === '/about') || { name: 'About', fields: {} };
  const [translatedCards, setTranslatedCards] = useState([]);
  const [translatedContainers, setTranslatedContainers] = useState([]);

  const pageContent = {
    description: "شش سال تجربه در زمینه برنامه نویسی و انجام پروژه های مختلف چه بک اند و چه فرانت اند و تسلط به بیش از 12 زبان برنامه نویسی",
    cards: page.fields.cards || [],
    containers: page.fields.containers || [],
  };

  useEffect(() => {
    const translateAll = async () => {
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
  }, [lang, pageContent]);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* عنوان صفحه */}
      <h2 className="text-4xl font-bold text-center text-blue-700">{page.name}</h2>

      {/* متن + تصویر کنار هم */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-lg p-6 transition hover:shadow-2xl">
        <div className="md:w-1/2">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {pageContent.description}
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={aboutImage} alt="About" className="rounded-lg shadow-md w-full max-w-sm transform transition duration-300 hover:scale-105" />
        </div>
      </div>

      {/* کارت‌ها */}
      {translatedCards.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedCards.map((card, index) => (
            <div
              key={`card-${index}`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-600">{card.title}</h3>
              {card.type === 'image' && card.src ? (
                <img src={card.src} alt={card.title} className="w-full h-auto rounded mb-3" />
              ) : card.type === 'video' && card.src ? (
                <video controls className="w-full h-auto rounded mb-3">
                  <source src={card.src} type="video/mp4" />
                  مرورگر شما از ویدیو پشتیبانی نمی‌کند.
                </video>
              ) : (
                <p className="text-gray-700">{card.desc}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* کانتینرها */}
      {translatedContainers.length > 0 && (
        <div className="space-y-6">
          {translatedContainers.map((container, index) => (
            <div key={`container-${index}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">{container.title}</h3>
              <p className="text-gray-700">{container.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
