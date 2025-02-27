import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import categoryMap from "../../data/category_map";


interface ResultCardProps {
  category_key: string
  level_name: string,
  level_statement: string
}

const ResultCard: React.FC<ResultCardProps> = ({ category_key, level_name, level_statement }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 shadow-md my-5 rounded-md" onClick={()=> navigate("/result/"+ category_key)}>
      <p className="text-red-500 font-semibold text-sm ">{categoryMap[category_key]}</p>
      <hr className="h-px mt-1 border-0 bg-gray-400" />
      <div className="flex flex-row items-center mt-3 justify-between">
        <div className="w-3/4">
          <p className="text-xl font-bold mb-2">{level_name}</p>
          <p className="line-clamp-2">
            {level_statement}
          </p>
        </div>
        <div className="mt-3">
          <RiArrowRightSLine className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
