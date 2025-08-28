export const translateText = async (text, lang) => {
  // این یه نمونه ساده‌ست، باید با API ترجمه واقعی جایگزین بشه
  if (!text) return '';
  if (lang === 'fa') return text;
  if (lang === 'en') {
    // شبیه‌سازی ترجمه به انگلیسی
    const translations = {
      'من ارشام هستم': 'I am Arsham',
      'درباره من': 'About Me',
      'تماس با من': 'Contact Me',
      // اضافه کردن ترجمه‌های بیشتر
    };
    return translations[text] || text;
  }
  return text;
};