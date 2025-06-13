import { Slider } from "./Slider";

const ProgressSteps = ({ steps, currentStep }) => {
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full mx-auto py-4">
      {/* Header with step info and percentage */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-gray-600 font-medium">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

export const StepLayout = ({
  currentStep = 0,
  steps = [],
  icon,
  children,
  onBack,
  logoSrc,
}) => {
  return (
    <div className="h-full flex flex-col items-center bg-white">
      {/* Progress Bar + Back Button */}
      <div className="relative w-full max-w-xl flex items-center justify-center mt-6 px-4">
         <ProgressSteps steps={steps} currentStep={currentStep} />
      </div>

      {/* Children content */}
      <div className="w-full px-2.5 md:px-6 mt-6 flex flex-col items-center space-y-2.5">
        {icon && (
          <div className="mt-8 text-blue-500 flex items-center justify-center">
            {icon}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
