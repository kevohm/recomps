export const RadioGroupField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error = "",
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <div className="mb-2">
          <span className="block text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
      )}
      <div className={`space-y-2 ${className}`}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              id={`${name}-${index}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:cursor-not-allowed"
              {...props}
            />
            <label
              htmlFor={`${name}-${index}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
