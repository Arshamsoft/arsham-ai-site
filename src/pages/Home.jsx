import { useState, useEffect } from 'react'
import image1 from '../assets/slider1.jpg'
import image2 from '../assets/slider2.jpg'
import image3 from '../assets/slider1.jpg'
import image4 from '../assets/slider2.jpg'
import image5 from '../assets/slider1.jpg'

const images = [image1, image2, image3, image4, image5]

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000) // هر ۴ ثانیه ورق بخوره
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Arshamai.com</h1>

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

      {/* متن زیر اسلایدر */}
      <p className="mt-10 text-center text-gray-700 text-lg max-w-xl leading-relaxed">
  برنامه‌نویسی برای کسب‌وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده.  
  با طراحی نرم‌افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.
</p>

    </div>
  )
}
