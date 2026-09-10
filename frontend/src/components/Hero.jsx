import React from 'react';
import { ArrowRight, Calendar, Home, Sun, Zap, Leaf } from 'lucide-react';
import Eyebrow from './Eyebrow';

export default function Hero({ theme }) {
  return (
    <section className="py-8 sm:py-12 lg:py-16 overflow-hidden transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              {/* Eyebrow Line */}
              <Eyebrow text="A cleaner planet starts at home" theme={theme} />

              {/* Large Headline (3 lines, semibold, tight leading) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-semibold leading-[1.12] tracking-tight" style={{ color: theme.text }}>
                Switch to Solar <br />
                <span style={{ color: theme.green }}>Save for a Better</span> <br />
                <span style={{ color: theme.green }}>Tomorrow.</span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-base sm:text-lg leading-relaxed mt-5 max-w-xl" style={{ color: theme.textMuted }}>
                Smart solar solutions for homes, businesses and industries. Lower electricity bills, higher savings and a cleaner, greener planet.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                {/* Calculate My Savings Button */}
                <a
                  href="#calculator"
                  className="font-medium text-base px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-colors text-white group"
                  style={{ backgroundColor: theme.green }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
                >
                  <span>Calculate My Savings</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Book Free Site Survey Button */}
                <a
                  href="#survey"
                  className="border font-medium text-base px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-colors"
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
                  <Calendar className="w-5 h-5" style={{ color: theme.green }} />
                  <span>Book Free Site Survey</span>
                </a>
              </div>
            </div>

            {/* Stats Card Row */}
            <div
              className="rounded-2xl p-5 sm:p-7 border transition-colors duration-200"
              style={{
                backgroundColor: theme.bgAlt,
                borderColor: theme.border,
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
                
                {/* Stat 1: Years of Experience */}
                <div className="flex flex-col items-start space-y-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.green,
                    }}
                  >
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
                      10+
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-snug" style={{ color: theme.textFaint }}>
                      Years of Experience
                    </div>
                  </div>
                </div>

                {/* Stat 2: Projects Completed */}
                <div className="flex flex-col items-start space-y-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.green,
                    }}
                  >
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
                      500+
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-snug" style={{ color: theme.textFaint }}>
                      Projects Completed
                    </div>
                  </div>
                </div>

                {/* Stat 3: Solar Installed */}
                <div className="flex flex-col items-start space-y-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.green,
                    }}
                  >
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
                      25 MW+
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-snug" style={{ color: theme.textFaint }}>
                      Solar Installed
                    </div>
                  </div>
                </div>

                {/* Stat 4: Tons of CO2 Reduced */}
                <div className="flex flex-col items-start space-y-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.green,
                    }}
                  >
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
                      12,000+
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-snug" style={{ color: theme.textFaint }}>
                      Tons of CO₂ Reduced
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Golden Hour Rooftop Solar Image + Badge */}
          <div className="relative flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px]">
              
              {/* Photo with rounded-corner (28px radius) */}
              <img
                src="/solar-house-hero.jpg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80";
                }}
                alt="Modern house with rooftop solar panels at golden-hour sunset"
                className="w-full h-full object-cover rounded-[28px] border shadow-sm"
                style={{ borderColor: theme.border }}
              />

              {/* Floating Circular Badge Overlapping Top-Right Corner */}
              <div
                className="absolute -top-5 -right-3 sm:-top-6 sm:-right-4 lg:-top-6 lg:-right-6 z-20 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full backdrop-blur-md border shadow-md flex items-center justify-center p-3 text-center select-none pointer-events-none transition-colors duration-200"
                style={{
                  backgroundColor: `${theme.card}E6`,
                  borderColor: theme.green,
                }}
              >
                {/* Circular Rotating SVG Text */}
                <svg className="w-full h-full animation-spin-slow" viewBox="0 0 160 160">
                  <defs>
                    <path
                      id="badgeCirclePath"
                      d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    />
                  </defs>
                  <text
                    className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase"
                    style={{ fill: theme.green }}
                  >
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      SUSTAINABLE TODAY FOR A BRIGHTER TOMORROW •
                    </textPath>
                  </text>
                </svg>

                {/* Center Badge Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center"
                    style={{
                      backgroundColor: theme.greenSoft,
                      borderColor: theme.border,
                      color: theme.green,
                    }}
                  >
                    <Sun className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
