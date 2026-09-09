import React from 'react';
import { Home, Building2, Factory, ClipboardCheck, Wrench, FileText, ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import CtaBanner from './CtaBanner';

export default function ServicesPage({ theme }) {
  const services = [
    {
      icon: Home,
      title: 'Residential Solar',
      description: 'Custom home rooftop solar panel installations designed to lower your monthly utility bills and increase property value.',
    },
    {
      icon: Building2,
      title: 'Commercial Solar',
      description: 'Scalable solar power architectures for office buildings, retail centers, and commercial facilities aiming to cut operating costs.',
    },
    {
      icon: Factory,
      title: 'Industrial Solar',
      description: 'High-capacity ground-mounted and rooftop solar microgrids for manufacturing plants, warehouses, and heavy industry.',
    },
    {
      icon: ClipboardCheck,
      title: 'Site Survey & Consultation',
      description: 'Comprehensive on-site shade analysis, structural roof checks, and financial payback modeling before installation.',
    },
    {
      icon: Wrench,
      title: 'Maintenance & Monitoring',
      description: '24/7 real-time system performance tracking, annual cleaning, and preventative maintenance for optimal energy output.',
    },
    {
      icon: FileText,
      title: 'Government Subsidy Assistance',
      description: 'Complete navigation of local tax credits, green energy rebates, and net metering permits to maximize financial returns.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We analyze your energy bills and evaluate your roof structure to tailor the ideal system size.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Our engineers craft a custom solar layout and electrical schematic tailored to your power needs.',
    },
    {
      step: '03',
      title: 'Installation',
      description: 'Certified technicians install solar panels, inverters, and battery storage safely and efficiently.',
    },
    {
      step: '04',
      title: 'Activation',
      description: 'We handle utility grid interconnection, net metering approval, and switch on your clean power.',
    },
  ];

  return (
    <div className="transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      
      {/* Header Section (2-Column Layout on Desktop, Stacks on Mobile) */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, H1, Subtext */}
            <div>
              <Eyebrow text="What we offer" theme={theme} />
              
              <h1
                className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.15] tracking-tight max-w-4xl"
                style={{ color: theme.text }}
              >
                Solar solutions for every roof and every budget.
              </h1>

              <p
                className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl"
                style={{ color: theme.textMuted }}
              >
                From residential rooftop setups to utility-scale solar microgrids, our end-to-end solar solutions are engineered for peak efficiency, seamless grid integration, and maximum long-term financial savings.
              </p>
            </div>

            {/* Right Column: Technician Solar Installation Image */}
            <div
              className="h-[288px] lg:h-[384px] w-full rounded-[28px] overflow-hidden border shadow-sm"
              style={{ borderColor: theme.border }}
            >
              <img
                src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?auto=format&fit=crop&w=800&q=80"
                alt="Technician installing solar panels"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* 3-Column Grid of 6 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between group"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <div>
                    {/* Circular Icon Badge */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border"
                      style={{
                        backgroundColor: theme.greenSoft,
                        borderColor: theme.border,
                        color: theme.green,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-bold tracking-tight mb-3"
                      style={{ color: theme.text }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-sm sm:text-base leading-relaxed mb-6"
                      style={{ color: theme.textMuted }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 mt-auto"
                    style={{ color: theme.green }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 transition-colors duration-200" style={{ backgroundColor: theme.bgAlt }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="text-center sm:text-left mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: theme.text }}
            >
              How it works
            </h2>
            <p className="mt-2 text-base sm:text-lg max-w-2xl" style={{ color: theme.textMuted }}>
              A straightforward 4-step journey to powering your property with clean solar energy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* Large Green Step Number */}
                  <div
                    className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
                    style={{ color: theme.green }}
                  >
                    {item.step}
                  </div>

                  <h4
                    className="text-xl font-bold mb-2"
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
