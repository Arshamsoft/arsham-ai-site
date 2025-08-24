export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">تماس با من</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="نام شما"
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          placeholder="ایمیل"
          className="w-full p-3 border rounded"
        />
        <textarea
          placeholder="پیام شما"
          className="w-full p-3 border rounded h-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          ارسال پیام
        </button>
      </form>
    </div>
  )
}
