"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const LayoutDashboard = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
)

const FileText = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
)

const Settings = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82V9a1.65 1.65 0 0 0 1.51 1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const Users = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const BarChart3 = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
)

const ChevronLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6" />
  </svg>
)

const ChevronRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)

const LogOut = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const ImageIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

const MessageSquare = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const Palette = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

const Plug = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
  </svg>
)

const ChevronDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
)

const ChevronUp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18,15 12,9 6,15" />
  </svg>
)

const Edit3 = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const Plus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const location = useLocation()

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  const menuItems = [
    {
      title: "داشبورد",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      active: location.pathname === "/admin/dashboard" || location.pathname === "/admin",
    },
    {
      title: "نوشته‌ها",
      icon: Edit3,
      key: "posts",
      submenu: [
        { title: "همه نوشته‌ها", path: "/admin/posts", icon: FileText },
        { title: "افزودن نوشته", path: "/admin/posts/new", icon: Plus },
        { title: "دسته‌بندی‌ها", path: "/admin/categories", icon: FileText },
        { title: "برچسب‌ها", path: "/admin/tags", icon: FileText },
      ],
    },
    {
      title: "رسانه‌ها",
      icon: ImageIcon,
      path: "/admin/media",
      active: location.pathname === "/admin/media",
    },
    {
      title: "صفحات",
      icon: FileText,
      key: "pages",
      submenu: [
        { title: "همه صفحات", path: "/admin/pages", icon: FileText },
        { title: "افزودن صفحه", path: "/admin/pages/new", icon: Plus },
      ],
    },
    {
      title: "نظرات",
      icon: MessageSquare,
      path: "/admin/comments",
      active: location.pathname === "/admin/comments",
    },
    {
      title: "ظاهر",
      icon: Palette,
      key: "appearance",
      submenu: [
        { title: "قالب‌ها", path: "/admin/themes", icon: Palette },
        { title: "سفارشی‌سازی", path: "/admin/customize", icon: Settings },
        { title: "منوها", path: "/admin/menus", icon: FileText },
        { title: "ویجت‌ها", path: "/admin/widgets", icon: Settings },
      ],
    },
    {
      title: "افزونه‌ها",
      icon: Plug,
      path: "/admin/plugins",
      active: location.pathname === "/admin/plugins",
    },
    {
      title: "کاربران",
      icon: Users,
      path: "/admin/users",
      active: location.pathname === "/admin/users",
    },
    {
      title: "آمار و گزارش",
      icon: BarChart3,
      path: "/admin/analytics",
      active: location.pathname === "/admin/analytics",
    },
    {
      title: "تنظیمات",
      icon: Settings,
      key: "settings",
      submenu: [
        { title: "عمومی", path: "/admin/settings/general", icon: Settings },
        { title: "نوشتن", path: "/admin/settings/writing", icon: Edit3 },
        { title: "خواندن", path: "/admin/settings/reading", icon: FileText },
        { title: "رسانه", path: "/admin/settings/media", icon: ImageIcon },
      ],
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    window.location.href = "/admin/login"
  }

  const isSubmenuActive = (submenu) => {
    return submenu.some((item) => location.pathname === item.path)
  }

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <span className="text-sidebar-accent-foreground font-bold text-sm">A</span>
              </div>
              <div>
                <h2 className="text-sidebar-foreground font-semibold text-sm">Arshamai</h2>
                <p className="text-sidebar-foreground/60 text-xs">پنل مدیریت</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent/10 text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isExpanded = expandedMenus[item.key]
            const isActive = item.active || (hasSubmenu && isSubmenuActive(item.submenu))

            return (
              <li key={item.path || item.key}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Icon size={18} />
                        {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </div>
                      {!collapsed && (
                        <div className="transition-transform duration-200">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      )}
                    </button>
                    {!collapsed && isExpanded && (
                      <ul className="mt-1 mr-6 space-y-1">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg transition-colors text-sm ${
                                  location.pathname === subItem.path
                                    ? "bg-sidebar-accent/20 text-sidebar-accent"
                                    : "text-sidebar-foreground/80 hover:bg-sidebar-primary/50 hover:text-sidebar-primary-foreground"
                                }`}
                              >
                                <SubIcon size={16} />
                                <span>{subItem.title}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg transition-colors ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                    }`}
                  >
                    <Icon size={18} />
                    {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">خروج</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
