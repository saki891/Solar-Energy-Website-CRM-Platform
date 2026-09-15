export function FormField({ label, children, required }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-900 mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const baseInputClasses =
  "w-full rounded-lg border border-line px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:border-leaf-500";

export function TextInput(props) {
  return <input {...props} className={`${baseInputClasses} ${props.className ?? ""}`} />;
}

export function SelectInput({ options, ...props }) {
  return (
    <select {...props} className={`${baseInputClasses} bg-white ${props.className ?? ""}`}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
