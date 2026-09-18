import React from 'react';

export function FormField({ label, type = 'text', placeholder, value, onChange, required = false, theme }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium" style={{ color: theme.text }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base outline-none transition-all duration-200"
        style={{
          backgroundColor: theme.input,
          borderColor: theme.border,
          color: theme.text,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.green;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = theme.border;
        }}
      />
    </div>
  );
}
