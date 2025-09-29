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
} from "react-icons/fa";
import logo from "../assets/logo-Arsham.png";
import DarkModeToggle from "./DarkModeToggle"; // مسیر درست

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full bg-[#013B7A] text-white font-[IRANSans] shadow-lg shadow-blue-900/40 relative z-50">
      {/* نوار بالا: ساعات پاسخگویی + آیکن شبکه‌های اجتماعی */}
      <div className="flex justify-between items-center px-6 py-2 text-sm border-b border-[#0a4a9c]">
        <span>ساعات پاسخگویی: شنبه تا چهارشنبه - ساعت 8 صبح تا 5 بعد از ظهر</span>
        <div className="flex gap-4 text-white">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaRss /></a>
        </div>
      </div>

      {/* بخش وسط: لوگو، شماره تماس، آدرس */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4">
        {/* شماره تماس و آدرس */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <FaPhone className="text-orange-500" />
            <span>09333807359</span>
          </div>

          <div className="w-px h-6 bg-gray-400"></div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            
          </div>
        </div>

        {/* لوگو */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-[95px] h-[95px]" />
        </div>
      </div>

      <DarkModeToggle />

      {/* منو وسط + جستجو و سبد خرید سمت چپ */}
      <nav className="relative flex items-center justify-center px-6 py-3 bg-[#003366] text-sm">
        <div className="flex gap-8">
          
          <Link to="/about">درباره ما</Link>
          <Link to="/contact">تماس با ما</Link>
          <Link to="/blog">وبلاگ</Link>
          <Link to="/services">خدمات</Link>
          <Link to="/shop">فروشگاه</Link>
          <Link to="/" className="text-red-500">خانه</Link>
        </div>

        <div className="absolute left-6 flex items-center gap-4">
          {/* جستجو */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white w-[230px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 text-black text-sm outline-none"
              placeholder="متن مورد نظر..."
            />
            <button className="bg-orange-500 px-3 py-2 text-white text-sm flex items-center gap-2">
              <FaSearch />
            </button>
          </div>

          {/* سبد خرید */}
          <div className="relative">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">0</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
