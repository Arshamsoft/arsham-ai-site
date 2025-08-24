const services = [
  { title: 'طراحی سایت اختصاصی', price: '۵۰۰ یورو', desc: 'طراحی ریسپانسیو با UI/UX حرفه‌ای' },
  { title: 'سئو و بهینه‌سازی', price: '۳۰۰ یورو', desc: 'افزایش رتبه گوگل و سرعت سایت' },
  { title: 'مشاوره فنی', price: '۱۰۰ یورو', desc: 'راهنمایی برای انتخاب تکنولوژی مناسب' },
]

export default function Shop() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">خدمات من</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="border p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600 mb-2">{s.desc}</p>
            <span className="text-blue-600 font-bold">{s.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
