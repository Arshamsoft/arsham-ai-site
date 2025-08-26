import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 py-8 px-4 text-center">
      {/* آیکن‌های سوشال مدیا */}
      <div className="flex justify-center gap-6 mb-4 text-blue-600 text-xl">
        <a href="https://instagram.com/arshamai" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
        </a>
        <a href="https://linkedin.com/in/arshamai" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-700 transition" />
        </a>
        <a href="https://t.me/arshamai" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="hover:text-sky-500 transition" />
        </a>
        <a href="https://github.com/arshamai" target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:text-gray-800 transition" />
        </a>
      </div>

      {/* متن کپی‌رایت */}
      <p className="text-sm text-gray-600 mb-4">
        © {new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام
      </p>

      {/* بخش مجوزها */}
      <div className="flex justify-center items-center gap-4 flex-wrap text-xs text-gray-500">
        <span>نماد اعتماد الکترونیکی</span>
        <span>ساماندهی رسانه‌های دیجیتال</span>
        <span>عضو اتحادیه کسب‌وکارهای اینترنتی</span>
      </div>
    </footer>
  )
}
