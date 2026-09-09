import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBFAF6] text-[#4B584F] font-sans antialiased">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
