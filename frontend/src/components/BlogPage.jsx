import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

export default function BlogPage({ theme }) {
  const featuredPost = {
    category: 'Technology',
    title: 'Understanding Solar Microgrids: The Future of Energy Independence',
    excerpt: 'Discover how battery storage paired with high-efficiency rooftop solar arrays creates self-sustaining microgrids that keep your property powered during utility grid outages.',
    date: 'Sep 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  };

  const posts = [
    {
      category: 'Savings',
      title: '10 Simple Ways Solar Panels Lower Your Heating & Cooling Bills',
      excerpt: 'Optimize your home’s HVAC consumption by pairing smart thermostats with peak solar generation hours for maximum financial ROI.',
      date: 'Sep 2, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Policy',
      title: 'Guide to 2026 Solar Tax Incentives and Federal Rebates',
      excerpt: 'Navigate the updated clean energy tax credit policies to save up to 30% on your system installation costs.',
      date: 'Aug 28, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1592833159155-c62df135c883?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Maintenance',
      title: 'How to Maintain Your Solar Panel Efficiency Year-Round',
      excerpt: 'Essential advice for seasonal panel cleaning, snow removal, shade mitigation, and reading inverter diagnostics.',
      date: 'Aug 20, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Technology',
      title: 'N-Type vs P-Type Solar Cells: Which Is Best for Your Home?',
      excerpt: 'A clear technical breakdown comparing cell efficiency ratings, temperature coefficients, and 25-year degradation rates.',
      date: 'Aug 15, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1548611716-300181515d18?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Case Study',
      title: 'How a Local Logistics Hub Cut Energy Overhead by 65%',
      excerpt: 'A deep dive into how a 500 kW rooftop solar array transformed operating margins and cash flow for Apex Logistics.',
      date: 'Aug 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Guides',
      title: 'EV Charging at Home: Integrating Solar Panels with Electric Vehicles',
      excerpt: 'Calculate the exact solar kilowatt capacity needed to charge your electric vehicle using 100% clean, self-generated power.',
      date: 'Aug 02, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1558441719-444ffb6a6f8b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      
      {/* Header Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <Eyebrow text="Insights" theme={theme} />
          
          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.15] tracking-tight max-w-4xl"
            style={{ color: theme.text }}
          >
            Latest from the Solara blog
          </h1>

          {/* Featured Post Card (2-column layout) */}
          <div
            className="mt-10 sm:mt-12 rounded-3xl overflow-hidden border transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 group"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Category Pill Tag */}
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-bold rounded-full border tracking-wide uppercase"
                    style={{
                      backgroundColor: theme.greenSoft,
                      color: theme.green,
                      borderColor: theme.border,
                    }}
                  >
                    {featuredPost.category}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug group-hover:underline decoration-2"
                  style={{ color: theme.text }}
                >
                  {featuredPost.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Meta Date & Read Time */}
              <div
                className="mt-6 pt-6 border-t flex items-center justify-between text-xs sm:text-sm font-medium"
                style={{
                  borderColor: theme.border,
                  color: theme.textFaint,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

            </div>
          </div>

          {/* 3-Column Grid of 6 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between group"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* Card Image */}
                  <div className="h-48 sm:h-52 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Category Pill Tag */}
                    <div className="mb-3">
                      <span
                        className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border tracking-wide uppercase"
                        style={{
                          backgroundColor: theme.greenSoft,
                          color: theme.green,
                          borderColor: theme.border,
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold tracking-tight leading-snug group-hover:underline decoration-2"
                      style={{ color: theme.text }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Meta */}
                <div
                  className="px-6 py-4 border-t flex items-center justify-between text-xs font-medium mt-auto"
                  style={{
                    borderColor: theme.border,
                    color: theme.textFaint,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Centered Load More Articles Button */}
          <div className="mt-12 text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 font-medium text-base px-8 py-3.5 rounded-full border transition-all duration-200"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.green;
                e.currentTarget.style.color = theme.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.color = theme.text;
              }}
            >
              <span>Load more articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner theme={theme} />

    </div>
  );
}
