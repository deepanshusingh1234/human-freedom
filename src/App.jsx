import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './component/Header';
import HomeContent from './component/HomeContent';
import AboutPage from './component/About';
import ContactPage from './component/Contact';
import BlogPage from './component/Blog';
import FAQPage from './component/Faq';
import Footer from './component/Footer';
import CountryDetail from './component/CountryDetail';

function App() {
  return (

    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/country/:countryId" element={<CountryDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>

  );
}

export default App;