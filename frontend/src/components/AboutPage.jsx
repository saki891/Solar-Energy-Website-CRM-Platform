import React from 'react';
import { Calendar, Users, MapPin, Award, Shield, Eye, Target, Sparkles, Globe, HeartHandshake } from 'lucide-react';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

export default function AboutPage({ theme }) {
  const stats = [
    { icon: Calendar, number: '2014', label: 'Founded' },
    { icon: Users, number: '60+', label: 'Team Members' },
    { icon: MapPin, number: '8', label: 'States Covered' },
    { icon: Award, number: '98%', label: 'Customer Satisfaction' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Tier-1 solar equipment paired with 25-year performance warranties to ensure dependable clean energy generation.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparency',
      description: 'Clear upfront pricing, honest ROI projections, and zero hidden fees across every project we engineer.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Deploying smart microinverters, advanced energy monitoring apps, and high-efficiency N-type solar cells.',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Committed to circular supply chains, ethical manufacturing standards, and reducing carbon footprints nationwide.',
    },
  ];

  const team = [
    {
      name: 'Alex Morgan',
      role: 'Chief Executive Officer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Solar Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Operations',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Lead Sustainability Advisor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      
      {/* Hero Header Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <Eyebrow text="Who we are" theme={theme} />
          
          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.15] tracking-tight max-w-4xl"
            style={{ color: theme.text }}
          >
            Building a solar-powered tomorrow, one rooftop at a time.
          </h1>

          <p
            className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl"
            style={{ color: theme.textMuted }}
          >
            Founded in 2014, SOLARA began with a simple belief: clean, renewable energy should be accessible, affordable, and seamless for every home and business. Over the last decade, we have grown into a leading solar infrastructure provider, empowering thousands of property owners to reduce carbon emissions and lower energy costs. Today, our dedicated team of engineers, installers, and sustainability advisors continues to pioneer clean energy transitions across the nation.
          </p>

          {/* Stats Bar */}
          <div
            className="mt-12 rounded-2xl p-6 sm:p-8 border transition-colors duration-200"
            style={{
              backgroundColor: theme.bgAlt,
              borderColor: theme.border,
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center sm:items-start space-y-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm"
                      style={{
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                        color: theme.green,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className="text-2xl sm:text-3xl font-bold tracking-tight"
                        style={{ color: theme.text }}
                      >
                        {stat.number}
                      </div>
                      <div
                        className="text-sm font-medium mt-0.5"
                        style={{ color: theme.textFaint }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Our Mission / Our Vision Section (5-column Grid on Desktop) */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            
            {/* Left 2 Columns: Solar Installation Rooftop Photo */}
            <div
              className="lg:col-span-2 min-h-[280px] h-full w-full rounded-2xl overflow-hidden border shadow-sm"
              style={{ borderColor: theme.border }}
            >
              <img
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80"
                alt="Solar installation team working on a rooftop"
                className="w-full h-full object-cover min-h-[280px]"
              />
            </div>

            {/* Right 3 Columns: Mission and Vision Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Our Mission */}
              <div
                className="rounded-2xl p-8 border transition-colors duration-200 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: theme.greenSoft,
                      color: theme.green,
                    }}
                  >
                    <Target className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-2xl font-bold tracking-tight mb-3"
                    style={{ color: theme.text }}
                  >
                    Our Mission
                  </h3>
                  <p
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: theme.textMuted }}
                  >
                    To accelerate the world’s transition to sustainable energy by delivering high-efficiency, reliable, and intelligent solar systems for residential, commercial, and industrial clients.
                  </p>
                </div>
              </div>

              {/* Our Vision */}
              <div
                className="rounded-2xl p-8 border transition-colors duration-200 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: theme.greenSoft,
                      color: theme.green,
                    }}
                  >
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-2xl font-bold tracking-tight mb-3"
                    style={{ color: theme.text }}
                  >
                    Our Vision
                  </h3>
                  <p
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: theme.textMuted }}
                  >
                    To create a future where every building generates its own clean power, fostering environmental resilience and economic independence for generations to come.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mb-10 text-center sm:text-left">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: theme.text }}
            >
              What we stand for
            </h2>
            <p className="mt-2 text-base sm:text-lg" style={{ color: theme.textMuted }}>
              Core values that guide our engineering, customer service, and community partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 border transition-all duration-200"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: theme.greenSoft,
                      color: theme.green,
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4
                    className="text-xl font-semibold mb-2"
                    style={{ color: theme.text }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: theme.textMuted }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Team Section (Real Portrait Photos) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mb-10 text-center sm:text-left">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: theme.text }}
            >
              Meet the team
            </h2>
            <p className="mt-2 text-base sm:text-lg" style={{ color: theme.textMuted }}>
              Passionate professionals leading the clean energy transition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 text-center border transition-all duration-200 flex flex-col items-center"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                {/* Portrait Photo with 4px border in greenSoft color */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-20 w-20 rounded-full object-cover mb-4 border-4 shadow-sm"
                  style={{ borderColor: theme.greenSoft }}
                />
                <h4
                  className="text-lg font-bold"
                  style={{ color: theme.text }}
                >
                  {member.name}
                </h4>
                <p
                  className="text-sm font-medium mt-1"
                  style={{ color: theme.textFaint }}
                >
                  {member.role}
                </p>
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
