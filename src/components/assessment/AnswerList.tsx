import AnswerItem from "./AnswerItem";

interface AnswerListProps {
  options: string[];
  selected: string | null;
  onSelect: (answer: string) => void;
}
export default function AnswerList({
  options,
  selected,
  onSelect,
}: AnswerListProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <AnswerItem
          key={index}
          text={option}
          isSelected={selected === option}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
