import {
  FaAndroid,
  FaBrain,
  FaCode,
  FaFacebookF,
  FaGithub,
  FaGraduationCap,
  FaHeadset,
  FaInstagram,
  FaLaptopCode,
  FaLink,
  FaLinkedinIn,
  FaMobileAlt,
  FaNetworkWired,
  FaRobot,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
  FaWindows,
  FaYoutube,
} from 'react-icons/fa';

// مقدارهای پیش‌فرض؛ هرچی تو پنل ادمین ثبت بشه جای این‌ها رو می‌گیره
export const HERO_DEFAULTS = {
  card1:
    'برنامه‌نویسی برای کسب‌ وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده. با طراحی نرم‌ افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.',
  card2: 'با آرشام، آینده‌ی دیجیتال کسب‌وکار خودت رو بساز. طراحی سریع، ترجمه هوشمند، و تجربه کاربری بی‌نقص',
};

export const DEFAULT_SERVICES = [
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

// از متن «درباره ما» برداشته شده
export const DEFAULT_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue.js',
  'Node.js',
  'Python',
  'Java',
  'PHP',
  'C#',
  'Go',
  'Ruby',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'HTML5',
  'CSS3',
  'DevOps',
];

export const DEFAULT_LICENSES = ['نماد اعتماد الکترونیکی', 'ساماندهی رسانه‌های دیجیتال', 'عضو اتحادیه کسب‌وکارهای اینترنتی'];

// ویرایشگر محتوای پنل ممکنه آرایه رو به رشته تبدیل کنه؛ این تابع هر دو حالت رو می‌خونه
export function asList(value, fallback = []) {
  if (Array.isArray(value)) return value.length ? value : fallback;
  if (typeof value === 'string' && value.trim()) {
    const text = value.trim();
    if (text.startsWith('[')) {
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed.length ? parsed : fallback;
      } catch (e) {
        // JSON نیست؛ پایین‌تر با جداکننده خونده می‌شه
      }
    }
    return text
      .split(/\n|،|,/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return fallback;
}

export function serviceItems(value) {
  return asList(value, DEFAULT_SERVICES)
    .map((item) => (typeof item === 'string' ? { value: item } : item))
    .filter((item) => item && textOf(item));
}

export function textOf(item) {
  if (item == null) return '';
  if (typeof item === 'string' || typeof item === 'number') return String(item).trim();
  return String(item.value || item.title || item.name || item.label || '').trim();
}

export function listFrom(response) {
  const data = response && response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export function sentences(text = '') {
  return (String(text).match(/[^.!?؟]+[.!?؟]?/g) || []).map((part) => part.trim()).filter(Boolean);
}

export function phrases(text = '') {
  return String(text)
    .replace(/[.!?؟]+\s*$/, '')
    .split(/،|,|\s+و\s+/)
    .map((part) => part.trim().replace(/^و\s+/, ''))
    .filter(Boolean);
}

export function serviceIcon(name = '') {
  const text = String(name);
  if (/اندروید|android/i.test(text)) return FaAndroid;
  if (/pwa/i.test(text)) return FaMobileAlt;
  if (/هوش|ai\b|مدل/i.test(text)) return FaBrain;
  if (/ربات|bot|تلگرام/i.test(text)) return FaRobot;
  if (/ویندوز|windows|دسکتاپ/i.test(text)) return FaWindows;
  if (/سایت|وب|web/i.test(text)) return FaLaptopCode;
  if (/دانشگاه|پایان|درسی/i.test(text)) return FaGraduationCap;
  if (/شبکه|network/i.test(text)) return FaNetworkWired;
  if (/پشتیبان|support/i.test(text)) return FaHeadset;
  return FaCode;
}

export function socialIcon(platform = '') {
  const key = String(platform).toLowerCase();
  if (key.includes('insta')) return FaInstagram;
  if (key.includes('linkedin')) return FaLinkedinIn;
  if (key.includes('telegram')) return FaTelegramPlane;
  if (key.includes('github')) return FaGithub;
  if (key.includes('whatsapp')) return FaWhatsapp;
  if (key.includes('youtube')) return FaYoutube;
  if (key.includes('twitter') || key === 'x') return FaTwitter;
  if (key.includes('facebook')) return FaFacebookF;
  return FaLink;
}

export function socialLinks(value) {
  return asList(value).filter((item) => item && typeof item === 'object' && item.url);
}

export function toLatinDigits(value = '') {
  return String(value)
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

export function telHref(phone = '') {
  return `tel:${toLatinDigits(phone).replace(/[^\d+]/g, '')}`;
}

export function stripHtml(html = '') {
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingMinutes(html = '') {
  const words = stripHtml(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function excerptOf(article, max = 160) {
  const source = (article && (article.excerpt || stripHtml(article.content))) || '';
  return source.length > max ? `${source.slice(0, max).trim()}…` : source;
}
