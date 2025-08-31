"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../components/supabase/client"




// Custom SVG icons
const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const MessageSquareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
)

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalPages: 0,
    totalComments: 0,
    totalViews: 0,
    totalUsers: 0,
    growthRate: 0,
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch posts count
      const { count: postsCount } = await supabase.from("posts").select("*", { count: "exact", head: true })

      // Fetch pages count
      const { count: pagesCount } = await supabase.from("pages").select("*", { count: "exact", head: true })

      // Fetch comments count
      const { count: commentsCount } = await supabase.from("comments").select("*", { count: "exact", head: true })

      // Fetch profiles count
      const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

      // Fetch recent activities
      const { data: recentPosts } = await supabase
        .from("posts")
        .select("title, created_at, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(3)

      const { data: recentComments } = await supabase
        .from("comments")
        .select("content, created_at, profiles(full_name), posts(title)")
        .order("created_at", { ascending: false })
        .limit(2)

      // Update stats
      setStats({
        totalPosts: postsCount || 0,
        totalPages: pagesCount || 0,
        totalComments: commentsCount || 0,
        totalViews: Math.floor(Math.random() * 2000) + 1000, // Mock data for views
        totalUsers: usersCount || 0,
        growthRate: 12.5, // Mock growth rate
      })

      // Format recent activities
      const activities = []

      if (recentPosts) {
        recentPosts.forEach((post) => {
          activities.push({
            id: `post-${post.title}`,
            action: "نوشته جدید منتشر شد",
            title: post.title,
            time: formatTimeAgo(post.created_at),
            user: post.profiles?.full_name || "نامشخص",
            type: "post",
          })
        })
      }

      if (recentComments) {
        recentComments.forEach((comment) => {
          activities.push({
            id: `comment-${comment.content}`,
            action: "نظر جدید",
            title: `در نوشته '${comment.posts?.title || "نامشخص"}'`,
            time: formatTimeAgo(comment.created_at),
            user: comment.profiles?.full_name || "نامشخص",
            type: "comment",
          })
        })
      }

      // Sort by time and limit to 5
      activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      setRecentActivities(activities.slice(0, 5))
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "کمتر از یک ساعت پیش"
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} روز پیش`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks} هفته پیش`

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} ماه پیش`
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "post":
        return <EditIcon size={16} className="text-accent" />
      case "comment":
        return <MessageSquareIcon size={16} className="text-secondary" />
      case "page":
        return <FileTextIcon size={16} className="text-chart-3" />
      case "user":
        return <UsersIcon size={16} className="text-chart-4" />
      case "media":
        return <ImageIcon size={16} className="text-chart-1" />
      default:
        return <ActivityIcon size={16} className="text-muted-foreground" />
    }
  }

  const quickActions = [
    {
      title: "نوشته جدید",
      icon: PlusIcon,
      action: () => navigate("/admin/posts/new"),
      color: "bg-accent",
      desc: "ایجاد محتوای جدید",
    },
    {
      title: "صفحه جدید",
      icon: FileTextIcon,
      action: () => navigate("/admin/pages/new"),
      color: "bg-secondary",
      desc: "افزودن صفحه استاتیک",
    },
    {
      title: "آپلود رسانه",
      icon: ImageIcon,
      action: () => navigate("/admin/media"),
      color: "bg-chart-3",
      desc: "مدیریت تصاویر و فایل‌ها",
    },
    {
      title: "مشاهده نظرات",
      icon: MessageSquareIcon,
      action: () => navigate("/admin/comments"),
      color: "bg-chart-4",
      desc: "بررسی نظرات کاربران",
    },
  ]

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
          <h1 className="text-2xl font-bold text-foreground">داشبورد</h1>
          <p className="text-muted-foreground mt-1">خوش آمدید به پنل مدیریت سایت ارشام</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
            <CalendarIcon size={16} />
            <span>{new Date().toLocaleDateString("fa-IR")}</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors flex items-center space-x-2 space-x-reverse"
          >
            <GlobeIcon size={16} />
            <span>مشاهده سایت</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">نوشته‌ها</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{stats.totalPosts}</p>
              <p className="text-xs text-muted-foreground mt-1">مجموع نوشته‌ها</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <EditIcon className="text-accent" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">صفحات</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{stats.totalPages}</p>
              <p className="text-xs text-muted-foreground mt-1">مجموع صفحات</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <FileTextIcon className="text-secondary" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">نظرات</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{stats.totalComments}</p>
              <p className="text-xs text-muted-foreground mt-1">مجموع نظرات</p>
            </div>
            <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
              <MessageSquareIcon className="text-chart-3" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">کاربران</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{stats.totalUsers}</p>
              <p className="text-xs text-chart-1 mt-1 flex items-center">
                <TrendingUpIcon size={12} className="ml-1" />
                کاربران ثبت نام شده
              </p>
            </div>
            <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
              <UsersIcon className="text-chart-1" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
            <StarIcon size={20} className="ml-2 text-accent" />
            عملیات سریع
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center p-4 rounded-lg border border-border hover:bg-muted transition-colors text-right"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center ml-4`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-card-foreground">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
            <ActivityIcon size={20} className="ml-2 text-secondary" />
            فعالیت‌های اخیر
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 space-x-reverse p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {activity.action}
                    {activity.title && <span className="text-accent"> "{activity.title}"</span>}
                  </p>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs text-muted-foreground mt-1">
                    <ClockIcon size={12} />
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>توسط {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Widget */}
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">به پنل مدیریت خوش آمدید!</h3>
            <p className="text-muted-foreground">
              از این پنل می‌توانید تمام بخش‌های سایت خود را مدیریت کنید. برای شروع، یک نوشته جدید ایجاد کنید یا صفحات
              موجود را ویرایش کنید.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
              <StarIcon className="text-accent" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
