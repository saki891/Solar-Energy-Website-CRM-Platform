import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function CtaBanner({ theme }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="rounded-3xl p-8 sm:p-12 lg:p-16 text-center border transition-colors duration-200"
          style={{
            backgroundColor: theme.greenSoft,
            borderColor: theme.border,
          }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ color: theme.text }}
          >
            Ready to go solar?
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            Contact our team of clean energy experts today for a customized quote, roof evaluation, and zero-obligation site survey.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Book Free Site Survey (Filled Green) */}
            <a
              href="#survey"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-medium text-base px-7 py-3.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor: theme.green,
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Site Survey</span>
            </a>

            {/* Calculate My Savings (Outlined, Card-colored) */}
            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-medium text-base px-7 py-3.5 rounded-full border transition-all duration-200"
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
              <span>Calculate My Savings</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
