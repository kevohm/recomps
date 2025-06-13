
export const DateInput = ({ label, value, onChange, min, max, error, icon: Icon }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {Icon && <Icon className="w-4 h-4 inline mr-2" />}
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-200 bg-red-50"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};