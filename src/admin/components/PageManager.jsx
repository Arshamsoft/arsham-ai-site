"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Edit = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const Eye = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const Trash2 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const Plus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Search = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const Filter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
  </svg>
)

const FileText = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
)

const PageManager = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPage, setSelectedPage] = useState(null)
  const [content, setContent] = useState({})
  const [operation, setOperation] = useState(null)

  const pages = [
    { name: "خانه", path: "/", status: "منتشر شده", lastModified: "۲ ساعت پیش" },
    { name: "درباره ما", path: "/about", status: "منتشر شده", lastModified: "۱ روز پیش" },
    { name: "محصولات", path: "/portfolio", status: "منتشر شده", lastModified: "۳ روز پیش" },
    { name: "فروشگاه", path: "/shop", status: "منتشر شده", lastModified: "۱ هفته پیش" },
    { name: "تماس با ما", path: "/contact", status: "منتشر شده", lastModified: "۲ هفته پیش" },
    { name: "هدر", path: "/header", status: "منتشر شده", lastModified: "۱ ماه پیش" },
    { name: "فوتر", path: "/footer", status: "منتشر شده", lastModified: "۱ ماه پیش" },
  ]

  const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleEdit = (page) => {
    // Navigate to edit page or open modal
    console.log("Editing page:", page.name)
  }

  const handleView = (page) => {
    navigate(page.path)
  }

  const handleDelete = (page) => {
    if (window.confirm(`آیا مطمئن هستید که می‌خواهید صفحه "${page.name}" را حذف کنید؟`)) {
      console.log("Deleting page:", page.name)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "منتشر شده":
        return "bg-green-100 text-green-800"
      case "پیش‌نویس":
        return "bg-yellow-100 text-yellow-800"
      case "آرشیو":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت صفحات</h1>
          <p className="text-muted-foreground mt-1">مدیریت و ویرایش صفحات سایت</p>
        </div>
        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors flex items-center space-x-2 space-x-reverse">
          <Plus size={18} />
          <span>صفحه جدید</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="جستجو در صفحات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <button className="bg-muted text-muted-foreground px-4 py-2.5 rounded-lg hover:bg-muted/80 transition-colors flex items-center space-x-2 space-x-reverse">
            <Filter size={18} />
            <span>فیلتر</span>
          </button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">نام صفحه</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">مسیر</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">وضعیت</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">آخرین تغییر</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPages.map((page, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-card-foreground">{page.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-muted px-2 py-1 rounded text-muted-foreground">{page.path}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{page.lastModified}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEdit(page)}
                        className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleView(page)}
                        className="p-2 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                        title="مشاهده"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(page)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPages.length === 0 && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" /> {/* Added FileText component */}
          <h3 className="text-lg font-medium text-card-foreground mb-2">صفحه‌ای یافت نشد</h3>
          <p className="text-muted-foreground mb-4">هیچ صفحه‌ای با این جستجو پیدا نشد.</p>
          <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
            پاک کردن جستجو
          </button>
        </div>
      )}
    </div>
  )
}

export default PageManager
