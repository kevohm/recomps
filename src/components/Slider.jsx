import React, { forwardRef, useCallback, useState } from "react";

/**
 * @typedef {Object} SliderProps
 * @property {string} [className] - Additional CSS classes to apply to the slider
 * @property {number} [min=0] - Minimum value of the slider
 * @property {number} [max=100] - Maximum value of the slider
 * @property {number} [step=1] - Step increment for the slider
 * @property {number[]} [value] - Controlled value of the slider (array with single number)
 * @property {number[]} [defaultValue=[50]] - Default value when uncontrolled
 * @property {function(number[]): void} [onValueChange] - Callback fired when value changes
 * @property {boolean} [disabled=false] - Whether the slider is disabled
 * @property {'horizontal'|'vertical'} [orientation='horizontal'] - Orientation of the slider
 * @property {string} [ariaLabel] - Accessible label for the slider
 * @property {string} [ariaLabelledby] - ID of element that labels the slider
 * @property {string} [trackColor] - Custom track background color
 * @property {string} [fillColor] - Custom fill color
 * @property {string} [thumbColor] - Custom thumb color
 */

/**
 * A customizable slider component that matches your exact design requirements
 *
 * @component
 * @param {SliderProps & React.HTMLAttributes<HTMLDivElement>} props - The slider props
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the slider container
 * @returns {React.ReactElement} The slider component
 *
 * @example
 * // Basic usage
 * <Slider defaultValue={[50]} onValueChange={(value) => console.log(value)} />
 *
 * @example
 * // Controlled component
 * const [value, setValue] = useState([25]);
 * <Slider value={value} onValueChange={setValue} min={0} max={100} step={5} />
 *
 * @example
 * // With custom colors
 * <Slider
 *   defaultValue={[75]}
 *   trackColor="bg-blue-200"
 *   fillColor="bg-blue-600"
 *   thumbColor="bg-blue-600 border-blue-600"
 * />
 */
export const Slider = forwardRef(
  (
    {
      className = "",
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = [50],
      onValueChange,
      disabled = false,
      orientation = "horizontal",
      ariaLabel,
      ariaLabelledby,
      trackColor = "bg-black",
      fillColor = "bg-black",
      thumbColor = "bg-white border-black",
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [internalValue, setInternalValue] = useState(defaultValue);

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value || internalValue;

    /**
     * Handles value changes for both controlled and uncontrolled usage
     * @param {number[]} newValue - The new slider value
     */
    const handleValueChange = useCallback(
      (newValue) => {
        if (!value) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );

    /**
     * Handles mouse interactions with the slider
     * @param {React.MouseEvent<HTMLDivElement>} e - Mouse event
     */
    const handleMouseDown = useCallback(
      (e) => {
        if (disabled) return;

        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();

        /**
         * Updates slider value based on mouse position
         * @param {number} clientX - Mouse X position
         */
        const updateValue = (clientX) => {
          const percentage = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
          );
          const rawValue = min + percentage * (max - min);
          const steppedValue = Math.round(rawValue / step) * step;
          const clampedValue = Math.max(min, Math.min(max, steppedValue));
          handleValueChange([clampedValue]);
        };

        const handleMouseMove = (e) => updateValue(e.clientX);
        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        updateValue(e.clientX);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [disabled, min, max, step, handleValueChange]
    );

    /**
     * Handles keyboard interactions
     * @param {React.KeyboardEvent<HTMLDivElement>} e - Keyboard event
     */
    const handleKeyDown = useCallback(
      (e) => {
        if (disabled) return;

        let newValue = currentValue[0];

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            e.preventDefault();
            newValue = Math.min(max, currentValue[0] + step);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            e.preventDefault();
            newValue = Math.max(min, currentValue[0] - step);
            break;
          case "Home":
            e.preventDefault();
            newValue = min;
            break;
          case "End":
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        handleValueChange([newValue]);
      },
      [disabled, currentValue, min, max, step, handleValueChange]
    );

    // Calculate percentage for positioning
    const percentage = ((currentValue[0] - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={`relative flex w-full touch-none select-none items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue[0]}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-disabled={disabled}
        {...props}
      >
        {/* Track - matches your design exactly */}
        <div
          className={`relative h-1 w-full grow overflow-hidden rounded-full ${trackColor}`}
        >
          {/* Fill - the filled portion */}
          <div
            className={`absolute h-full ${fillColor} transition-all duration-200 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb - exact match to your design */}
        <div
          className={`absolute block h-4 w-4 rounded-full border-2 ${thumbColor} shadow-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-md`}
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";
