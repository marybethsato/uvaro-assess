import Answer from "../../interfaces/answer";
import AnswerItem from "./AnswerItem";

interface AnswerListProps {
  options: Answer[];
  selected: Answer | null;
  onSelect: (answer: Answer) => void;
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
          text={option.answer_text}
          isSelected={selected === option}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
