import { createContext, useState, useEffect } from 'react'

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fa')

  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang) setLang(savedLang)
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
