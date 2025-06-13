import React, { useEffect, useRef, useState } from "react";

// Mock useSearchParams for demo purposes
const mockSearchParams = new URLSearchParams();
const useSearchParams = () => {
  const [params, setParams] = useState(mockSearchParams);
  return [params, setParams];
};

// Tabs Context
const TabsContext = React.createContext();

// Main Tabs Component
export const Tabs = ({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  urlParam = "tab",
  syncWithUrl = false,
  orientation = "horizontal",
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [internalValue, setInternalValue] = useState(() => {
    if (syncWithUrl) {
      const urlValue = searchParams.get(urlParam);
      return urlValue || defaultValue;
    }
    return controlledValue || defaultValue;
  });

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Sync with URL if enabled
  useEffect(() => {
    if (!syncWithUrl) return;

    const urlValue = searchParams.get(urlParam);
    if (urlValue && urlValue !== currentValue) {
      if (!isControlled) {
        setInternalValue(urlValue);
      }
      onValueChange?.(urlValue);
    } else if (!urlValue && currentValue) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(urlParam, currentValue);
        return newParams;
      });
    }
  }, [
    searchParams,
    setSearchParams,
    urlParam,
    currentValue,
    isControlled,
    onValueChange,
    syncWithUrl,
  ]);

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (syncWithUrl) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(urlParam, newValue);
        return newParams;
      });
    }

    onValueChange?.(newValue);
  };

  const contextValue = {
    value: currentValue,
    onValueChange: handleValueChange,
    orientation,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`${orientation === "vertical" ? "flex" : ""} ${className}`}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tabs List (Navigation Container)
export const TabsList = ({ children, className = "", ...props }) => {
  const { orientation } = React.useContext(TabsContext);
  const listRef = useRef(null);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    const tabTriggers = Array.from(
      listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []
    );
    const currentIndex = tabTriggers.findIndex((tab) => tab === event.target);

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
        if (orientation === "horizontal") {
          event.preventDefault();
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : tabTriggers.length - 1;
        }
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          event.preventDefault();
          nextIndex =
            currentIndex < tabTriggers.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          event.preventDefault();
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : tabTriggers.length - 1;
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          event.preventDefault();
          nextIndex =
            currentIndex < tabTriggers.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = tabTriggers.length - 1;
        break;
    }

    if (nextIndex !== currentIndex && tabTriggers[nextIndex]) {
      tabTriggers[nextIndex].focus();
      tabTriggers[nextIndex].click();
    }
  };

  const defaultClasses =
    orientation === "vertical"
      ? "flex flex-col space-y-1 border-r border-gray-200"
      : "flex flex-wrap gap-1 sm:flex-nowrap sm:space-x-1 sm:gap-0 border-b border-gray-200 overflow-x-auto sm:overflow-x-visible";

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={`${defaultClasses} ${className}`}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};

// Tab Trigger (Individual Tab Button)
// Tab Trigger (Individual Tab Button) with shadcn/ui styling
export const TabsTrigger = ({
  children,
  value,
  disabled = false,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  asChild = false,
  ...props
}) => {
  const {
    value: currentValue,
    onValueChange,
    orientation,
  } = React.useContext(TabsContext);
  const isActive = currentValue === value;
  const triggerRef = useRef(null);

  const handleClick = () => {
    if (!disabled && value !== currentValue) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  // shadcn/ui inspired styling
  const defaultActiveClasses =
    orientation === "vertical"
      ? "bg-background text-foreground shadow-sm border-border"
      : "bg-background text-foreground shadow-sm border-b border-border";

  const defaultInactiveClasses =
    orientation === "vertical"
      ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  const baseClasses =
    orientation === "vertical"
      ? `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium 
       ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 
       focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
       disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground 
       data-[state=active]:shadow-sm`
      : `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium 
       ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 
       focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
       disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground 
       data-[state=active]:shadow-sm border-b-2 border-transparent 
       data-[state=active]:border-b-primary`;

  const triggerProps = {
    ref: triggerRef,
    role: "tab",
    "aria-selected": isActive,
    "aria-controls": `tabpanel-${value}`,
    "aria-disabled": disabled,
    "data-state": isActive ? "active" : "inactive",
    "data-disabled": disabled ? "" : undefined,
    tabIndex: isActive ? 0 : -1,
    disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: `
      ${baseClasses}
      ${
        isActive
          ? activeClassName || defaultActiveClasses
          : inactiveClassName || defaultInactiveClasses
      }
      ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim(),
    ...props,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...triggerProps,
      className: `${children.props.className || ""} ${
        triggerProps.className
      }`.trim(),
    });
  }

  return <button {...triggerProps}>{children}</button>;
};

// Alternative version with Tailwind classes for better compatibility
export const TabsTriggerTailwind = ({
  children,
  value,
  disabled = false,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  asChild = false,
  ...props
}) => {
  const {
    value: currentValue,
    onValueChange,
    orientation,
  } = React.useContext(TabsContext);
  const isActive = currentValue === value;
  const triggerRef = useRef(null);

  const handleClick = () => {
    if (!disabled && value !== currentValue) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  // Tailwind version with shadcn/ui styling
  const defaultActiveClasses =
    orientation === "vertical"
      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
      : "bg-white text-slate-900 shadow-sm border-b-2 border-slate-900";

  const defaultInactiveClasses =
    orientation === "vertical"
      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

  const baseClasses =
    orientation === "vertical"
      ? `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium 
       transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 
       focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
      : `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium 
       transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 
       focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
       border-b-2 border-transparent`;

  const triggerProps = {
    ref: triggerRef,
    role: "tab",
    "aria-selected": isActive,
    "aria-controls": `tabpanel-${value}`,
    "aria-disabled": disabled,
    "data-state": isActive ? "active" : "inactive",
    tabIndex: isActive ? 0 : -1,
    disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: `
      ${baseClasses}
      ${
        isActive
          ? activeClassName || defaultActiveClasses
          : inactiveClassName || defaultInactiveClasses
      }
      ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim(),
    ...props,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...triggerProps,
      className: `${children.props.className || ""} ${
        triggerProps.className
      }`.trim(),
    });
  }

  return <button {...triggerProps}>{children}</button>;
};
// Tab Content
export const TabsContent = ({
  children,
  value,
  className = "",
  forceMount = false,
  ...props
}) => {
  const { value: currentValue } = React.useContext(TabsContext);
  const isActive = currentValue === value;

  if (!isActive && !forceMount) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isActive && forceMount}
      className={`focus:outline-none ${className}`}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};
