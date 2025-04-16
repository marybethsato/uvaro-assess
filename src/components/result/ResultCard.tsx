import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import categoryMap from "../../data/category_map";

interface ResultCardProps {
  category_key: string;
  levelName: string;
  levelStatement: string;
  style?: React.CSSProperties;
}

const ResultCard: React.FC<ResultCardProps> = ({
  category_key,
  levelName,
  levelStatement,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={style}
      className={`shadow-md mt-5 rounded-md transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
        isOpen ? "bg-green-600 text-white" : "bg-white text-black"
      }`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="p-4">
        <p className="font-semibold text-sm ">{categoryMap[category_key]}</p>
        <hr
          className={`h-px mt-1 border-0 ${
            isOpen ? "bg-white" : "bg-gray-400"
          }`}
        />
        <div className="flex flex-row items-center mt-3 justify-between">
          <div className="w-3/4">
            <p className="text-xl font-bold mb-2 text-black">{levelName}</p>
            {!isOpen ? (
              <p className="line-clamp-2">{levelStatement}</p>
            ) : (
              <p className="">{levelStatement}</p>
            )}
          </div>
          <div className="mt-3">
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
