import CreatableSelect from "react-select/creatable";

export const CreatableSelectField = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  isDisabled = false,
  isMulti = false,
  className = "",
  name,
  required = false,
  label,
  error,
  loading=false,
  ...props
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? "#f9fafb" : "#ffffff",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
      padding: "0.125rem 0.25rem",
      minHeight: "2.75rem",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        borderColor: state.isDisabled ? "#d1d5db" : "#9ca3af",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 0.5rem",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      paddingTop: "0",
      paddingBottom: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "0.875rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1f2937",
      fontSize: "0.875rem",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#eff6ff",
      borderRadius: "0.375rem",
      border: "1px solid #dbeafe",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1e40af",
      fontSize: "0.75rem",
      padding: "0.125rem 0.25rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        backgroundColor: "#fee2e2",
        color: "#dc2626",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#e5e7eb",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3b82f6" : "#6b7280",
      padding: "0.5rem",
      "&:hover": {
        color: "#3b82f6",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#6b7280",
      padding: "0.5rem",
      "&:hover": {
        color: "#dc2626",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      marginTop: "0.25rem",
      zIndex: 50,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0.25rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#f3f4f6"
        : "transparent",
      color: state.isSelected ? "#ffffff" : "#1f2937",
      cursor: "pointer",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.375rem",
      margin: "0.125rem 0",
      fontSize: "0.875rem",
      transition: "all 0.15s ease-in-out",
      "&:active": {
        backgroundColor: state.isSelected ? "#2563eb" : "#e5e7eb",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "0.875rem",
      padding: "0.75rem",
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "0.875rem",
      padding: "0.75rem",
    }),
  };

  return (
    <div className={`w-full flex flex-col relative ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <CreatableSelect
        options={options}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isMulti={isMulti}
        styles={customStyles}
        isLoading={loading}
        classNamePrefix="custom-select"
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};