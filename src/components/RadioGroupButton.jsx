export const RadioGroupButton = ({
  label,
  options,
  selectedValue,
  onChange,
  name,
}) => {
  return (
    <div className="mb-4 ">
      <p className="block text-sm font-medium text-gray-700 mb-3">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`relative overflow-hidden flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
              selectedValue === option.value
                ? "bg-blue-50 border-blue-500 shadow-sm"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name={name}
              id={`${label}-${name}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="text-blue-600 focus:ring-blue-500 opacity-0 h-full w-full absolute left-0 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
