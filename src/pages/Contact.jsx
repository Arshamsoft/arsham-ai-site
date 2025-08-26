import { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { translateText } from '../utils/translate'

export default function Contact() {
  const { lang } = useContext(LanguageContext)

  const [title, setTitle] = useState('')
  const [namePlaceholder, setNamePlaceholder] = useState('')
  const [emailPlaceholder, setEmailPlaceholder] = useState('')
  const [messagePlaceholder, setMessagePlaceholder] = useState('')
  const [buttonText, setButtonText] = useState('')

  useEffect(() => {
    const translateAll = async () => {
      setTitle(await translateText('تماس با من', lang))
      setNamePlaceholder(await translateText('نام شما', lang))
      setEmailPlaceholder(await translateText('ایمیل', lang))
      setMessagePlaceholder(await translateText('پیام شما', lang))
      setButtonText(await translateText('ارسال پیام', lang))
    }

    translateAll()
  }, [lang])

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
    </div>
  )
}
