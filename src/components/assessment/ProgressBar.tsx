import React from "react";
import AnimatedCircle from "./AnimatedCircle";

interface Category {
  name: string;
  totalQuestions: number;
  answered: number;
}

interface ProgressBarProps {
  categories: Category[];
  activeCategoryIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  categories,
  activeCategoryIndex,
}) => {
  const size = 50;
  const strokeWidth = 4;

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex items-start justify-center gap-2 w-full max-w-4xl md:max-w-full">
        {categories.map((category, index) => {
          const computedPercentage = Math.round(
            (category.answered / category.totalQuestions) * 100
          );
          const percentage =
            index < activeCategoryIndex ? 100 : computedPercentage;

          const isLast = index === categories.length - 1;
          const connectorFilled = percentage >= 100;

          return (
            <div key={index} className="flex items-start">
              {/* Circle + Label (vertical) */}
              <div className="flex flex-col items-center">
                <AnimatedCircle
                  percentage={percentage}
                  size={size}
                  strokeWidth={strokeWidth}
                  color="#449b44"
                />
                <span className="mt-2 text-xs text-center w-[72px] md:w-[150px] break-words">
                  {category.name}
                </span>
              </div>

              {/* Connector (not for last item) */}
              {!isLast && (
                <div className="flex items-center">
                  <div
                    className={`${
                      connectorFilled ? "bg-green-600 h-2" : "bg-gray-300 h-1"
                    } xs:w-4 md:w-6 w-1 rounded-full transition-all duration-300`}
                    style={{ marginTop: size / 2 - 1 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
