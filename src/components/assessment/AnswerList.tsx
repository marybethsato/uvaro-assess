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
    <div className="space-y-3 md:space-y-5">
      {options.map((option, index) => (
        <AnswerItem
          key={index}
          text={option.answerText}
          isSelected={selected === option}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
