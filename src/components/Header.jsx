import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-Arsham.png'
import { LanguageContext } from '../context/LanguageContext'



export default function Header() {
  const { lang, setLang } = useContext(LanguageContext)
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
      {/* لوگو */}
      <div className="order-1 md:order-3 flex items-center gap-2">
        <img
          src={logo}
          alt="Arsham Logo"
          className="w-20 h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      
      </div>

      {/* منو */}
      <nav className="order-2 flex gap-6 mt-4 md:mt-0 text-gray-700 text-lg font-medium flex-wrap justify-center md:justify-end rtl">
        <Link to="/contact">تماس با ما</Link>
        <Link to="/about">درباره ما</Link>
        <Link to="/shop">فروشگاه</Link>
        <Link to="/portfolio">محصولات </Link>
        <Link to="/">خانه</Link>
      </nav>

      {/* انتخاب زبان */}
      <div className="order-3 md:order-1 relative mt-4 md:mt-0">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          زبان فعلی: {lang}
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md text-sm z-50">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('fa'); setOpen(false) }}
            >
              فارسی
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('en'); setOpen(false) }}
            >
              English
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { setLang('de'); setOpen(false) }}
            >
              Deutsch
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
