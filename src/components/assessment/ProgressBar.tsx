interface Category {
  name: string;
  totalQuestions: number;
  answered: number;
}

interface ProgressBarProps {
  categories: Category[];
  activeCategoryIndex: number;
}

const ProgressBar = ({ categories, activeCategoryIndex }: ProgressBarProps) => {
  const size = 50;
  const strokeWidth = 4;

  return (
    <div className="w-full px-4 mt-5 flex justify-center">
      <div className="flex items-center justify-center w-full max-w-4xl">
        {categories.map((category, index) => {
          const computedPercentage = Math.round(
            (category.answered / category.totalQuestions) * 100
          );
          const percentage =
            index < activeCategoryIndex ? 100 : computedPercentage;

          const radius = (size - strokeWidth) / 2;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (percentage / 100) * circumference;
          const isLastStep = index === categories.length - 1;

          return (
            <div
              key={index}
              className="flex items-center flex-1 justify-center"
            >
              <div className="flex flex-col items-center w-[50px] shrink-0">
                <svg width={size} height={size}>
                  {/* Background Circle */}
                  <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                  />
                  {/* Progress Circle */}
                  <circle
                    stroke="#449b44"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                  />
                  {/* Percent Text */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="14"
                    className="fill-current text-custom-green"
                  >
                    {percentage}%
                  </text>
                </svg>
                <span className="mt-2 text-xs text-center break-words">
                  {category.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
