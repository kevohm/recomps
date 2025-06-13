import { CheckCircleIcon } from "lucide-react";


// Size configurations
const sizeConfig = {
  xs: {
    container: "w-6 h-6",
    text: "text-xs",
    badge: "w-2 h-2",
    badgeIcon: "w-2 h-2",
  },
  sm: {
    container: "w-8 h-8",
    text: "text-sm",
    badge: "w-3 h-3",
    badgeIcon: "w-3 h-3",
  },
  md: {
    container: "w-12 h-12",
    text: "text-lg",
    badge: "w-4 h-4",
    badgeIcon: "w-4 h-4",
  },
  lg: {
    container: "w-16 h-16",
    text: "text-xl",
    badge: "w-5 h-5",
    badgeIcon: "w-5 h-5",
  },
  xl: {
    container: "w-20 h-20",
    text: "text-2xl",
    badge: "w-6 h-6",
    badgeIcon: "w-6 h-6",
  },
  "2xl": {
    container: "w-24 h-24",
    text: "text-3xl",
    badge: "w-7 h-7",
    badgeIcon: "w-7 h-7",
  },
};

// Status badge configurations
const statusConfig = {
  verified: {
    icon: CheckCircleIcon,
    bgColor: "bg-blue-500",
    iconColor: "text-white",
  },
  online: {
    icon: null,
    bgColor: "bg-green-500",
    iconColor: "text-white",
  },
  offline: {
    icon: null,
    bgColor: "bg-gray-400",
    iconColor: "text-white",
  },
  away: {
    icon: null,
    bgColor: "bg-yellow-500",
    iconColor: "text-white",
  },
  busy: {
    icon: null,
    bgColor: "bg-red-500",
    iconColor: "text-white",
  },
};

const Avatar = ({
  // Core props
  name,
  image,
  alt,

  // Status/Badge props
  verified = false,
  status, // 'online', 'offline', 'away', 'busy', 'verified'
  badge, // Custom badge content
  badgeProps = {},

  // Styling props
  size = "md",
  shape = "circle", // 'circle' | 'square' | 'rounded'
  fallbackBg = "bg-gray-200",
  fallbackTextColor = "text-gray-500",
  className = "",
  imageClassName = "",
  fallbackClassName = "",

  // Custom props
  onClick,
  loading = false,
  placeholder = "?",
  initials,

  // HTML props
  ...htmlProps
}) => {
  // Get size configuration
  const sizeClasses = sizeConfig[size] || sizeConfig.md;

  // Generate initials
  const getInitials = () => {
    if (initials) return initials.toUpperCase();
    if (!name) return placeholder;

    return name
      .split(" ")
      .filter((n) => n.length > 0)
      .slice(0, 2) // Only take first 2 words
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Shape classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-lg",
  };

  // Determine status to show
  const activeStatus = verified ? "verified" : status;
  const statusInfo = activeStatus ? statusConfig[activeStatus] : null;

  // Loading state
  if (loading) {
    return (
      <div
        className={`
          ${sizeClasses.container} 
          ${shapeClasses[shape]} 
          bg-gray-200 animate-pulse
          ${className}
        `}
        {...htmlProps}
      />
    );
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...htmlProps}
    >
      {/* Main Avatar */}
      {image ? (
        <img
          src={image}
          alt={alt || name || "Avatar"}
          className={`
            ${sizeClasses.container} 
            ${shapeClasses[shape]} 
            object-cover
            ${imageClassName}
          `}
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling?.classList.remove("hidden");
          }}
        />
      ) : null}

      {/* Fallback with initials */}
      <div
        className={`
          ${image ? "hidden" : ""}
          ${sizeClasses.container} 
          ${shapeClasses[shape]} 
          ${fallbackBg} 
          flex items-center justify-center
          ${fallbackClassName}
        `}
      >
        <span
          className={`${fallbackTextColor} font-medium ${sizeClasses.text}`}
        >
          {getInitials()}
        </span>
      </div>

      {/* Status Badge */}
      {(statusInfo || badge) && (
        <div
          className={`
            absolute bottom-0 right-0 
            ${sizeClasses.badge} 
            bg-white rounded-full 
            flex items-center justify-center 
            shadow-sm border-2 border-white
            ${badgeProps.className || ""}
          `}
          {...badgeProps}
        >
          {badge ? (
            badge
          ) : statusInfo?.icon ? (
            <statusInfo.icon
              className={`${sizeClasses.badgeIcon} ${statusInfo.iconColor}`}
            />
          ) : (
            <div
              className={`
                w-full h-full rounded-full 
                ${statusInfo.bgColor}
              `}
            />
          )}
        </div>
      )}
    </div>
  );
};


export default Avatar
