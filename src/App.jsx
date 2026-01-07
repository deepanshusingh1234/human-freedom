import React, { useState } from 'react';


import './App.css'
import Header from './component/Header'
import HomeContent from './component/HomeContent'
import AboutPage from './component/About'
import ContactPage from './component/Contact'
import BlogPage from './component/Blog'
import FAQPage from './component/Faq'
import Footer from './component/Footer'


function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomeContent />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="App">
      <Header activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
