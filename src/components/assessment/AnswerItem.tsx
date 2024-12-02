interface AnswerItemProps {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}
export default function AnswerItem({
  text,
  isSelected,
  onSelect,
}: AnswerItemProps) {
  return (
    <div
      className={`p-2 border cursor-pointer rounded-lg  ${
        isSelected
          ? "border-green-500 bg-green-50 hover:bg-none"
          : "border-gray-300 hover:bg-gray-100"
      }`}
      onClick={onSelect}
    >
      <input type="radio" checked={isSelected} readOnly className="mr-2" />
      <label>{text}</label>
    </div>
  );
}
