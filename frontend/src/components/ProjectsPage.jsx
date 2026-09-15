import React, { useState } from 'react';
import { Zap, MapPin } from 'lucide-react';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

export default function ProjectsPage({ theme }) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const projects = [
    {
      id: 1,
      title: 'Green Valley Solar Residence',
      category: 'Residential',
      location: 'Pune, Maharashtra',
      capacity: '12 kW',
      image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 2,
      title: 'Apex Logistics Hub',
      category: 'Commercial',
      location: 'Navi Mumbai, Maharashtra',
      capacity: '250 kW',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 3,
      title: 'Summit Steel Heavy Microgrid',
      category: 'Industrial',
      location: 'Nagpur, Maharashtra',
      capacity: '750 kW',
      image: 'https://images.unsplash.com/photo-1548611716-30018590895a?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 4,
      title: 'Skyline Eco Apartments',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      capacity: '45 kW',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 5,
      title: 'Horizon Tech Park Array',
      category: 'Commercial',
      location: 'Hyderabad, Telangana',
      capacity: '180 kW',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 6,
      title: 'Precision Motors Solar Plant',
      category: 'Industrial',
      location: 'Ahmedabad, Gujarat',
      capacity: '1.2 MW',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=60',
    },
  ];

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      
      {/* Hero / Header Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <Eyebrow text="Our work" theme={theme} />

          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.15] tracking-tight max-w-4xl"
            style={{ color: theme.text }}
          >
            Projects that speak for themselves.
          </h1>

          <p
            className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl"
            style={{ color: theme.textMuted }}
          >
            Explore how SOLARA has empowered residential homeowners, commercial enterprises, and industrial microgrids nationwide to cut power overheads and embrace clean, reliable solar energy.
          </p>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none"
                  style={{
                    backgroundColor: isActive ? theme.green : theme.card,
                    borderColor: isActive ? theme.green : theme.border,
                    color: isActive ? '#FFFFFF' : theme.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = theme.green;
                      e.currentTarget.style.color = theme.green;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.color = theme.textMuted;
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3-Column Grid of Project Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* Photo */}
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=60";
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm"
                      style={{
                        backgroundColor: `${theme.card}E6`,
                        color: theme.green,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-semibold tracking-tight leading-snug"
                      style={{ color: theme.text }}
                    >
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mt-2.5 text-sm" style={{ color: theme.textFaint }}>
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Divider Row */}
                <div
                  className="px-6 py-4 border-t flex items-center gap-2 text-sm font-medium"
                  style={{
                    borderColor: theme.border,
                    color: theme.green,
                  }}
                >
                  <Zap className="w-4 h-4" />
                  <span>{project.capacity} installed</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner theme={theme} />
    </div>
  );
}
