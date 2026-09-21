// frontend/src/pages/Services.js (فایل جدید)
const services = [
  'ساخت اپلیکیشن اندروید',
  'طراحی سایت',
  'ساخت اپلیکیشن PWA',
  'ساخت مدل هوش مصنوعی',
  'ساخت انواع ربات تلگرامی',
  'انجام پروژه‌های دانشگاهی',
  'ساخت اپلیکیشن‌های ویندوزی',
  'راه‌اندازی شبکه',
  'پشتیبانی',
];

export default function Services() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-12">خدمات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg p-6 text-center transition hover:shadow-2xl hover:scale-105"
            >
              <p className="text-gray-700 dark:text-gray-200 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}