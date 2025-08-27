import { useState, useEffect, useContext } from 'react'
import image1 from '../assets/slider1.jpg'
import image2 from '../assets/slider2.jpg'
import image3 from '../assets/slider1.jpg'
import image4 from '../assets/slider2.jpg'
import image5 from '../assets/slider1.jpg'
import { translateText } from '../utils/translateText'
import { LanguageContext } from '../context/LanguageContext'

const images = [image1, image2, image3, image4, image5]

const projects = [
  {
    title: 'فروشگاه آنلاین ArshamShop',
    desc: 'سایت فروشگاهی با پرداخت آنلاین و ترجمه خودکار',
    link: 'https://arshamshop.com',
  },
  {
    title: 'اپلیکیشن مدیریت وظایف',
    desc: 'اپلیکیشن اندروید با Kotlin و ViewModel',
    link: 'https://play.google.com/store/apps/details?id=arsham.tasks',
  },
  {
    title: 'سایت نمونه‌کار Arshamai',
    desc: 'سایت شخصی چندزبانه با React و Tailwind',
    link: 'https://arshamai.com',
  },
  {
    title: 'اپلیکیشن مترجم فوری',
    desc: 'ترجمه متن با LibreTranslate و رابط کاربری ساده',
    link: '#',
  },
  {
    title: 'پنل مدیریت مشتریان',
    desc: 'داشبورد تحت وب برای مدیریت کاربران و سفارش‌ها',
    link: '#',
  },
  {
    title: 'سایت آموزش برنامه‌نویسی',
    desc: 'پلتفرم آموزشی با ویدیو و آزمون آنلاین',
    link: '#',
  },
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [translated, setTranslated] = useState('')
  const [loading, setLoading] = useState(true)
  const { lang } = useContext(LanguageContext)

  useEffect(() => {
    setLoading(true)
    translateText('به Arshamai خوش آمدید!', lang)
      .then((result) => {
        setTranslated(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error('ترجمه شکست خورد:', err)
        setTranslated('به Arshamai خوش آمدید!')
        setLoading(false)
      })
  }, [lang])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* عنوان سایت */}
    

      {/* متن ترجمه‌شده */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-3xl font-bold text-blue-700">
          {loading ? '...' : translated}
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          {loading ? '...' : translated}
        </p>
      </div>

      {/* اسلایدر با افکت زیبا */}
      <div className="relative w-full max-w-xl h-64 overflow-hidden rounded-lg shadow-md">
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
            برنامه‌نویسی برای کسب‌وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده.  
            با طراحی نرم‌افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            با Arshamai، آینده‌ی دیجیتال کسب‌وکار خودت رو بساز.  
            طراحی سریع، ترجمه هوشمند، و تجربه کاربری بی‌نقص.
          </p>
        </div>
      </div>

      {/* بخش پروژه‌ها */}
      <div className="mt-24 max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">پروژه‌های من</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{p.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                مشاهده پروژه →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
