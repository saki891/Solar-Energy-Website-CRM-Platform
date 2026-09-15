import React from 'react';
import Eyebrow from './Eyebrow';

export default function AuthShell({ eyebrow, title, subtitle, children, footer, theme }) {
  return (
    <div className="py-8 sm:py-12 lg:py-16 transition-colors duration-200 min-h-[calc(100vh-80px)] flex items-center" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT: full-height rounded-[28px] image of a solar-panel house (desktop only) */}
          <div className="hidden lg:block relative rounded-[28px] overflow-hidden border min-h-[580px]" style={{ borderColor: theme.border }}>
            <img
              src="/solar-house-hero.jpg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=900&q=65";
              }}
              alt="Modern house with solar panels"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay fading from transparent to theme's green color at the bottom */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 text-white"
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.35) 50%, ${theme.green} 100%)`,
              }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
                Powering a cleaner, brighter tomorrow.
              </h2>
              <p className="text-sm lg:text-base text-white/90 leading-relaxed max-w-md">
                Monitor energy generation, estimate solar savings, and manage clean energy installations seamlessly with SOLARA.
              </p>
            </div>
          </div>

          {/* RIGHT: eyebrow, H1 title, subtitle, bordered rounded-3xl card with form, footer text */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              {eyebrow && <Eyebrow text={eyebrow} theme={theme} />}
              <h1
                className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight leading-tight mt-1"
                style={{ color: theme.text }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="mt-3 text-base sm:text-lg leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Card */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm transition-colors duration-200"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              {children}
            </div>

            {/* Footer Text */}
            {footer && (
              <div
                className="text-center text-sm font-medium pt-1"
                style={{ color: theme.textMuted }}
              >
                {footer}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
