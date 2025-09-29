import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GenericPage from './components/GenericPage';
import { LanguageProvider } from './context/LanguageContext';
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/components/Dashboard';
import PageManager from './admin/components/PageManager';
import EditPost from './admin/components/EditPost';
import { pages } from './pagesConfig';
import AndroidApp from "./pages/AndroidApp"; // مسیر صفحه رو درست بذار

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Routes>
        {/* صفحات اصلی سایت */}
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={<GenericPage />} />
        ))}
        {/* پنل ادمین */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<PageManager />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="/android" element={<AndroidApp />} />
        </Route>
      </Routes>
      <Footer />
    </LanguageProvider>
  );
}

export default App;