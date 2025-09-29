import { useState, useEffect, useContext } from 'react';
import image1 from '../assets/5.png';
import image2 from '../assets/1.png';
import image3 from '../assets/2.png';
import image4 from '../assets/4.png';
import image5 from '../assets/3.png';
import image7 from '../assets/YY2.png';
import { translateText } from '../utils/translateText';
import { LanguageContext } from '../context/LanguageContext';
import GenericPage from '../components/GenericPage';
import DarkModeToggle from "../components/DarkModeToggle";


const images = [image1, image2, image3, image4, image5];

const projects = [
  {
    title: 'اپلیکیشن های اندرویدی',
    desc: 'مجموعه نرم فزاری های ساخته شده برای گوشی ها و تبلت ها',
    link: '/android',
    image: image7 ,
  },

  {
    title: 'سایت های طراحی شده',
    desc: 'سایت شخصی چندزبانه با React و Tailwind',
    link: 'https://arshamai.com',
  },
];

const projects2 = [
  {
    title: '  ',
    desc: ' ',
    link: '#',
  },
  {
    title: '  ',
    desc: '',
    link: '#',
  },
  {
    title: '  ',
    desc: '',
    link: '#',
  },
];

export default function Home() {
  
  const [current, setCurrent] = useState(0);
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState({
    card1: 'برنامه‌نویسی برای کسب‌ وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده. با طراحی نرم‌ افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.',
    card2: ' با آرشام، آینده‌ی دیجیتال کسب‌وکار خودت رو بساز. طراحی سریع، ترجمه هوشمند، و تجربه کاربری بی‌نقص',
  });
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    // لود محتوای ذخیره‌شده از localStorage
    const savedContent = localStorage.getItem('pageContent_Home');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent((prev) => ({ ...prev, ...parsedContent }));
      } catch (err) {
        console.error('خطا در لود محتوای Home:', err);
      }
    }
  }, []);

  

  useEffect(() => {
    setLoading(true);
    translateText('  خوش آمدید Arshamai  به  ', lang)
      .then((result) => {
        setTranslated(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ترجمه شکست خورد:', err);
        setTranslated('');
        setLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
<div
  className="flex flex-col items-center justify-center min-h-screen px-4"
  style={{
    background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
  }}
>

      {/* عنوان سایت */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-3xl font-bold text-blue-700">
          {loading ? '...' : translated}
        </h1>
        {/* <p className="text-lg text-gray-700 mt-2">
          {loading ? '...' : translated}
        </p> */}
      </div>

      {/* اسلایدر با افکت زیبا */}
      <div className="relative w-full max-w-[1300px] h-[650px] overflow-hidden rounded-lg shadow-2xl">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* کارت‌های زیر اسلایدر */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {pageContent.card1}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            {pageContent.card2}
          </p>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="w-full flex justify-center my-12">
        <hr className="border-t-2 border-red-700 w-3/4" />
      </div>

      {/* بخش پروژه‌ها */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
  {projects.map((p, i) => (
    <a
      key={i}
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-400 flex flex-col sm:flex-row gap-6 cursor-pointer max-w-3xl mx-auto"

      >
        {/* تصویر */}
        {p.image && (
          <img
            src={p.image} 
            alt={p.title}
            className="w-full sm:w-2/3 h-auto rounded-lg object-cover"
          />
        )}

        {/* متن */}
        <div className="flex flex-col justify-between sm:w-2/3">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">{p.title}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
          <span className="mt-4 text-sm text-blue-500 hover:underline">
            مشاهده پروژه →
          </span>
        </div>
      </div>
    </a>
  ))}
</div>

   {/* خط جداکننده */}
      <div className="w-full flex justify-center my-12">
        <hr className="border-t-2 border-red-700 w-3/4" />
      </div>


<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
  {projects2.map((p, i) => (
    <a
      key={i}
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-400 flex flex-col sm:flex-row gap-6 cursor-pointer max-w-3xl mx-auto"

      >
        {/* تصویر */}
        {p.image && (
          <img
            src={p.image} 
            alt={p.title}
            className="w-full sm:w-2/3 h-auto rounded-lg object-cover"
          />
        )}

        {/* متن */}
        <div className="flex flex-col justify-between sm:w-2/3">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">{p.title}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
          <span className="mt-4 text-sm text-blue-500 hover:underline">
            مشاهده پروژه →
          </span>
        </div>
      </div>
    </a>
  ))}
</div>



    </div>
  );
  return <GenericPage />;
}