import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import { LanguageProvider } from './LanguageContext'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      {/* سایر کامپوننت‌ها مثل Header و Routes */}
    </LanguageProvider>
  )
}

export default App
