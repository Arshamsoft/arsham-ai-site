import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../pagesConfig';

const PageManager = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [content, setContent] = useState({});
  const [newContent, setNewContent] = useState('');
  const [operation, setOperation] = useState(null); // 'edit', 'add', 'delete'
  const [editingField, setEditingField] = useState(null); // برای فیلدهای خاص
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPage) {
      const savedContent = localStorage.getItem(`pageContent_${selectedPage.name}`);
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          setContent(parsedContent);
        } catch (err) {
          console.error('خطا در لود محتوا:', err);
          setContent(getDefaultContent(selectedPage.name));
        }
      } else {
        setContent(getDefaultContent(selectedPage.name));
      }
    }
  }, [selectedPage]);

  const getDefaultContent = (pageName) => {
    switch (pageName) {
      case 'Home':
        return {
          card1: 'برنامه‌نویسی برای کسب‌وکارهایی مثل فروشگاه‌های آنلاین، شرکت‌های خدماتی، آموزشگاه‌ها و استارتاپ‌ها یه ابزار قدرتمنده. با طراحی نرم‌افزار اختصاصی و اتوماسیون، می‌تونی سرعت، دقت و درآمدت رو چند برابر کنی.',
          card2: 'با Arshamai، آینده‌ی دیجیتال کسب‌وکار خودت رو بساز. طراحی سریع، ترجمه هوشمند، و تجربه کاربری بی‌نقص.',
        };
      case 'About':
        return {
          content: `من ارشام هستم، توسعه‌دهنده‌ی وب با بیش از ۵ سال تجربه در طراحی رابط کاربری، توسعه فرانت‌اند و ساخت وب‌سایت‌های حرفه‌ای برای برندها و کسب‌وکارهای مختلف.
تمرکز من روی ساخت تجربه‌های کاربری روان، زیبا و سریع با استفاده از React، TailwindCSS و تکنولوژی‌های مدرن هست.`,
        };
      case 'Shop':
        return {
          services: [
            { title: 'طراحی سایت اختصاصی', price: '۵۰۰ یورو', desc: 'طراحی ریسپانسیو با UI/UX حرفه‌ای' },
            { title: 'سئو و بهینه‌سازی', price: '۳۰۰ یورو', desc: 'افزایش رتبه گوگل و سرعت سایت' },
            { title: 'مشاوره فنی', price: '۱۰۰ یورو', desc: 'راهنمایی برای انتخاب تکنولوژی مناسب' },
          ],
        };
      case 'Contact':
        return {
          title: 'تماس با من',
          namePlaceholder: 'نام شما',
          emailPlaceholder: 'ایمیل',
          messagePlaceholder: 'پیام شما',
          buttonText: 'ارسال پیام',
        };
      case 'Footer':
        return {
          copyright: `© ${new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام`,
          licenses: ['نماد اعتماد الکترونیکی', 'ساماندهی رسانه‌های دیجیتال', 'عضو اتحادیه کسب‌وکارهای اینترنتی'],
        };
      case 'Header':
        return {
          home: 'خانه',
          portfolio: 'محصولات',
          shop: 'فروشگاه',
          about: 'درباره ما',
          contact: 'تماس با ما',
        };
      default:
        return { content: `محتوای پیش‌فرض برای ${pageName}` };
    }
  };

  const handleStartOperation = (page, op, field = null) => {
    setSelectedPage(page);
    setOperation(op);
    setEditingField(field);
    setNewContent('');
  };

  const handleSave = () => {
    if (operation === 'edit' && editingField) {
      let updatedContent = { ...content };
      if (editingField.includes('[')) {
        // برای آرایه‌ها مثل services یا licenses
        const [field, index] = editingField.match(/(\w+)\[(\d+)\]/).slice(1);
        updatedContent[field] = [...content[field]];
        updatedContent[field][index] = content[field][index];
      } else if (editingField.includes('services[')) {
        // برای توضیحات خدمات در Shop
        const index = parseInt(editingField.match(/\[(\d+)\]/)[1]);
        updatedContent.services = [...content.services];
        updatedContent.services[index].desc = content.services[index].desc;
      } else {
        updatedContent[editingField] = content[editingField];
      }
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`تغییرات برای ${selectedPage.name} (${editingField}) ذخیره شد.`);
    } else if (operation === 'add') {
      const updatedContent = { ...content, additional: (content.additional || '') + '\n' + newContent };
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`مطلب جدید به ${selectedPage.name} اضافه شد:\n${newContent}`);
    }
    setSelectedPage(null);
    setOperation(null);
    setEditingField(null);
    setContent({});
    setNewContent('');
  };

  const handleDelete = (pageName) => {
    if (window.confirm(`آیا مطمئن هستید که می‌خواهید محتوای ${pageName} را حذف کنید؟`)) {
      localStorage.removeItem(`pageContent_${pageName}`);
      alert(`محتوای ${pageName} حذف شد.`);
    }
  };

  const handleView = (pagePath) => {
    navigate(pagePath);
  };

  const renderEditFields = () => {
    if (!selectedPage || operation !== 'edit') return null;
    switch (selectedPage.name) {
      case 'Home':
        return (
          <>
            <textarea
              value={content.card1 || ''}
              onChange={(e) => setContent({ ...content, card1: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="5"
              placeholder="محتوای کارت ۱ را ویرایش کنید..."
            />
            <textarea
              value={content.card2 || ''}
              onChange={(e) => setContent({ ...content, card2: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="محتوای کارت ۲ را ویرایش کنید..."
            />
          </>
        );
      case 'About':
        return (
          <textarea
            value={content.content || ''}
            onChange={(e) => setContent({ ...content, content: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="10"
            placeholder="محتوای صفحه درباره را ویرایش کنید..."
          />
        );
      case 'Shop':
        return content.services?.map((service, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-semibold">خدمت {index + 1}: {service.title}</h4>
            <textarea
              value={service.desc}
              onChange={(e) => {
                const updatedServices = [...content.services];
                updatedServices[index].desc = e.target.value;
                setContent({ ...content, services: updatedServices });
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder={`توضیحات خدمت ${service.title} را ویرایش کنید...`}
            />
          </div>
        ));
      case 'Contact':
        return (
          <>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="عنوان فرم را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.namePlaceholder || ''}
              onChange={(e) => setContent({ ...content, namePlaceholder: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Placeholder نام را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.emailPlaceholder || ''}
              onChange={(e) => setContent({ ...content, emailPlaceholder: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Placeholder ایمیل را ویرایش کنید..."
            />
            <textarea
              value={content.messagePlaceholder || ''}
              onChange={(e) => setContent({ ...content, messagePlaceholder: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows="4"
              placeholder="Placeholder پیام را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.buttonText || ''}
              onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="متن دکمه را ویرایش کنید..."
            />
          </>
        );
      case 'Footer':
        return (
          <>
            <input
              type="text"
              value={content.copyright || ''}
              onChange={(e) => setContent({ ...content, copyright: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن کپی‌رایت را ویرایش کنید..."
            />
            {content.licenses?.map((license, index) => (
              <input
                key={index}
                type="text"
                value={license}
                onChange={(e) => {
                  const updatedLicenses = [...content.licenses];
                  updatedLicenses[index] = e.target.value;
                  setContent({ ...content, licenses: updatedLicenses });
                }}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                placeholder={`مجوز ${index + 1} را ویرایش کنید...`}
              />
            ))}
          </>
        );
      case 'Header':
        return (
          <>
            <input
              type="text"
              value={content.home || ''}
              onChange={(e) => setContent({ ...content, home: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن لینک خانه را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.portfolio || ''}
              onChange={(e) => setContent({ ...content, portfolio: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن لینک محصولات را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.shop || ''}
              onChange={(e) => setContent({ ...content, shop: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن لینک فروشگاه را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.about || ''}
              onChange={(e) => setContent({ ...content, about: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن لینک درباره را ویرایش کنید..."
            />
            <input
              type="text"
              value={content.contact || ''}
              onChange={(e) => setContent({ ...content, contact: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="متن لینک تماس را ویرایش کنید..."
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">مدیریت صفحات</h2>
      <p className="mb-8 text-gray-600">صفحات سایت رو از اینجا مدیریت کنید.</p>
      {selectedPage && operation ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">عملیات روی صفحه: {selectedPage.name}</h3>
          {operation === 'edit' && renderEditFields()}
          {operation === 'add' && (
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="مطلب جدید را وارد کنید..."
            />
          )}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              ذخیره
            </button>
            <button
              onClick={() => {
                setSelectedPage(null);
                setOperation(null);
                setEditingField(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              لغو
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{page.name}</h3>
              <p className="text-gray-500 mb-4">مسیر: {page.path}</p>
              <div className="flex space-x-3 flex-wrap">
                {page.name === 'Home' && (
                  <>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'card1')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش کارت ۱
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'card2')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش کارت ۲
                    </button>
                  </>
                )}
                {page.name === 'About' && (
                  <button
                    onClick={() => handleStartOperation(page, 'edit', 'content')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    ویرایش محتوا
                  </button>
                )}
                {page.name === 'Shop' && (
                  <>
                    {content.services?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleStartOperation(page, 'edit', `services[${index}].desc`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        ویرایش خدمت {index + 1}
                      </button>
                    ))}
                  </>
                )}
                {page.name === 'Contact' && (
                  <>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'title')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش عنوان
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'namePlaceholder')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش نام
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'emailPlaceholder')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش ایمیل
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'messagePlaceholder')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش پیام
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'buttonText')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش دکمه
                    </button>
                  </>
                )}
                {page.name === 'Footer' && (
                  <>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'copyright')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش کپی‌رایت
                    </button>
                    {content.licenses?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleStartOperation(page, 'edit', `licenses[${index}]`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        ویرایش مجوز {index + 1}
                      </button>
                    ))}
                  </>
                )}
                {page.name === 'Header' && (
                  <>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'home')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش لینک خانه
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'portfolio')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش لینک محصولات
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'shop')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش لینک فروشگاه
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'about')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش لینک درباره
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'edit', 'contact')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش لینک تماس
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleView(page.path)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
                >
                  مشاهده
                </button>
                <button
                  onClick={() => handleDelete(page.name)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  حذف
                </button>
                <button
                  onClick={() => handleStartOperation(page, 'add')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  اضافه مطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageManager;