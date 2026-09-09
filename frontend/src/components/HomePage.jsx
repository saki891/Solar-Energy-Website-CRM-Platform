import React from 'react';
import { ArrowRight, BadgePercent, FileCheck2, ShieldCheck, Headphones, Home, Building2, Factory, Star } from 'lucide-react';
import Hero from './Hero';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

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
    },
    {
      quote: "From initial site survey to subsidy approval and grid commissioning, Solara handled every permit seamlessly. Best green investment for our manufacturing unit.",
      name: "Ananya Patil",
      location: "Pune, Maharashtra",
    },
    {
      quote: "The real-time mobile monitoring app gives us total visibility over daily power generation. Highly recommend Solara for any residential solar setup!",
      name: "Vikram Deshmukh",
      location: "Nashik, Maharashtra",
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

      {/* 3. Testimonials Section */}
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

                {/* Customer Name & Location */}
                <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
                  <div className="font-bold text-base" style={{ color: theme.text }}>
                    {item.name}
                  </div>
                  <div className="text-sm font-medium mt-0.5" style={{ color: theme.textFaint }}>
                    {item.location}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Shared CTA Banner */}
      <CtaBanner theme={theme} />

    </div>
  );
}
