import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import categoryMap from "../../data/category_map";

interface ResultCardProps {
  category_key: string;
  level_name: string;
  level_statement: string;
  style?: React.CSSProperties;
}

const ResultCard: React.FC<ResultCardProps> = ({
  category_key,
  level_name,
  level_statement,
  style,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={style}
      className="shadow-md mt-5 rounded-md"
      onClick={() => {
        setIsOpen((prev) => !prev);
        // navigate("/result/" + category_key);
      }}
    >
      <div className="p-4">
        <p className=" font-semibold text-sm ">{categoryMap[category_key]}</p>
        <hr className="h-px mt-1 border-0 bg-gray-400" />
        <div className="flex flex-row items-center mt-3 justify-between">
          <div className="w-3/4">
            <p className="text-xl font-bold mb-2">{level_name}</p>
            <p className="line-clamp-2">{level_statement}</p>
          </div>
          <div className="mt-3">
            {(isOpen && <IoIosArrowUp />) || <IoIosArrowDown />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4 mt-3 bg-green-200 text-black rounded-b-md">
          <p className="font-semibold">More Information</p>
          <p className="line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, velit vel cursus lacinia, justo sapien.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
