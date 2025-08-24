import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-700">Arshamai</Link>
      <nav className="flex gap-4 mt-2 md:mt-0 text-gray-700">
        <Link to="/">خانه</Link>
        <Link to="/portfolio">نمونه‌کارها</Link>
        <Link to="/shop">فروشگاه</Link>
        <Link to="/about">درباره</Link>
        <Link to="/contact">تماس</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
