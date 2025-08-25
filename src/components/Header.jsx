import { Link } from 'react-router-dom'
import LanguageSwitcher from '../LanguageSwitcher'
import logo from '../assets/logo-Arsham.png'
// مطمئن شو لوگو رو اینجا ذخیره کردی

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
      {/* سوییچر زبان در سمت راست */}
      <div className="order-3 md:order-1">
        <LanguageSwitcher />
      </div>

      {/* منوی راست‌چین در وسط */}
      <nav className="order-2 flex gap-6 mt-4 md:mt-0 text-gray-700 text-lg font-medium flex-wrap justify-center md:justify-end rtl">
        <Link to="/contact">تماس</Link>
        <Link to="/about">درباره</Link>
        <Link to="/shop">فروشگاه</Link>
        <Link to="/portfolio">نمونه‌کارها</Link>
        <Link to="/">خانه</Link>
      </nav>

      {/* لوگو در سمت چپ */}
      <div className="order-1 md:order-3 flex items-center gap-2">
        <img src={logo} alt="Arshamai Logo" className="w-30 h-30 md:w-25 md:h-25" />
        <Link to="/" className="text-2xl font-bold text-blue-700"></Link>
      </div>
    </header>
  )
}
