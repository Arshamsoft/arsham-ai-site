import flagIr from '../assets/flags/ir.svg';
import flagDe from '../assets/flags/de.svg';
import flagKr from '../assets/flags/kr.svg';
import flagJp from '../assets/flags/jp.svg';
import flagGb from '../assets/flags/gb.svg';
import flagRu from '../assets/flags/ru.svg';
import flagCn from '../assets/flags/cn.svg';

// ترتیب همون ترتیبیه که خواسته شده
export const LANGUAGES = [
  { code: 'fa', name: 'فارسی', dir: 'rtl', locale: 'fa-IR', htmlLang: 'fa', flag: flagIr },
  { code: 'de', name: 'Deutsch', dir: 'ltr', locale: 'de-DE', htmlLang: 'de', flag: flagDe },
  { code: 'ko', name: '한국어', dir: 'ltr', locale: 'ko-KR', htmlLang: 'ko', flag: flagKr },
  { code: 'ja', name: '日本語', dir: 'ltr', locale: 'ja-JP', htmlLang: 'ja', flag: flagJp },
  { code: 'en', name: 'English', dir: 'ltr', locale: 'en-GB', htmlLang: 'en', flag: flagGb },
  { code: 'ru', name: 'Русский', dir: 'ltr', locale: 'ru-RU', htmlLang: 'ru', flag: flagRu },
  { code: 'zh', name: '中文', dir: 'ltr', locale: 'zh-CN', htmlLang: 'zh-CN', flag: flagCn },
];

export const LANGUAGE_BY_CODE = Object.fromEntries(LANGUAGES.map((language) => [language.code, language]));
