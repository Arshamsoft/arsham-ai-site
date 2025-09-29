import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import { LanguageProvider } from './context/LanguageContext';
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/components/Dashboard';
import PageManager from './admin/components/PageManager';
import Header from './components/Header';
import Footer from './components/Footer';
import AndroidApp from "./pages/AndroidApp"; // مسیر صفحه رو درست بذار

console.log('App.js: Imported components', {
  Home: !!Home,
  Portfolio: !!Portfolio,
  Shop: !!Shop,
  About: !!About,
  Contact: !!Contact,
  LanguageProvider: !!LanguageProvider,
  AdminPanel: !!AdminPanel,
  AdminLogin: !!AdminLogin,
  Dashboard: !!Dashboard,
  PageManager: !!PageManager,
  Header: !!Header,
  Footer: !!Footer,
});

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/android" element={<AndroidApp />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<PageManager />} />
          
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;