import { CONTENT_TRANSLATIONS } from './content';

// ترجمه‌ی محلی (داخل خود سایت): هیچ درخواستی به سرویس بیرونی فرستاده نمی‌شه
const PERSIAN = /[\u0600-\u06FF]/;

// کلید تطبیق: فقط حروف و اعداد؛ فاصله، نیم‌فاصله، علائم و ی/ک عربی نادیده گرفته می‌شن
export function matchKey(text) {
  return String(text)
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[\s\u200c\u200d\u200e\u200f.,،:;!?؟«»"'()\-–—]/g, '')
    .toLowerCase();
}

const INDEX = new Map(CONTENT_TRANSLATIONS.map((entry) => [matchKey(entry.fa), entry]));

function lookup(lang, text) {
  const entry = INDEX.get(matchKey(text));
  return entry && entry[lang] ? entry[lang] : null;
}

function translateLine(lang, line) {
  const parts = line.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const core = parts[2];
  if (!core || !PERSIAN.test(core)) return line;

  const whole = lookup(lang, core);
  if (whole) return parts[1] + whole + parts[3];

  // اگه کل متن پیدا نشد، جمله‌به‌جمله
  const pieces = core.match(/[^.!?؟]+[.!?؟]*\s*/g) || [core];
  if (pieces.length < 2) return line;
  let changed = false;
  const out = pieces.map((piece) => {
    const trimmed = piece.trim();
    if (!PERSIAN.test(trimmed)) return piece;
    const hit = lookup(lang, trimmed);
    if (!hit) return piece;
    changed = true;
    return /\s$/.test(piece) ? `${hit} ` : hit;
  });
  return changed ? parts[1] + out.join('').trim() + parts[3] : line;
}

export function hasPersian(text) {
  return PERSIAN.test(String(text || ''));
}

export function translateContent(lang, text) {
  if (text == null || lang === 'fa') return text;
  const value = String(text);
  if (!PERSIAN.test(value)) return value;
  return value
    .split('\n')
    .map((line) => translateLine(lang, line))
    .join('\n');
}

// متن HTML مقاله‌ها: فقط متن‌ها ترجمه می‌شن و ساختار (تیتر، لیست، لینک) دست نمی‌خوره
export function translateContentHtml(lang, html) {
  if (!html || lang === 'fa' || typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div id="tr-root">${html}</div>`, 'text/html');
  const root = doc.getElementById('tr-root');
  if (!root) return html;
  const walker = doc.createTreeWalker(root, 4);
  let changed = false;
  let node = walker.nextNode();
  while (node) {
    const original = node.nodeValue;
    if (PERSIAN.test(original)) {
      const out = translateContent(lang, original);
      if (out !== original) {
        node.nodeValue = out;
        changed = true;
      }
    }
    node = walker.nextNode();
  }
  return changed ? root.innerHTML : html;
}
