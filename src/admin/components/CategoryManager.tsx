

import { useState, useEffect } from "react"
import { createClient } from "../lib/supabase/client"

// Custom SVG icons
const Edit = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

const Tag = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const CategoryManager = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ name: "", description: "", slug: "" })
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          *,
          posts(count)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        // Update existing category
        const { error } = await supabase.from("categories").update(formData).eq("id", editingCategory.id)

        if (error) throw error
        alert("دسته‌بندی با موفقیت به‌روزرسانی شد")
      } else {
        // Create new category
        const { error } = await supabase.from("categories").insert([formData])

        if (error) throw error
        alert("دسته‌بندی با موفقیت ایجاد شد")
      }

      setFormData({ name: "", description: "", slug: "" })
      setShowAddForm(false)
      setEditingCategory(null)
      fetchCategories()
    } catch (error) {
      console.error("Error saving category:", error)
      alert("خطا در ذخیره دسته‌بندی")
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      slug: category.slug,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (categoryId) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟")) {
      try {
        const { error } = await supabase.from("categories").delete().eq("id", categoryId)

        if (error) throw error

        setCategories(categories.filter((cat) => cat.id !== categoryId))
        alert("دسته‌بندی با موفقیت حذف شد")
      } catch (error) {
        console.error("Error deleting category:", error)
        alert("خطا در حذف دسته‌بندی")
      }
    }
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">در حال بارگذاری...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground mt-1">مدیریت دسته‌بندی‌های محتوا</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingCategory(null)
            setFormData({ name: "", description: "", slug: "" })
          }}
          className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors flex items-center space-x-2 space-x-reverse"
        >
          <Plus size={18} />
          <span>دسته‌بندی جدید</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">نام دسته‌بندی</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    })
                  }}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="نام دسته‌بندی را وارد کنید"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">نامک (Slug)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="category-slug"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">توضیحات</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="توضیحات دسته‌بندی (اختیاری)"
                rows="3"
              />
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                {editingCategory ? "به‌روزرسانی" : "ایجاد"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingCategory(null)
                  setFormData({ name: "", description: "", slug: "" })
                }}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Tag className="text-accent" size={24} />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  title="ویرایش"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  title="حذف"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{category.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{category.description || "بدون توضیحات"}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{category.posts?.length || 0} نوشته</span>
              <code className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">{category.slug}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Tag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">هیچ دسته‌بندی وجود ندارد</h3>
          <p className="text-muted-foreground mb-4">برای شروع، اولین دسته‌بندی خود را ایجاد کنید.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            ایجاد دسته‌بندی جدید
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryManager
