import React, { useState } from 'react';
import { Leaf, ChevronDown, Search, ArrowRight, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBFAF6] border-b border-[#D8DED9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Logo Mark + Wordmark & Tagline */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-full bg-[#1F5C3E] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#16231C] text-xl tracking-tight leading-none">
              SOLARA
            </span>
            <span className="text-[11px] font-medium text-[#6B7A70] tracking-tight mt-0.5">
              Clean Energy, Brighter Tomorrow.
            </span>
          </div>
        </a>

        {/* Center: Nav links + Search icon */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <nav className="flex items-center gap-6 xl:gap-7 text-[15px]">
            {/* Home - Active */}
            <a
              href="#"
              className="font-semibold text-[#1F5C3E] relative py-1 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#1F5C3E] after:rounded-full"
            >
              Home
            </a>
            <a
              href="#about"
              className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1"
            >
              About Us
            </a>
            <a
              href="#services"
              className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1"
            >
              Services
            </a>
            <a
              href="#projects"
              className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1"
            >
              Projects
            </a>
            
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1 flex items-center gap-1 focus:outline-none"
                onClick={() => setCalculatorsOpen(!calculatorsOpen)}
              >
                Calculators
                <ChevronDown className="w-4 h-4 text-[#6B7A70] group-hover:text-[#1F5C3E] transition-colors" />
              </button>

              {/* Submenu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#D8DED9] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                <a
                  href="#solar-savings"
                  className="block px-4 py-2 text-sm text-[#4B584F] hover:bg-[#EFF3EC] hover:text-[#1F5C3E] transition-colors"
                >
                  Solar Savings Calculator
                </a>
                <a
                  href="#roof-calculator"
                  className="block px-4 py-2 text-sm text-[#4B584F] hover:bg-[#EFF3EC] hover:text-[#1F5C3E] transition-colors"
                >
                  Roof Capacity Calculator
                </a>
                <a
                  href="#roi-estimator"
                  className="block px-4 py-2 text-sm text-[#4B584F] hover:bg-[#EFF3EC] hover:text-[#1F5C3E] transition-colors"
                >
                  ROI Estimator
                </a>
              </div>
            </div>

            <a
              href="#blog"
              className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="font-medium text-[#4B584F] hover:text-[#1F5C3E] transition-colors py-1"
            >
              Contact
            </a>
          </nav>

          {/* Search icon */}
          <button
            type="button"
            className="p-2 text-[#4B584F] hover:text-[#1F5C3E] hover:bg-[#EFF3EC] rounded-full transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Right: Get a Free Quote Button & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#1F5C3E] hover:bg-[#184A32] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#16231C] hover:bg-[#EFF3EC] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#16231C]" />
            ) : (
              <Menu className="w-6 h-6 text-[#16231C]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFAF6] border-b border-[#D8DED9] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium">
            <a
              href="#"
              className="text-[#1F5C3E] font-semibold py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#4B584F] hover:text-[#1F5C3E] py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#services"
              className="text-[#4B584F] hover:text-[#1F5C3E] py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-[#4B584F] hover:text-[#1F5C3E] py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            
            <div className="py-2 border-b border-[#D8DED9]/40">
              <button
                type="button"
                className="w-full flex items-center justify-between text-[#4B584F] hover:text-[#1F5C3E]"
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
                <div className="pl-4 mt-2 space-y-2 text-sm text-[#6B7A70]">
                  <a href="#solar-savings" className="block py-1 hover:text-[#1F5C3E]">
                    Solar Savings Calculator
                  </a>
                  <a href="#roof-calculator" className="block py-1 hover:text-[#1F5C3E]">
                    Roof Capacity Calculator
                  </a>
                  <a href="#roi-estimator" className="block py-1 hover:text-[#1F5C3E]">
                    ROI Estimator
                  </a>
                </div>
              )}
            </div>

            <a
              href="#blog"
              className="text-[#4B584F] hover:text-[#1F5C3E] py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="#contact"
              className="text-[#4B584F] hover:text-[#1F5C3E] py-2 border-b border-[#D8DED9]/40"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>

          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              type="button"
              className="flex items-center gap-2 text-[#4B584F] hover:text-[#1F5C3E] px-3 py-2 rounded-lg bg-[#EFF3EC]"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </button>

            <a
              href="#quote"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1F5C3E] hover:bg-[#184A32] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors text-center"
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
