// frontend/src/App.js (کامل جایگزین کن)
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blog from './pages/Blog';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AndroidApp from "./pages/AndroidApp";
import VisitTracker from './components/VisitTracker';

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
      <VisitTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/android" element={<AndroidApp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;