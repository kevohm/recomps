const Tooltip = ({ triggerElement, tooltipContent }) => {
  return (
    <div className="relative group w-max">
      {triggerElement}

      <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap transition-all duration-200">
        {tooltipContent}
      </div>
    </div>
  );
};

export default Tooltip;
