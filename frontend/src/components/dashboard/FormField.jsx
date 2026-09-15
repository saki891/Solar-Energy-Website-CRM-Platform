export function FormField({ label, children, required }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-900 dark:text-[#F3F6F1] mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const baseInputClasses =
  "w-full rounded-lg border border-line dark:border-[#293227] bg-white dark:bg-[#152019] px-3 py-2.5 text-sm text-ink-900 dark:text-[#F3F6F1] placeholder:text-ink-400 dark:placeholder:text-[#8A968C] focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:border-leaf-500";

export function TextInput(props) {
  return <input {...props} className={`${baseInputClasses} ${props.className ?? ""}`} />;
}

export function SelectInput({ options, ...props }) {
  return (
    <select {...props} className={`${baseInputClasses} ${props.className ?? ""}`}>
      {options.map((opt) => (
        <option key={opt} value={opt} className="dark:bg-[#17221B] dark:text-[#F3F6F1]">
          {opt}
        </option>
      ))}
    </select>
  );
}
