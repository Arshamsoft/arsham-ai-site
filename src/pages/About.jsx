import { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { translateText } from '../utils/translate'

export default function About() {
  const { lang } = useContext(LanguageContext)
  const [translated, setTranslated] = useState('')

  useEffect(() => {
    const originalText = `
      من ارشام هستم، توسعه‌دهنده‌ی وب با بیش از ۵ سال تجربه در طراحی رابط کاربری، توسعه فرانت‌اند و ساخت وب‌سایت‌های حرفه‌ای برای برندها و کسب‌وکارهای مختلف.
      تمرکز من روی ساخت تجربه‌های کاربری روان، زیبا و سریع با استفاده از React، TailwindCSS و تکنولوژی‌های مدرن هست.
    `
    translateText(originalText, lang).then(setTranslated)
  }, [lang])

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        {lang === 'fa' ? 'درباره من' : lang === 'en' ? 'About Me' : 'Über mich'}
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {translated || 'در حال ترجمه...'}
      </p>
    </div>
  )
}
