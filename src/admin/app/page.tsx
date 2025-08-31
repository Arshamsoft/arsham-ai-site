"use client"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Shield, Zap, Users } from "lucide-react"

export default function Page() {
  const navigate = useNavigate()

  const handleAdminLogin = () => {
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Arshamai</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">پلتفرم حرفه‌ای برنامه‌نویسی و طراحی وب</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAdminLogin}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Shield size={20} />
                <span>ورود به پنل مدیریت</span>
                <ArrowLeft size={16} />
              </button>
              <button className="bg-card text-card-foreground border border-border px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                مشاهده نمونه کارها
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">ویژگی‌های کلیدی</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              با استفاده از جدیدترین تکنولوژی‌ها، بهترین تجربه را برای کسب‌وکار شما فراهم می‌کنیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">سرعت بالا</h3>
              <p className="text-muted-foreground">وب‌سایت‌های بهینه شده با سرعت لود بالا و عملکرد عالی</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">امنیت بالا</h3>
              <p className="text-muted-foreground">حفاظت کامل از داده‌ها با استفاده از آخرین استانداردهای امنیتی</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-chart-3" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">تجربه کاربری عالی</h3>
              <p className="text-muted-foreground">طراحی کاربرپسند و responsive برای همه دستگاه‌ها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Arshamai.com | طراحی و توسعه توسط ارشام
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
