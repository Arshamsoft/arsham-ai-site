import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaRss,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaSearch,
  FaMoon,
  FaSun
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className={`w-full ${darkMode ? "dark" : ""} bg-[#013b7ad2] dark:bg-gray-900 text-white dark:text-white font-[IRANSans] shadow-lg shadow-blue-800/40 relative z-50 py-0`}>
      {/* نوار بالا */}
      <div className="flex justify-between items-center px-6 py-1 text-xs md:text-sm border-b border-[#0a4a9c] dark:border-gray-700">
        <span>ساعات پاسخگویی: شنبه تا چهارشنبه - 8 تا 17</span>
        <div className="flex gap-3 items-center text-white dark:text-gray-300">

          {/* دکمه دارک مود کنار آیکون‌ها */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300"
            title="تغییر حالت دارک مود"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          <div className="w-px h-5 bg-gray-400 dark:bg-gray-500"></div>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaRss /></a>

          
        </div>
      </div>

      {/* بخش وسط */}
      <div className="flex flex-wrap items-center justify-between px-6 py-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhone className="text-orange-500" />
            <span>09333807359</span>
          </div>
          <div className="w-px h-5 bg-gray-400 dark:bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>ایران</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-[110px] h-[110px]" />
        </div>
      </div>

      {/* منو */}
      <nav className="relative flex items-center justify-center px-6 py-2 bg-[#003366] dark:bg-gray-800 text-xs md:text-sm">
        <div className="flex gap-5 md:gap-8 text-white dark:text-gray-200">
          <Link to="/about" className="hover:text-blue-400">درباره ما</Link>
          <Link to="/contact" className="hover:text-blue-400">تماس با ما</Link>
          <Link to="/blog" className="hover:text-blue-400">وبلاگ</Link>
          <Link to="/services" className="hover:text-blue-400">خدمات</Link>
          <Link to="/shop" className="hover:text-blue-400">فروشگاه</Link>
          <Link to="/" className="text-red-400 font-bold hover:text-red-500">خانه</Link>
        </div>

        <div className="absolute left-6 flex items-center gap-3">
          {/* جستجو */}
          <div className="hidden sm:flex items-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 w-[180px] md:w-[220px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 py-1 text-black dark:text-white text-xs md:text-sm outline-none bg-white dark:bg-gray-700"
              placeholder="جستجو..."
            />
            <button className="bg-orange-500 px-2 py-1 text-white text-sm">
              <FaSearch />
            </button>
          </div>

          {/* سبد خرید */}
          <div className="relative">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] rounded-full px-1">0</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
