export const pages = [
  {
    name: "Home",
    path: "/",
    fields: {
      card1: {
        type: "textarea",
        default: "برنامه‌نویسی برای کسب‌وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده. با طراحی نرم‌افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.",
      },
      card2: {
        type: "textarea",
        default: "با Arshamai، آینده‌ی دیجیتال کسب‌وکار خودت رو بساز. طراحی سریع، ترجمه هوشمند، و تجربه کاربری بی‌نقص.",
      },
    },
  },
  {
    name: "About",
    path: "/about",
    fields: {
      content: {
        type: "textarea",
        default: `من ارشام هستم، توسعه‌دهنده‌ی وب با بیش از ۵ سال تجربه در طراحی رابط کاربری، توسعه فرانت‌اند و ساخت وب‌سایت‌های حرفه‌ای برای برندها و کسب‌وکارهای مختلف.
تمرکز من روی ساخت تجربه‌های کاربری روان، زیبا و سریع با استفاده از React، TailwindCSS و تکنولوژی‌های مدرن هست.`,
      },
    },
  },
  {
    name: "Shop",
    path: "/shop",
    fields: {
      services: {
        type: "array",
        default: [
          { title: "طراحی سایت اختصاصی", price: "۵۰۰ یورو", desc: "طراحی ریسپانسیو با UI/UX حرفه‌ای" },
          { title: "سئو و بهینه‌سازی", price: "۳۰۰ یورو", desc: "افزایش رتبه گوگل و سرعت سایت" },
          { title: "مشاوره فنی", price: "۱۰۰ یورو", desc: "راهنمایی برای انتخاب تکنولوژی مناسب" },
        ],
        subfields: {
          title: { type: "text", default: "" },
          price: { type: "text", default: "" },
          desc: { type: "textarea", default: "" },
        },
      },
    },
  },
  {
    name: "Contact",
    path: "/contact",
    fields: {
      title: { type: "text", default: "تماس با من" },
      namePlaceholder: { type: "text", default: "نام شما" },
      emailPlaceholder: { type: "text", default: "ایمیل" },
      messagePlaceholder: { type: "textarea", default: "پیام شما" },
      buttonText: { type: "text", default: "ارسال پیام" },
    },
  },
  {
    name: "Footer",
    path: "/footer",
    fields: {
      copyright: { type: "text", default: `© ${new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام` },
      licenses: {
        type: "array",
        default: ["نماد اعتماد الکترونیکی", "ساماندهی رسانه‌های دیجیتال", "عضو اتحادیه کسب‌وکارهای اینترنتی"],
        subfields: { value: { type: "text", default: "" } },
      },
    },
  },
  {
    name: "Header",
    path: "/header",
    fields: {
      home: { type: "text", default: "خانه" },
      portfolio: { type: "text", default: "محصولات" },
      shop: { type: "text", default: "فروشگاه" },
      about: { type: "text", default: "درباره ما" },
      contact: { type: "text", default: "تماس با ما" },
    },
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    fields: {
      projects: {
        type: "array",
        default: [
          { title: "پروژه ۱", desc: "توضیحات پروژه ۱" },
          { title: "پروژه ۲", desc: "توضیحات پروژه ۲" },
        ],
        subfields: {
          title: { type: "text", default: "" },
          desc: { type: "textarea", default: "" },
        },
      },
    },
  },
  {
    name: "اپلیکیشن‌های اندرویدی",
    path: "/android",
    fields: {
      cards: {
        type: "array",
        default: [
          {
            title: "اپلیکیشن ScoreBoard",
            desc: "یک اپلیکیشن بسیار کاربردی برای نمایش و ویرایش امتیاز مخصوص ورزشگاه‌ها، کاملاً لوکال و پیشرفته. لطفاً جهت خرید یا سفارش تماس بگیرید.",
            src: "/assets/YY.png",
            type: "image",
          },
          {
            title: "اپلیکیشن فروشگاهی کدبانو",
            desc: "خرید راحت و بدون دردسر از سراسر کشور",
            src: "/assets/p2.png",
            type: "image",
          },
          {
            title: "اپلیکیشن آموزشی",
            desc: "یادگیری مهارت‌ها با ویدیو",
            src: "https://via.placeholder.com/300",
            type: "image",
          },
          {
            title: "اپلیکیشن پزشکی",
            desc: "نوبت‌دهی و مشاوره آنلاین",
            src: "https://via.placeholder.com/300",
            type: "image",
          },
          {
            title: "ویدیو ScoreBoard",
            desc: "نمایش اپلیکیشن ScoreBoard",
            src: "/assets/v1.mp4",
            type: "video",
          },
          {
            title: "ویدیو کدبانو",
            desc: "نمایش اپلیکیشن فروشگاهی کدبانو",
            src: "/assets/scoreboard.mp4",
            type: "video",
          },
        ],
        subfields: {
          title: { type: "text", default: "" },
          desc: { type: "textarea", default: "" },
          src: { type: "text", default: "" },
          type: { type: "text", default: "image" }, // image یا video
        },
      },
    },
  },
];