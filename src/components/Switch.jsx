import React from 'react';

const Switch = ({ 
  checked = false, 
  onChange, 
  disabled = false, 
  size = 'medium',
  label,
  id,
  className = ''
}) => {
  const sizes = {
    small: {
      switch: 'w-8 h-4',
      thumb: 'h-3 w-3',
      translate: 'translate-x-4'
    },
    medium: {
      switch: 'w-11 h-6',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5'
    },
    large: {
      switch: 'w-14 h-8',
      thumb: 'h-7 w-7',
      translate: 'translate-x-6'
    }
  };

  const currentSize = sizes[size];

  const switchClasses = `
    relative inline-flex items-center cursor-pointer
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const trackClasses = `
    ${currentSize.switch}
    bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
    peer-focus:ring-indigo-300 rounded-full peer 
    transition-colors duration-200 ease-in-out
    ${checked ? 'bg-indigo-600' : 'bg-gray-200'}
    ${disabled ? '' : 'hover:bg-gray-300'}
    ${checked && !disabled ? 'hover:bg-indigo-700' : ''}
  `;

  const thumbClasses = `
    absolute top-[2px] left-[2px] bg-white border border-gray-300 
    rounded-full transition-transform duration-200 ease-in-out
    ${currentSize.thumb}
    ${checked ? currentSize.translate : 'translate-x-0'}
    ${disabled ? '' : 'shadow-sm'}
  `;

  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked, event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled && onChange) {
        onChange(!checked, event);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className={switchClasses} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="sr-only peer"
          aria-describedby={label ? `${id}-label` : undefined}
        />
        <div className={trackClasses}>
          <div className={thumbClasses} />
        </div>
      </label>
      {label && (
        <label 
          htmlFor={id} 
          id={`${id}-label`}
          className={`text-sm font-medium text-gray-900 cursor-pointer ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;