import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, User, Settings, LogOut, MoreVertical, Plus, Edit, Trash2 } from 'lucide-react';

// Dropdown Context
const DropdownContext = React.createContext();

// Main Dropdown Component
export const Dropdown = ({
  children,
  onOpenChange,
  defaultOpen = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onOpenChange]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onOpenChange]);

  const toggleOpen = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const contextValue = {
    isOpen,
    toggleOpen,
    setIsOpen: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    }
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div 
        ref={dropdownRef}
        className={`relative inline-block ${className}`}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Button Trigger
export const DropdownButton = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  disabled = false,
  showChevron = true,
  ...props
}) => {
  const { isOpen, toggleOpen } = React.useContext(DropdownContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      toggleOpen();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  // Size variants
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-lg'
  };

  // Style variants
  const variants = {
    default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    primary: 'bg-blue-600 border border-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 border border-red-600 text-white hover:bg-red-700'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isOpen ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
  `;

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={`
        ${baseClasses}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
      {showChevron && (
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      )}
    </button>
  );
};

// Dropdown Menu Content with Viewport Detection
export const DropdownMenu = ({
  children,
  className = "",
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}) => {
  const { isOpen } = React.useContext(DropdownContext);
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ align, side });

  // Calculate optimal position based on viewport
  const calculatePosition = () => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const trigger = menu.parentElement;
    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newSide = side;
    let newAlign = align;

    // Check vertical positioning
    if (side === 'bottom' && triggerRect.bottom + menuRect.height + sideOffset > viewport.height) {
      // Not enough space below, try above
      if (triggerRect.top - menuRect.height - sideOffset >= 0) {
        newSide = 'top';
      }
    } else if (side === 'top' && triggerRect.top - menuRect.height - sideOffset < 0) {
      // Not enough space above, try below
      if (triggerRect.bottom + menuRect.height + sideOffset <= viewport.height) {
        newSide = 'bottom';
      }
    }

    // Check horizontal positioning for vertical dropdowns
    if (newSide === 'top' || newSide === 'bottom') {
      if (align === 'start' && triggerRect.left + menuRect.width > viewport.width) {
        // Not enough space on the right, align to end
        newAlign = 'end';
      } else if (align === 'end' && triggerRect.right - menuRect.width < 0) {
        // Not enough space on the left, align to start
        newAlign = 'start';
      } else if (align === 'center') {
        const centerLeft = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2);
        if (centerLeft < 0) {
          newAlign = 'start';
        } else if (centerLeft + menuRect.width > viewport.width) {
          newAlign = 'end';
        }
      }
    }

    // Check horizontal positioning for horizontal dropdowns
    if (side === 'left' && triggerRect.left - menuRect.width - sideOffset < 0) {
      // Not enough space on the left, try right
      if (triggerRect.right + menuRect.width + sideOffset <= viewport.width) {
        newSide = 'right';
      }
    } else if (side === 'right' && triggerRect.right + menuRect.width + sideOffset > viewport.width) {
      // Not enough space on the right, try left
      if (triggerRect.left - menuRect.width - sideOffset >= 0) {
        newSide = 'left';
      }
    }

    setPosition({ align: newAlign, side: newSide });
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Initial calculation
      calculatePosition();
      
      // Focus first item
      const firstItem = menuRef.current.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
      firstItem?.focus();

      // Recalculate on window resize or scroll
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, side, align]);

  if (!isOpen) return null;

  // Alignment classes
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };

  // Side classes with dynamic offset
  const sideClasses = {
    top: `bottom-full`,
    bottom: `top-full`,
    left: `right-full top-0`,
    right: `left-full top-0`
  };

  // Dynamic margin based on side and offset
  const marginClasses = {
    top: `mb-${sideOffset}`,
    bottom: `mt-${sideOffset}`,
    left: `mr-${sideOffset}`,
    right: `ml-${sideOffset}`
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      className={`
        absolute z-50 min-w-48 bg-white border border-gray-200 rounded-md shadow-lg 
        py-1 focus:outline-none
        ${alignmentClasses[position.align]}
        ${sideClasses[position.side]}
        ${marginClasses[position.side]}
        ${className}
      `}
      style={{
        // Ensure menu stays within viewport bounds
        maxHeight: position.side === 'top' || position.side === 'bottom' ? 
          `calc(100vh - ${sideOffset * 2}px)` : 'auto',
        overflowY: 'auto'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Dropdown Menu Item
export const DropdownMenuItem = ({
  children,
  onClick,
  disabled = false,
  destructive = false,
  className = "",
  icon: Icon,
  shortcut,
  ...props
}) => {
  const { setIsOpen } = React.useContext(DropdownContext);
  const itemRef = useRef(null);

  const handleClick = (e) => {
    if (!disabled) {
      onClick?.(e);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    const items = Array.from(
      itemRef.current?.parentElement?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || []
    );
    const currentIndex = items.indexOf(itemRef.current);

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleClick(event);
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        break;
    }
  };

  const baseClasses = `
    flex items-center w-full px-3 py-2 text-sm text-left cursor-pointer
    hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${destructive ? 'text-red-600 hover:bg-red-50 focus:bg-red-50' : 'text-gray-700'}
  `;

  return (
    <button
      ref={itemRef}
      type="button"
      role="menuitem"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`${baseClasses} ${className}`.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {Icon && <Icon className="mr-3 h-4 w-4" />}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-3 text-xs text-gray-400">{shortcut}</span>
      )}
    </button>
  );
};

// Dropdown Separator
export const DropdownSeparator = ({ className = "" }) => (
  <div className={`h-px bg-gray-200 my-1 ${className}`} />
);

// Dropdown Label
export const DropdownLabel = ({ children, className = "", ...props }) => (
  <div
    className={`px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </div>
);

