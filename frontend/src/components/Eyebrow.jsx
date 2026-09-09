import React from 'react';

export default function Eyebrow({ text, theme }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="w-8 h-[2px] rounded-full inline-block flex-shrink-0"
        style={{ backgroundColor: theme.green }}
      />
      <span
        className="font-medium text-sm sm:text-base tracking-wide"
        style={{ color: theme.green }}
      >
        {text}
      </span>
    </div>
  );
}
