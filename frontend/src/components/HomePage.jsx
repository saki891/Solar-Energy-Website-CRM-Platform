import React, { useState } from 'react';
import { ArrowRight, BadgePercent, FileCheck2, ShieldCheck, Headphones, Home, Building2, Factory, Star, Plus, Minus, Calendar } from 'lucide-react';
import Hero from './Hero';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

function FaqItem({ question, answer, theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-5 transition-colors" style={{ borderColor: theme.border }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 text-left focus:outline-none group"
      >
        <span className="text-lg sm:text-xl font-semibold tracking-tight" style={{ color: theme.text }}>
          {question}
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0 transition-colors"
          style={{
            backgroundColor: isOpen ? theme.greenSoft : theme.card,
            borderColor: isOpen ? theme.green : theme.border,
            color: isOpen ? theme.green : theme.text,
          }}
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <p className="mt-3.5 text-base leading-relaxed" style={{ color: theme.textMuted }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function HomePage({ theme, setCurrentPage }) {
  const whyUsFeatures = [
    {
      icon: BadgePercent,
      title: 'Lower Your Bills',
      description: 'Cut monthly electricity expenses by up to 85% with high-efficiency tier-1 photovoltaic panels and net metering.',
    },
    {
      icon: FileCheck2,
      title: 'Subsidy Handled',
      description: 'We handle 100% of state and central government solar subsidy paperwork, permits, and utility approvals for you.',
    },
    {
      icon: ShieldCheck,
      title: '25-Year Warranty',
      description: 'Enjoy linear power output guarantees and long-term peace of mind with 25-year manufacturer performance warranties.',
    },
    {
      icon: Headphones,
      title: '24/7 Monitoring',
      description: 'Real-time digital mobile app tracking for inverter performance, daily generation stats, and prompt system maintenance.',
    },
  ];

  const servicesPreview = [
    {
      icon: Home,
      title: 'Residential Solar',
      description: 'Tailored home rooftop solar setups engineered to power appliances, air conditioning, and EV chargers smoothly.',
    },
    {
      icon: Building2,
      title: 'Commercial Solar',
      description: 'Scalable rooftop arrays for office complexes, schools, and hospitals designed to maximize corporate ESG goals.',
    },
    {
      icon: Factory,
      title: 'Industrial Solar',
      description: 'High-yield rooftop and ground-mounted solar microgrids engineered for heavy power equipment and factories.',
    },
  ];

  const testimonials = [
    {
      quote: "Solara transformed our energy bills completely. Our electricity cost dropped by over 80% in the first month alone, and the installation team was incredibly professional.",
      name: "Rajesh Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=60",
    },
    {
      quote: "From initial site survey to subsidy approval and grid commissioning, Solara handled every permit seamlessly. Best green investment for our manufacturing unit.",
      name: "Ananya Patil",
      location: "Pune, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
    },
    {
      quote: "The real-time mobile monitoring app gives us total visibility over daily power generation. Highly recommend Solara for any residential solar setup!",
      name: "Vikram Deshmukh",
      location: "Nashik, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60",
    },
  ];

  const blogPreviewPosts = [
    {
      category: 'Savings',
      title: '10 Simple Ways Solar Panels Lower Your Heating & Cooling Bills',
      date: 'Sep 2, 2026',
      image: 'https://picsum.photos/seed/solara-post1/500/320',
    },
    {
      category: 'Policy',
      title: 'Guide to 2026 Solar Tax Incentives and Federal Rebates',
      date: 'Aug 28, 2026',
      image: 'https://picsum.photos/seed/solara-post2/500/320',
    },
    {
      category: 'Maintenance',
      title: 'How to Maintain Your Solar Panel Efficiency Year-Round',
      date: 'Aug 20, 2026',
      image: 'https://picsum.photos/seed/solara-post3/500/320',
    },
  ];

  const faqItems = [
    {
      question: 'How long does a typical solar panel installation take?',
      answer: 'Most residential installations are completed within 1 to 3 days. Commercial projects may take 1 to 3 weeks depending on system capacity and roof complexity.',
    },
    {
      question: 'Will my property remain connected to the electrical grid?',
      answer: 'Yes, your system remains connected via a net meter. During times when your solar panels generate excess energy, it is fed back into the grid for power credits.',
    },
    {
      question: 'How do solar panels perform on cloudy or rainy days?',
      answer: 'Solar panels still generate electricity on cloudy days by capturing indirect sunlight, typically producing 10% to 25% of their peak capacity.',
    },
    {
      question: 'What percentage of savings can I expect on my electricity bills?',
      answer: 'Most property owners see an 80% to 85% reduction in their monthly electricity bills, achieving full system payback within 3 to 5 years.',
    },
    {
      question: 'What maintenance is required for rooftop solar panels?',
      answer: 'Solar panels require minimal maintenance. Occasional cleaning to remove dust or leaves and annual visual inspections ensure maximum energy generation.',
    },
  ];

  return (
    <div className="transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      
      {/* Existing Hero Section */}
      <Hero theme={theme} />

      {/* 1. Why Solara Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="mb-10 text-center sm:text-left">
            <Eyebrow text="Why Solara" theme={theme} />
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mt-1"
              style={{ color: theme.text }}
            >
              Everything you need, nothing you don't.
            </h2>
          </div>

          {/* 4-Column Grid of Why Solara Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyUsFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <div>
                    {/* Circular greenSoft Badge */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border"
                      style={{
                        backgroundColor: theme.greenSoft,
                        borderColor: theme.border,
                        color: theme.green,
                      }}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h3
                      className="text-xl font-bold tracking-tight mb-2.5"
                      style={{ color: theme.text }}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Services Preview Section (bgAlt background) */}
      <section className="py-16 sm:py-20 transition-colors duration-200" style={{ backgroundColor: theme.bgAlt }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Header row: Eyebrow + H2 left, Link right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow text="What we offer" theme={theme} />
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mt-1"
                style={{ color: theme.text }}
              >
                Solar for every kind of roof.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage('services')}
              className="inline-flex items-center gap-2 font-semibold text-base transition-colors group focus:outline-none self-start sm:self-auto"
              style={{ color: theme.green }}
            >
              <span>View all services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3-Column Grid of Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {servicesPreview.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <div>
                    {/* Icon Badge */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border"
                      style={{
                        backgroundColor: theme.greenSoft,
                        borderColor: theme.border,
                        color: theme.green,
                      }}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h3
                      className="text-xl font-bold tracking-tight mb-2.5"
                      style={{ color: theme.text }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Testimonials Section (with Customer Avatar Photos) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="mb-10 text-center sm:text-left">
            <Eyebrow text="Customer stories" theme={theme} />
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mt-1 max-w-3xl"
              style={{ color: theme.text }}
            >
              Trusted by homes and businesses across Maharashtra.
            </h2>
          </div>

          {/* 3-Column Grid of Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* 5 Filled Star Icons */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-5 h-5 fill-current stroke-none"
                        style={{ color: theme.green }}
                      />
                    ))}
                  </div>

                  {/* Italic Quote Text */}
                  <p
                    className="text-base sm:text-lg italic leading-relaxed mb-6"
                    style={{ color: theme.textMuted }}
                  >
                    "{item.quote}"
                  </p>
                </div>

                {/* Customer Avatar Photo + Name & Location Flex Row */}
                <div className="pt-4 border-t flex items-center gap-3" style={{ borderColor: theme.border }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border shadow-sm flex-shrink-0"
                    style={{ borderColor: theme.border }}
                  />
                  <div>
                    <div className="font-bold text-base" style={{ color: theme.text }}>
                      {item.name}
                    </div>
                    <div className="text-sm font-medium mt-0.5" style={{ color: theme.textFaint }}>
                      {item.location}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. From the Solara Blog Section (bgAlt background) */}
      <section className="py-16 sm:py-20 transition-colors duration-200" style={{ backgroundColor: theme.bgAlt }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Header row: Eyebrow + H2 left, Link right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow text="Insights" theme={theme} />
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mt-1"
                style={{ color: theme.text }}
              >
                From the Solara blog.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage('blog')}
              className="inline-flex items-center gap-2 font-semibold text-base transition-colors group focus:outline-none self-start sm:self-auto"
              style={{ color: theme.green }}
            >
              <span>Read more articles</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3-Column Grid of Compact Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPreviewPosts.map((post, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between group"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* Card Image (h-36, object-cover) */}
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
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
                  </div>
                </div>

                {/* Footer Meta Date */}
                <div
                  className="px-6 py-4 border-t flex items-center gap-1.5 text-xs font-medium mt-auto"
                  style={{
                    borderColor: theme.border,
                    color: theme.textFaint,
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FAQ Section (2/5 split on desktop) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (2/5 split) */}
            <div className="lg:col-span-2">
              <Eyebrow text="FAQ" theme={theme} />
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mt-1"
                style={{ color: theme.text }}
              >
                Common questions, answered.
              </h2>
              <p
                className="mt-4 text-base sm:text-lg leading-relaxed"
                style={{ color: theme.textMuted }}
              >
                Got questions about switching to solar? We've got answers to help you make an informed decision for your home or business.
              </p>

              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="mt-8 inline-flex items-center justify-center gap-2.5 font-medium text-base px-7 py-3.5 rounded-full transition-colors text-white focus:outline-none"
                style={{ backgroundColor: theme.green }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
              >
                <span>Contact us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column (3/5 split - 5 Expandable FAQ items) */}
            <div className="lg:col-span-3">
              {faqItems.map((item, idx) => (
                <FaqItem
                  key={idx}
                  question={item.question}
                  answer={item.answer}
                  theme={theme}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. Shared CTA Banner */}
      <CtaBanner theme={theme} />

    </div>
  );
}
