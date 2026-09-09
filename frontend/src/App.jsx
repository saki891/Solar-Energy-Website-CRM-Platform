import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import { themes } from './context/ThemeContext';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = isDark ? themes.dark : themes.light;

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage theme={theme} setCurrentPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage theme={theme} setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <BlogPage theme={theme} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage theme={theme} setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage theme={theme} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div
      className="min-h-screen font-sans antialiased selection:bg-[#1F5C3E] selection:text-white transition-colors duration-200"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <Header
        theme={theme}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}
