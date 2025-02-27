import { RiArrowRightSLine } from "react-icons/ri";


interface ResultCardProps {
  onClick?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ onClick }) => {
  return (
    <div className="p-4 shadow-md my-5 rounded-md" onClick={onClick}>
      <p className="text-red-500 font-semibold text-sm ">Financial Health</p>
      <hr className="h-px mt-1 border-0 bg-gray-400" />
      <div className="flex flex-row items-center mt-3 justify-between">
        <div className="w-3/4">
          <p className="text-xl font-bold mb-2">Entry Level</p>
          <p className="line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            aliquid enim, quo officia minus, iusto unde animi et deserunt
            perferendis hic possimus praesentium nemo odit, quasi libero
            molestias sequi. Delectus.
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
