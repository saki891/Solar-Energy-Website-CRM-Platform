import React, { useState } from 'react';
import { Leaf, ChevronDown, Search, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

export default function Header({ theme, isDark, toggleTheme, currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'calculators', label: 'Calculators', hasDropdown: true },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    if (['home', 'about', 'services', 'blog', 'contact'].includes(id)) {
      setCurrentPage(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-200 border-b"
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Circular Dark Green Logo Mark + Wordmark & Tagline */}
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
            style={{ backgroundColor: theme.green }}
          >
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold text-xl tracking-tight leading-none"
              style={{ color: theme.text }}
            >
              SOLARA
            </span>
            <span
              className="text-[11px] font-medium tracking-tight mt-0.5"
              style={{ color: theme.textFaint }}
            >
              Clean Energy, Brighter Tomorrow.
            </span>
          </div>
        </button>

        {/* Center: Nav links + Search icon */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <nav className="flex items-center gap-6 xl:gap-7 text-[15px]">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="relative group">
                    <button
                      type="button"
                      className="font-medium transition-colors py-1 flex items-center gap-1 focus:outline-none"
                      style={{
                        color: isActive ? theme.green : theme.textMuted,
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className="w-4 h-4 transition-colors"
                        style={{ color: theme.textFaint }}
                      />
                    </button>

                    {/* Submenu */}
                    <div
                      className="absolute top-full left-0 mt-2 w-52 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50 border"
                      style={{
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                      }}
                    >
                      <a
                        href="#solar-savings"
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{ color: theme.textMuted }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.bgAlt;
                          e.currentTarget.style.color = theme.green;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = theme.textMuted;
                        }}
                      >
                        Solar Savings Calculator
                      </a>
                      <a
                        href="#roof-calculator"
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{ color: theme.textMuted }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.bgAlt;
                          e.currentTarget.style.color = theme.green;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = theme.textMuted;
                        }}
                      >
                        Roof Capacity Calculator
                      </a>
                      <a
                        href="#roi-estimator"
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{ color: theme.textMuted }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.bgAlt;
                          e.currentTarget.style.color = theme.green;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = theme.textMuted;
                        }}
                      >
                        ROI Estimator
                      </a>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                  style={{
                    color: isActive ? theme.green : theme.textMuted,
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-[-2px] left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: theme.green }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Button */}
          <button
            type="button"
            className="p-2 rounded-full transition-colors focus:outline-none"
            style={{ color: theme.textMuted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.green;
              e.currentTarget.style.backgroundColor = theme.bgAlt;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.textMuted;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Right: Theme Toggle & Get a Free Quote */}
        <div className="flex items-center gap-3">
          {/* Circular Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 focus:outline-none"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.card,
              color: theme.text,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.green)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
            aria-label="Toggle Theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#1F5C3E]" />
            )}
          </button>

          {/* Get a Free Quote Button */}
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center gap-2 font-medium text-sm px-5 py-2.5 rounded-full transition-colors text-white"
            style={{ backgroundColor: theme.green }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors focus:outline-none"
            style={{ color: theme.text }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-4 pt-2 pb-6 space-y-4 transition-colors"
          style={{
            backgroundColor: theme.bg,
            borderColor: theme.border,
          }}
        >
          <nav className="flex flex-col space-y-1 text-base font-medium">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="py-2 border-b" style={{ borderColor: `${theme.border}40` }}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between text-left"
                      style={{ color: theme.textMuted }}
                      onClick={() => setCalculatorsOpen(!calculatorsOpen)}
                    >
                      <span>Calculators</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          calculatorsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {calculatorsOpen && (
                      <div className="pl-4 mt-2 space-y-2 text-sm" style={{ color: theme.textFaint }}>
                        <a href="#solar-savings" className="block py-1">
                          Solar Savings Calculator
                        </a>
                        <a href="#roof-calculator" className="block py-1">
                          Roof Capacity Calculator
                        </a>
                        <a href="#roi-estimator" className="block py-1">
                          ROI Estimator
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 border-b transition-colors ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                  style={{
                    color: isActive ? theme.green : theme.textMuted,
                    borderColor: `${theme.border}40`,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 flex items-center justify-between gap-3">
            {/* Mobile Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#1F5C3E]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* Mobile Get Quote Button */}
            <a
              href="#quote"
              className="flex-1 inline-flex items-center justify-center gap-2 text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors text-center"
              style={{ backgroundColor: theme.green }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
