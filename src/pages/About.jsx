import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../utils/translateText';
import aboutImage from '../assets/8.png';

export default function About() {
  const { lang } = useContext(LanguageContext);

  const professionalDescription = `
من ارشام هستم، توسعه‌دهنده‌ی وب و نرم‌افزار با بیش از ۶ سال تجربه در طراحی و توسعه پروژه‌های پیچیده‌ی فرانت‌اند و بک‌اند. 
تخصص من شامل طراحی سیستم‌های مقیاس‌پذیر، APIهای امن و رابط‌های کاربری حرفه‌ای است. 
تجربه کار با زبان‌های برنامه‌نویسی: 
فرانت‌اند: JavaScript, TypeScript, HTML5, CSS3, React, Vue.js
بک‌اند: Node.js, Python, Java, PHP, C#, Go, Ruby
همچنین تجربه در مدیریت پایگاه داده‌ها (MySQL, PostgreSQL, MongoDB)، معماری نرم‌افزار و DevOps را دارم. 
تمرکز من بر روی بهینه‌سازی عملکرد، امنیت و تجربه کاربری بی‌نقص است.
  `;

  const [translatedDescription, setTranslatedDescription] = useState(professionalDescription);

  useEffect(() => {
    const translateDescription = async () => {
      const translated = await translateText(professionalDescription, lang);
      setTranslatedDescription(translated);
    };
    translateDescription();
  }, [lang]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full space-y-12">
        {/* عنوان صفحه */}
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">درباره ما</h2>

        {/* متن + تصویر کنار هم */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg p-6 transition hover:shadow-2xl">
          <div className="md:w-1/2">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {translatedDescription}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={aboutImage}
              alt="About"
              className="rounded-lg shadow-md w-full max-w-sm transform transition duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
