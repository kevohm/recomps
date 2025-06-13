import React from "react";

const CheckboxButton = ({
  label,
  value,
  checked = false,
  onChange,
  name,
  icon,
  description,
  activeClass = "bg-blue-50 border-blue-500 shadow-sm",
  inactiveClass = "bg-white border-gray-300 hover:border-gray-400",
  className = "",
  hideDescription = false,
}) => {
  return (
    <label
      className={`relative flex items-center gap-3 px-3 py-3 border rounded-lg cursor-pointer transition-all ${
        checked ? activeClass : inactiveClass
      } ${className}`}
    >
      <input
        type="checkbox"
        name={name}
        id={`${label}-${name}`}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="text-blue-600 focus:ring-blue-500 opacity-0 h-full w-full absolute cursor-pointer"
      />
      <div className="flex items-center justify-center space-x-2.5">
        {icon}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            {description && (
              <React.Fragment>
                {hideDescription ? (
                  <div className="relative group">
                    <svg
                      className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {/* Tooltip - positioned outside the overflow container */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-40 z-50">
                      {description}
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-gray-500">
                    {description}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default CheckboxButton;
