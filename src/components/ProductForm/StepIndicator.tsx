
import { LucideIcon } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  fields: string[];
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  isStepCompleted: (stepIndex: number) => boolean;
}

export const StepIndicator = ({ steps, currentStep, isStepCompleted }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                index <= currentStep
                  ? "bg-blue-600 border-blue-600 text-white"
                  : isStepCompleted(index)
                  ? "bg-green-100 border-green-500 text-green-600"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-sm font-medium ${
                  index <= currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 mx-4 mt-[-20px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};
