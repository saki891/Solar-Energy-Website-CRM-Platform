import React, { useState } from 'react';
import { Zap, MapPin, ImageOff } from 'lucide-react';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

function ProjectImage({ src, alt, categoryColor }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-white/5">
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {(!loaded || errored) && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: categoryColor || "#EFF3EC" }}>
          {errored ? <ImageOff className="h-6 w-6 text-gray-400" /> : <div className="h-6 w-6 animate-pulse rounded-full bg-white/40" />}
        </div>
      )}
    </div>
  );
}

const getCategoryColor = (category, theme) => {
  const isDark = theme?.bg === '#0E1712' || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  switch (category) {
    case 'Residential':
      return isDark ? '#192A22' : '#E8F0EC';
    case 'Commercial':
      return isDark ? '#2A251B' : '#FDF3E0';
    case 'Industrial':
      return isDark ? '#1B2430' : '#E9EEF5';
    default:
      return isDark ? '#1C2A21' : '#EFF3EC';
  }
};

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
      image: 'https://placehold.co/400x280/E8F0EC/1F5C3E?text=Residential+Project',
    },
    {
      id: 2,
      title: 'Apex Logistics Hub',
      category: 'Commercial',
      location: 'Navi Mumbai, Maharashtra',
      capacity: '250 kW',
      image: 'https://placehold.co/400x280/FDF3E0/1F5C3E?text=Commercial+Project',
    },
    {
      id: 3,
      title: 'Summit Steel Heavy Microgrid',
      category: 'Industrial',
      location: 'Nagpur, Maharashtra',
      capacity: '750 kW',
      image: 'https://placehold.co/400x280/E9EEF5/1F5C3E?text=Industrial+Project',
    },
    {
      id: 4,
      title: 'Skyline Eco Apartments',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      capacity: '45 kW',
      image: 'https://placehold.co/400x280/E8F0EC/1F5C3E?text=Residential+Project',
    },
    {
      id: 5,
      title: 'Horizon Tech Park Array',
      category: 'Commercial',
      location: 'Hyderabad, Telangana',
      capacity: '180 kW',
      image: 'https://placehold.co/400x280/FDF3E0/1F5C3E?text=Commercial+Project',
    },
    {
      id: 6,
      title: 'Precision Motors Solar Plant',
      category: 'Industrial',
      location: 'Ahmedabad, Gujarat',
      capacity: '1.2 MW',
      image: 'https://placehold.co/400x280/E9EEF5/1F5C3E?text=Industrial+Project',
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
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      categoryColor={getCategoryColor(project.category, theme)}
                    />
                    <span
                      className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm"
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
