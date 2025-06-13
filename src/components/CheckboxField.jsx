import { Check } from "lucide-react";

export const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  error = "",
  className = "",
  
  // Icon customization
  icon: CustomIcon,
  iconSize = 12,
  iconColor = "white",
  iconStrokeWidth = 3,
  
  // Checkbox styling
  size = "md",
  variant = "primary",
  rounded = "md",
  
  // Layout options
  layout = "horizontal",
  labelPosition = "right",
  
  // Color customization
  colors = {},
  
  // Advanced options
  indeterminate = false,
  description,
  required = false,
  
  // Container props
  containerClassName = "",
  labelClassName = "",
  
  ...props
}) => {
  // Size variants
  const sizeClasses = {
    sm: { 
      checkbox: "w-4 h-4", 
      label: "text-xs", 
      icon: 10,
      spacing: "ml-2" 
    },
    md: { 
      checkbox: "w-5 h-5", 
      label: "text-sm", 
      icon: 12,
      spacing: "ml-3" 
    },
    lg: { 
      checkbox: "w-6 h-6", 
      label: "text-base", 
      icon: 14,
      spacing: "ml-3" 
    },
    xl: { 
      checkbox: "w-7 h-7", 
      label: "text-lg", 
      icon: 16,
      spacing: "ml-4" 
    }
  };

  // Color variants
  const colorVariants = {
    primary: {
      checked: "bg-blue-600 border-blue-600",
      unchecked: "bg-white border-gray-300 hover:border-gray-400",
      focus: "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
    },
    secondary: {
      checked: "bg-gray-600 border-gray-600",
      unchecked: "bg-white border-gray-300 hover:border-gray-400",
      focus: "focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2"
    },
    success: {
      checked: "bg-green-600 border-green-600",
      unchecked: "bg-white border-gray-300 hover:border-green-300",
      focus: "focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
    },
    warning: {
      checked: "bg-yellow-500 border-yellow-500",
      unchecked: "bg-white border-gray-300 hover:border-yellow-300",
      focus: "focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2"
    },
    danger: {
      checked: "bg-red-600 border-red-600",
      unchecked: "bg-white border-gray-300 hover:border-red-300",
      focus: "focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2"
    },
    custom: colors
  };

  // Rounded variants
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-md",
    xl: "rounded-lg",
    full: "rounded-full"
  };

  // Get current size config
  const currentSize = sizeClasses[size];
  const currentColors = colorVariants[variant] || colorVariants.primary;
  const currentRounded = roundedClasses[rounded];

  // Layout classes
  const layoutClasses = {
    horizontal: "flex items-center",
    vertical: "flex flex-col",
    inline: "inline-flex items-center"
  };

  const handleChange = (e) => {
    if (disabled) return;
    onChange?.(e);
  };

  const handleClick = () => {
    if (disabled) return;
    onChange?.({ 
      target: { 
        name, 
        checked: indeterminate ? true : !checked 
      } 
    });
  };

  const renderIcon = () => {
    if (indeterminate) {
      return (
        <div 
          className={`w-3 h-0.5 bg-current`}
          style={{ color: iconColor }}
        />
      );
    }
    
    if (checked) {
      return CustomIcon ? (
        <CustomIcon 
          size={iconSize || currentSize.icon} 
          color={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      ) : (
        <Check 
          size={iconSize || currentSize.icon} 
          color={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      );
    }
    
    return null;
  };

  const checkboxElement = (
    <div className="relative">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`sr-only ${className}`}
        ref={(input) => {
          if (input) input.indeterminate = indeterminate;
        }}
        {...props}
      />
      <div
        className={`
          ${currentSize.checkbox} 
          ${currentRounded}
          border-2 flex items-center justify-center cursor-pointer 
          transition-all duration-200 ease-in-out
          ${checked || indeterminate
            ? currentColors.checked 
            : currentColors.unchecked
          }
          ${currentColors.focus}
          ${disabled 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:shadow-sm active:scale-95'
          }
        `}
        onClick={handleClick}
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        aria-labelledby={`${name}-label`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {renderIcon()}
      </div>
    </div>
  );

  const labelElement = label && (
    <div className={`${labelPosition === 'left' ? 'mr-3' : currentSize.spacing}`}>
      <label 
        id={`${name}-label`}
        htmlFor={name} 
        className={`
          block ${currentSize.label} text-gray-700 select-none font-medium
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${labelClassName}
        `}
        onClick={handleClick}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className={`text-xs text-gray-500 mt-1 ${disabled ? 'opacity-50' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );

  const content = () => {
    if (labelPosition === 'left') {
      return (
        <>
          {labelElement}
          {checkboxElement}
        </>
      );
    }
    return (
      <>
        {checkboxElement}
        {labelElement}
      </>
    );
  };

  return (
    <div className={`mb-4 ${containerClassName}`}>
      <div className={`${layoutClasses[layout]} ${layout === 'vertical' ? 'space-y-2' : ''}`}>
        {content()}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
          {error}
        </p>
      )}
    </div>
  );
};