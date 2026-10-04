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
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Splash, { shouldShowSplash } from './components/Splash';
import VisitTracker from './components/VisitTracker';

// جهت راست‌به‌چپ و تم ذخیره‌شده، قبل از اولین رندر (بدون پرش رنگ)
(function prepareDocument() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('dir', 'rtl');
  root.setAttribute('lang', 'fa');
  let theme = 'dark';
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    // دسترسی به localStorage نبود؛ تم پیش‌فرض
  }
  root.classList.toggle('dark', theme === 'dark');
  root.style.setProperty('--hero-delay', shouldShowSplash() ? '1500ms' : '0ms');
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
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;
