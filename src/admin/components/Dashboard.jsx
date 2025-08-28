import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../pagesConfig';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [content, setContent] = useState({});
  const [newContent, setNewContent] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [newCardType, setNewCardType] = useState('text');
  const [newCardSrc, setNewCardSrc] = useState('');
  const [newContainerTitle, setNewContainerTitle] = useState('');
  const [newContainerContent, setNewContainerContent] = useState('');
  const [operation, setOperation] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [editingContainerIndex, setEditingContainerIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPage) {
      const savedContent = localStorage.getItem(`pageContent_${selectedPage.name}`);
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          setContent(parsedContent);
        } catch (err) {
          console.error(`خطا در لود محتوای ${selectedPage.name}:`, err);
          setContent(getDefaultContent(selectedPage));
        }
      } else {
        setContent(getDefaultContent(selectedPage));
      }
    }
  }, [selectedPage]);

  const getDefaultContent = (page) => {
    const defaultContent = {};
    Object.keys(page.fields).forEach((key) => {
      defaultContent[key] = page.fields[key].default;
    });
    return { ...defaultContent, cards: [], containers: [] };
  };

  const handleStartOperation = (page, op, field = null, cardIndex = null, containerIndex = null) => {
    setSelectedPage(page);
    setOperation(op);
    setEditingField(field);
    setEditingCardIndex(cardIndex);
    setEditingContainerIndex(containerIndex);
    if (cardIndex !== null && op === 'edit' && field?.includes('cards[')) {
      setNewCardTitle(content.cards?.[cardIndex]?.title || '');
      setNewCardDesc(content.cards?.[cardIndex]?.desc || '');
      setNewCardType(content.cards?.[cardIndex]?.type || 'text');
      setNewCardSrc(content.cards?.[cardIndex]?.src || '');
    } else if (containerIndex !== null && op === 'edit' && field?.includes('containers[')) {
      setNewContainerTitle(content.containers?.[containerIndex]?.title || '');
      setNewContainerContent(content.containers?.[containerIndex]?.content || '');
    } else if (field?.includes('[') && op === 'edit') {
      const [arrayKey, index, subKey] = field.match(/(\w+)\[(\d+)\]\.(\w+)/)?.slice(1) || [];
      if (arrayKey && subKey) {
        setNewContent(content[arrayKey]?.[index]?.[subKey] || '');
      } else {
        setNewContent('');
      }
    } else {
      setNewCardTitle('');
      setNewCardDesc('');
      setNewCardType('text');
      setNewCardSrc('');
      setNewContainerTitle('');
      setNewContainerContent('');
      setNewContent(content[field] || '');
    }
  };

  const handleSave = () => {
    if (!selectedPage) return;
    let updatedContent = { ...content };
    if (operation === 'edit' && editingField) {
      if (editingField.includes('[')) {
        if (editingField.includes('cards[')) {
          const index = parseInt(editingField.match(/\[(\d+)\]/)[1]);
          updatedContent.cards = [...(content.cards || [])];
          updatedContent.cards[index] = {
            title: newCardTitle,
            desc: newCardDesc,
            type: newCardType,
            src: newCardType !== 'text' ? newCardSrc : '',
          };
        } else if (editingField.includes('containers[')) {
          const index = parseInt(editingField.match(/\[(\d+)\]/)[1]);
          updatedContent.containers = [...(content.containers || [])];
          updatedContent.containers[index] = {
            title: newContainerTitle,
            content: newContainerContent,
          };
        } else {
          const [arrayKey, index, subKey] = editingField.match(/(\w+)\[(\d+)\]\.(\w+)/)?.slice(1) || [];
          if (arrayKey && subKey) {
            updatedContent[arrayKey] = [...(content[arrayKey] || [])];
            updatedContent[arrayKey][index] = {
              ...updatedContent[arrayKey][index],
              [subKey]: newContent,
            };
          }
        }
      } else {
        updatedContent[editingField] = newContent;
      }
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`تغییرات برای ${selectedPage.name} (${editingField}) ذخیره شد.`);
    } else if (operation === 'addCard') {
      updatedContent.cards = [
        ...(content.cards || []),
        { title: newCardTitle, desc: newCardDesc, type: newCardType, src: newCardType !== 'text' ? newCardSrc : '' },
      ];
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`کارت جدید به ${selectedPage.name} اضافه شد.`);
    } else if (operation === 'deleteCard' && editingCardIndex !== null) {
      updatedContent.cards = (content.cards || []).filter((_, i) => i !== editingCardIndex);
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`کارت حذف شد.`);
    } else if (operation === 'addContainer') {
      updatedContent.containers = [
        ...(content.containers || []),
        { title: newContainerTitle, content: newContainerContent },
      ];
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`کانتینر جدید به ${selectedPage.name} اضافه شد.`);
    } else if (operation === 'deleteContainer' && editingContainerIndex !== null) {
      updatedContent.containers = (content.containers || []).filter((_, i) => i !== editingContainerIndex);
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`کانتینر حذف شد.`);
    } else if (operation === 'add') {
      updatedContent.additional = (content.additional || '') + '\n' + newContent;
      localStorage.setItem(`pageContent_${selectedPage.name}`, JSON.stringify(updatedContent));
      alert(`مطلب جدید به ${selectedPage.name} اضافه شد:\n${newContent}`);
    }
    setSelectedPage(null);
    setOperation(null);
    setEditingField(null);
    setEditingCardIndex(null);
    setEditingContainerIndex(null);
    setContent({});
    setNewContent('');
    setNewCardTitle('');
    setNewCardDesc('');
    setNewCardType('text');
    setNewCardSrc('');
    setNewContainerTitle('');
    setNewContainerContent('');
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
    if (!selectedPage || operation !== 'edit' || editingField?.includes('cards[') || editingField?.includes('containers[')) return null;
    const fieldData = selectedPage.fields[editingField];
    if (!fieldData) return null;

    if (fieldData.type === 'array') {
      return (content[editingField] || fieldData.default).map((item, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-lg font-semibold">آیتم {index + 1}</h4>
          {Object.keys(fieldData.subfields || {}).map((subKey) => (
            <div key={subKey} className="mb-2">
              <label className="block text-gray-700 mb-1">{subKey}</label>
              {fieldData.subfields[subKey].type === 'textarea' ? (
                <textarea
                  value={content[editingField]?.[index]?.[subKey] || ''}
                  onChange={(e) => {
                    const updatedArray = [...(content[editingField] || fieldData.default)];
                    updatedArray[index] = { ...updatedArray[index], [subKey]: e.target.value };
                    setContent({ ...content, [editingField]: updatedArray });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder={`مقدار ${subKey} را وارد کنید...`}
                />
              ) : (
                <input
                  type="text"
                  value={content[editingField]?.[index]?.[subKey] || ''}
                  onChange={(e) => {
                    const updatedArray = [...(content[editingField] || fieldData.default)];
                    updatedArray[index] = { ...updatedArray[index], [subKey]: e.target.value };
                    setContent({ ...content, [editingField]: updatedArray });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder={`مقدار ${subKey} را وارد کنید...`}
                />
              )}
            </div>
          ))}
        </div>
      ));
    }

    return fieldData.type === 'textarea' ? (
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        placeholder={`مقدار ${editingField} را وارد کنید...`}
      />
    ) : (
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder={`مقدار ${editingField} را وارد کنید...`}
      />
    );
  };

  const renderCardForm = () => {
    if (operation !== 'addCard' && (operation !== 'edit' || !editingField?.includes('cards['))) return null;
    return (
      <div className="space-y-4">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="عنوان کارت"
        />
        <textarea
          value={newCardDesc}
          onChange={(e) => setNewCardDesc(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="4"
          placeholder="توضیحات کارت (برای کارت متنی)"
        />
        <select
          value={newCardType}
          onChange={(e) => setNewCardType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="text">متن</option>
          <option value="image">تصویر</option>
          <option value="video">ویدیو</option>
        </select>
        {(newCardType === 'image' || newCardType === 'video') && (
          <input
            type="text"
            value={newCardSrc}
            onChange={(e) => setNewCardSrc(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="لینک تصویر یا ویدیو"
          />
        )}
      </div>
    );
  };

  const renderContainerForm = () => {
    if (operation !== 'addContainer' && (operation !== 'edit' || !editingField?.includes('containers['))) return null;
    return (
      <div className="space-y-4">
        <input
          type="text"
          value={newContainerTitle}
          onChange={(e) => setNewContainerTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="عنوان کانتینر"
        />
        <textarea
          value={newContainerContent}
          onChange={(e) => setNewContainerContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="6"
          placeholder="محتوای کانتینر"
        />
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">خوش آمدید به داشبورد</h2>
      <p className="mb-8 text-gray-600">مدیریت صفحات سایت و محتوا از اینجا انجام می‌شه.</p>
      {selectedPage && operation ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">عملیات روی صفحه: {selectedPage.name}</h3>
          {operation === 'edit' && !editingField?.includes('cards[') && !editingField?.includes('containers[') && renderEditFields()}
          {(operation === 'addCard' || (operation === 'edit' && editingField?.includes('cards['))) && renderCardForm()}
          {(operation === 'addContainer' || (operation === 'edit' && editingField?.includes('containers['))) && renderContainerForm()}
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
                setEditingCardIndex(null);
                setEditingContainerIndex(null);
                setContent({});
                setNewContent('');
                setNewCardTitle('');
                setNewCardDesc('');
                setNewCardType('text');
                setNewCardSrc('');
                setNewContainerTitle('');
                setNewContainerContent('');
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
                {Object.keys(page.fields).map((field) =>
                  page.fields[field].type === 'array' ? (
                    (content[field] || page.fields[field].default).map((_, idx) => (
                      Object.keys(page.fields[field].subfields || {}).map((subKey) => (
                        <button
                          key={`${field}-${idx}-${subKey}`}
                          onClick={() => handleStartOperation(page, 'edit', `${field}[${idx}].${subKey}`)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          ویرایش {subKey} {idx + 1}
                        </button>
                      ))
                    ))
                  ) : (
                    <button
                      key={field}
                      onClick={() => handleStartOperation(page, 'edit', field)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش {field}
                    </button>
                  )
                )}
                <button
                  onClick={() => handleStartOperation(page, 'addCard')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  اضافه کارت
                </button>
                {(content.cards || []).map((card, index) => (
                  <div key={index} className="flex space-x-2">
                    <button
                      onClick={() => handleStartOperation(page, 'edit', `cards[${index}]`, index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش کارت {index + 1}
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'deleteCard', null, index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      حذف کارت {index + 1}
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleStartOperation(page, 'addContainer')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  اضافه کانتینر
                </button>
                {(content.containers || []).map((container, index) => (
                  <div key={index} className="flex space-x-2">
                    <button
                      onClick={() => handleStartOperation(page, 'edit', `containers[${index}]`, null, index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      ویرایش کانتینر {index + 1}
                    </button>
                    <button
                      onClick={() => handleStartOperation(page, 'deleteContainer', null, null, index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      حذف کانتینر {index + 1}
                    </button>
                  </div>
                ))}
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

export default Dashboard;