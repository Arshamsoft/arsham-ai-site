import { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AndroidApp from './pages/AndroidApp';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Support from './pages/Support';
import TicketView from './pages/TicketView';
import PaymentResult from './pages/PaymentResult';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { CustomerProvider } from './context/CustomerContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Splash, { shouldShowSplash } from './components/Splash';
import VisitTracker from './components/VisitTracker';
import ChatWidget from './components/ChatWidget';
import { logoMarkSvgString } from './components/Logo';

// تم ذخیره‌شده و آیکون تب مرورگر، قبل از اولین رندر (جهت و زبان صفحه در LanguageContext تنظیم می‌شه)
(function prepareDocument() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  let theme = 'dark';
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    // دسترسی به localStorage نبود؛ تم پیش‌فرض
  }
  root.classList.toggle('dark', theme === 'dark');
  root.style.setProperty('--hero-delay', shouldShowSplash() ? '1500ms' : '0ms');

  const icon = `data:image/svg+xml,${encodeURIComponent(logoMarkSvgString())}`;
  let link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = icon;
})();

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      <Background />
      <ScrollProgress />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main key={pathname} className="page-enter flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <CustomerProvider>
        <VisitTracker />
        <Splash />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/android" element={<AndroidApp />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/:id" element={<TicketView />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </CustomerProvider>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;
